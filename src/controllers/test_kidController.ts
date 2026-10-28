import { Request, Response } from 'express'
import dayjs from 'dayjs'
import Test from '../models/Test'
import KidTest from '../models/KidTest'
import Kid from '../models/Kid'
import { NIVELES, clasificarPuntaje, perfilDeParentesco } from '../data/contenido'
import { armarRecomendaciones } from '../services/recomendaciones'
import { formatearEdad } from '../utils/edad'
import type { Pregunta } from '../data/cuestionarios'

type RespuestaRecibida = { idPregunta: number; respuesta: string }

// Sección IX: mensaje automático comparativo
const compararConAnterior = (puntaje: number, anterior: KidTest | null) => {
    if (!anterior) {
        return {
            progreso: 'Primera evaluación',
            mensajeProgreso: 'Esta es la primera evaluación del niño. No hay datos anteriores para comparar.'
        }
    }
    if (puntaje < anterior.puntaje) {
        return { progreso: 'Mejora', mensajeProgreso: `Mejora: el puntaje bajó de ${anterior.puntaje} a ${puntaje} respecto a la evaluación anterior.` }
    }
    if (puntaje === anterior.puntaje) {
        return { progreso: 'Sin cambios', mensajeProgreso: `Sin cambios: el puntaje se mantiene en ${puntaje} respecto a la evaluación anterior.` }
    }
    return { progreso: 'Empeoramiento', mensajeProgreso: `Empeoramiento: el puntaje subió de ${anterior.puntaje} a ${puntaje} respecto a la evaluación anterior.` }
}

export class test_kidController {
    static evaluateKid = async (req: Request, res: Response) => {
        const { testId } = req.params
        const { respuestas, personaResponde, tiempoPantallas } = req.body as {
            respuestas: RespuestaRecibida[]
            personaResponde: string
            tiempoPantallas: string
        }

        try {
            const test = await Test.findByPk(+testId)
            if (!test || !test.activo) {
                res.status(404).json({ error: 'El cuestionario no existe' })
                return
            }

            // El cuestionario debe corresponder a la edad actual del niño
            const edadMeses = req.kids.edadEnMeses
            if (edadMeses < test.minMeses || edadMeses > test.maxMeses) {
                res.status(400).json({ error: 'El cuestionario no corresponde a la edad del niño' })
                return
            }

            // 1. Puntaje calculado en el servidor a partir de las opciones del cuestionario
            const preguntas = test.preguntas as Pregunta[]
            const detalle = []
            for (const pregunta of preguntas) {
                const recibida = respuestas.find(r => +r.idPregunta === pregunta.id)
                const opcion = recibida && pregunta.opciones.find(o => o.respuesta === recibida.respuesta)
                if (!opcion) {
                    res.status(400).json({ error: `Falta una respuesta válida para la pregunta ${pregunta.id}` })
                    return
                }
                detalle.push({
                    idPregunta: pregunta.id,
                    pregunta: pregunta.pregunta,
                    respuesta: opcion.respuesta,
                    puntaje: opcion.puntaje
                })
            }
            const puntaje = detalle.reduce((total, r) => total + r.puntaje, 0)

            // 2. Clasificación automática (sección VIII)
            const nivel = clasificarPuntaje(puntaje)
            const { clasificacion, mensaje } = NIVELES[nivel]

            // 3. Indicadores identificados: respuestas que suman puntaje
            const indicadores = detalle.filter(r => r.puntaje > 0)

            // 4. Recomendaciones y actividades según edad, resultado y tipo de cuenta
            const perfilUsuario = perfilDeParentesco(req.user.parentesco)
            const recomendaciones = await armarRecomendaciones(test.clave, nivel, perfilUsuario, indicadores, preguntas)

            // 5. Comparación con la evaluación anterior
            const anterior = await KidTest.findOne({
                where: { kidId: req.kids.id },
                order: [['createdAt', 'DESC']]
            })
            const { progreso, mensajeProgreso } = compararConAnterior(puntaje, anterior)

            const evaluacion = await KidTest.create({
                kidId: req.kids.id,
                testId: test.id,
                clasificacion,
                nivel,
                mensaje,
                respuestas: detalle,
                indicadores,
                puntaje,
                fechaRealizacion: dayjs().format('YYYY-MM-DD'),
                edadMeses,
                edadTexto: formatearEdad(edadMeses),
                personaResponde,
                tiempoPantallas,
                perfilUsuario,
                progreso,
                mensajeProgreso,
                recomendaciones
            })

            res.status(201).json({
                message: 'Evaluación guardada exitosamente',
                evaluacion
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error al guardar la evaluación' })
        }
    }

    static getKidHistory = async (req: Request, res: Response) => {
        try {
            const historial = await KidTest.findAll({
                where: { kidId: req.kids.id },
                attributes: ['id', 'puntaje', 'clasificacion', 'nivel', 'fechaRealizacion', 'edadTexto', 'edadMeses',
                    'personaResponde', 'tiempoPantallas', 'progreso', 'createdAt'],
                include: [{ model: Test, attributes: ['name', 'rango'] }],
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(historial)
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error al obtener el historial' })
        }
    }

    // Consultar nuevamente el resultado y las recomendaciones de una evaluación
    static getEvaluation = async (req: Request, res: Response) => {
        try {
            const evaluacion = await KidTest.findOne({
                where: { id: +req.params.evaluacionId, kidId: req.kids.id },
                include: [{ model: Test, attributes: ['name', 'rango', 'clave'] }]
            })
            if (!evaluacion) {
                res.status(404).json({ error: 'La evaluación no existe' })
                return
            }
            res.status(200).json({ niño: { id: req.kids.id, name: req.kids.name }, evaluacion })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error al obtener la evaluación' })
        }
    }

    // Últimas evaluaciones de todos los niños del usuario (sección Resultados)
    static getRecentEvaluations = async (req: Request, res: Response) => {
        try {
            const evaluaciones = await KidTest.findAll({
                attributes: ['id', 'kidId', 'puntaje', 'clasificacion', 'nivel', 'fechaRealizacion', 'edadTexto', 'progreso', 'createdAt'],
                include: [
                    { model: Kid, attributes: ['id', 'name'], where: { userId: req.user.id } },
                    { model: Test, attributes: ['name', 'rango'] }
                ],
                order: [['createdAt', 'DESC']],
                limit: 50
            })
            res.status(200).json(evaluaciones)
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error al obtener las evaluaciones' })
        }
    }

    // Recomendaciones y actividades entregadas en cada evaluación del niño (la más reciente primero)
    static getKidRecommendations = async (req: Request, res: Response) => {
        try {
            const evaluaciones = await KidTest.findAll({
                where: { kidId: req.kids.id },
                attributes: ['id', 'puntaje', 'clasificacion', 'nivel', 'edadTexto', 'fechaRealizacion', 'recomendaciones', 'createdAt'],
                include: [{ model: Test, attributes: ['name', 'rango'] }],
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json({ niño: { id: req.kids.id, name: req.kids.name }, evaluaciones })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error al obtener las recomendaciones' })
        }
    }
}
