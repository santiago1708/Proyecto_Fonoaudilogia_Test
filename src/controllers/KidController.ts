import type { Response, Request } from 'express'
import Kid from '../models/Kid'
import KidTest from '../models/KidTest'
import { db } from '../config/db'

export class KidController {
    static addKid = async (req: Request, res: Response) => {
        const { name, genero, fechaNacimiento, escolarizacion, observaciones } = req.body
        try {
            await Kid.create({
                name,
                genero,
                fechaNacimiento,
                escolarizacion,
                observaciones,
                userId: req.user.id
            })
            res.status(201).json('Niño agregado exitosamente!')
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getKids = async (req: Request, res: Response) => {
        try {
            const kids = await Kid.findAll({ where: { userId: req.user.id }, order: [['name', 'ASC']] })
            res.status(200).json(kids)
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getKidById = async (req: Request, res: Response) => {
        res.status(200).json(req.kids)
    }

    static updateKid = async (req: Request, res: Response) => {
        const { name, genero, fechaNacimiento, escolarizacion, observaciones } = req.body
        try {
            await req.kids.update({ name, genero, fechaNacimiento, escolarizacion, observaciones })
            res.status(200).json('Niño actualizado exitosamente!')
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error al actualizar' })
        }
    }

    static deleteKid = async (req: Request, res: Response) => {
        try {
            // Se borran primero sus evaluaciones (la llave foránea no admite nulos)
            await db.transaction(async (transaction) => {
                await KidTest.destroy({ where: { kidId: req.kids.id }, transaction })
                await req.kids.destroy({ transaction })
            })
            res.status(200).json('Niño eliminado exitosamente!')
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Hubo un error al eliminar' })
        }
    }
}
