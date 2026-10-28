import type { Request, Response } from 'express'
import { Op } from 'sequelize'
import Test from '../models/Test'

export class TestController {
    static getAllTests = async (req: Request, res: Response) => {
        try {
            const tests = await Test.findAll({ where: { activo: true }, order: [['minMeses', 'ASC']] })
            res.status(200).json(tests)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener los tests' })
        }
    }

    static getTestsForKid = async (req: Request, res: Response) => {
        try {
            const edadDelNinoEnMeses = req.kids.edadEnMeses
            const testsAptos = await Test.findAll({
                where: {
                    activo: true,
                    minMeses: { [Op.lte]: edadDelNinoEnMeses },
                    maxMeses: { [Op.gte]: edadDelNinoEnMeses }
                }
            })

            res.status(200).json({
                niño: req.kids.name,
                edadMeses: edadDelNinoEnMeses,
                edadTexto: req.kids.edadCalculada,
                testsDisponibles: testsAptos
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error al buscar los tests' })
        }
    }
}
