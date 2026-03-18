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

            // en el frontend nos envía las respuestas con el puntaje de cada una
            const puntajeTotal = respuestas.reduce((total: number, respuesta: any) => total + respuesta.puntaje, 0)

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

            const evaluacion = await KidTest.create({
                kidId: req.kids.id,
                testId: test.id,
                clasificacion,
                respuestas, // Sequelize guarda el JSON automáticamente
                puntaje: puntajeTotal,
                fechaRealizacion: dayjs().format('YYYY-MM-DD') // Fecha actual
            })

            res.status(201).json({
                message: 'Evaluación guardada exitosamente',
                resultados: {
                    puntajeTotal,
                    clasificacion,
                    mensaje: mensajeAutomatico,
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

