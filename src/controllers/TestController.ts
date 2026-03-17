import type { Request, Response } from 'express';
import Test from '../models/Test';
import { Op } from 'sequelize'

export class TestController {
    static createTest = async (req: Request, res: Response) => {
        const { name, minMeses, maxMeses, preguntas } = req.body
        try {
            const test = await Test.create({
                name,
                minMeses,
                maxMeses,
                preguntas
            })
            res.status(201).json({ message: 'Test creado exitosamente', test })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error al crear el test' })
        }
    }

    static getAllTests = async (req: Request, res: Response) => {
        try {
            const tests = await Test.findAll()
            res.status(200).json(tests)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener los tests' })
        }
    }

    static getTestsForKid = async (req: Request, res: Response) => {
        try {
            const edadDelNinoEnMeses = req.kids.edadEnMeses;
            const testsAptos = await Test.findAll({
                where: {
                    minMeses: {
                        [Op.lte]: edadDelNinoEnMeses // minMeses debe ser menor o igual (<=) a la edad
                    },
                    maxMeses: {
                        [Op.gte]: edadDelNinoEnMeses // maxMeses debe ser mayor o igual (>=) a la edad
                    }
                }
            })

            res.status(200).json({
                niño: req.kids.name,
                edadMeses: edadDelNinoEnMeses,
                testsDisponibles: testsAptos
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error al buscar los tests' })
        }
    }
}