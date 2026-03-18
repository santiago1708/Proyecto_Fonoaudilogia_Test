import {Request, Response} from 'express'
import Test from '../models/Test'
import KidTest from '../models/KidTest'
import dayjs from 'dayjs'


export class test_kidController {
    static evaluateKid = async (req: Request, res: Response) => {
        const { testId } = req.params
        const { respuestas } = req.body

        try {
            const test = await Test.findByPk(+testId)
            if (!test) {
                const error = new Error('El test no existe')
                res.status(404).json({ message: error.message })
                return
            }

            // 1. Sumar el puntaje automáticamente
            const puntajeTotal = respuestas.reduce((total: number, respuesta: any) => total + respuesta.puntaje, 0)

            // 2. Sistema de Clasificación Automática
            let clasificacion = ''
            let mensajeAutomatico = ''

            if (puntajeTotal >= 0 && puntajeTotal <= 5) {
                clasificacion = 'Exposición a pantallas sin afectación comunicativa'
                mensajeAutomatico = 'El desarrollo del lenguaje se encuentra acorde a la edad. Se recomienda continuar estimulando la interacción comunicativa y regular el uso de pantallas.'
            } else if (puntajeTotal >= 6 && puntajeTotal <= 10) {
                clasificacion = 'Exposición moderada a pantallas que pueden afectar la comunicación'
                mensajeAutomatico = 'Se identifican algunos indicadores de alerta. Se recomienda supervisión y reducción del tiempo frente a dispositivos.'
            } else if (puntajeTotal >= 11) {
                clasificacion = 'Exposición excesiva a pantallas que puede afectar la comunicación'
                mensajeAutomatico = 'Se identifican múltiples factores de riesgo. Se recomienda valoración fonoaudiológica.'
            }

            // 🌟 3. LA MAGIA COMPARATIVA: Buscamos el test más reciente de este niño ANTES de guardar el nuevo
            const evaluacionAnterior = await KidTest.findOne({
                where: { kidId: req.kids.id },
                order: [['fechaRealizacion', 'DESC'], ['createdAt', 'DESC']] // Traemos el último que hizo
            })

            let mensajeComparativo = "Esta es la primera evaluación del niño. No hay datos anteriores para comparar."
            
            if (evaluacionAnterior) {
                if (puntajeTotal < evaluacionAnterior.puntaje) {
                    mensajeComparativo = `¡Mejora! El puntaje bajó de ${evaluacionAnterior.puntaje} a ${puntajeTotal}.`
                } else if (puntajeTotal === evaluacionAnterior.puntaje) {
                    mensajeComparativo = `Sin cambios. El puntaje se mantiene en ${puntajeTotal} respecto a la evaluación anterior.`
                } else {
                    mensajeComparativo = `Empeoramiento. El puntaje subió de ${evaluacionAnterior.puntaje} a ${puntajeTotal}.`
                }
            }

            // 4. Guardar en la base de datos la nueva evaluación
            const evaluacion = await KidTest.create({
                kidId: req.kids.id,
                testId: test.id,
                clasificacion,
                respuestas,
                puntaje: puntajeTotal,
                fechaRealizacion: dayjs().format('YYYY-MM-DD')
            })

            // 5. Devolver la respuesta súper completa al frontend
            res.status(201).json({
                message: 'Evaluación guardada exitosamente',
                resultados: {
                    puntajeTotal,
                    clasificacion,
                    mensaje: mensajeAutomatico,
                    progreso: mensajeComparativo, // <-- Enviamos el análisis comparativo
                    evaluacion
                }
            })

        } catch (e) {
            console.log(e)
            const error = new Error('Hubo un error al guardar la evaluación')
            res.status(500).json({ error: error.message })
            return
        }
    }

    static getKidHistory = async (req: Request, res: Response) => {
        try {
            // Buscamos todas las evaluaciones de este niño, ordenadas de la más reciente a la más antigua
            const historial = await KidTest.findAll({
                where: { kidId: req.kids.id },
                order: [['fechaRealizacion', 'DESC']]
            })

            res.status(200).json(historial)
        } catch (e) {
            console.log(e)
            const error = new Error('Hubo un error al obtener el historial')
            res.status(500).json({ error: error.message })
            return
        }
    }
}

