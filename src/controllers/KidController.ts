import type { Response, Request } from 'express'
import Kid from '../models/Kid'


export class KidController {
    static addKid = async (req: Request, res: Response) => {
        const { name, genero, fechaNacimiento, escolarizacion, observaciones } = req.body
        try {
            const kid = await Kid.create({
                name,
                genero,
                fechaNacimiento,
                escolarizacion,
                observaciones
            })
            kid.userId = req.user.id;
            await kid.save()
            res.status(201).json(`Niño agregado exitosamente!`)
        } catch (e) {
            // console.log(e)
            const error = new Error('Hubo un error')
            res.status(500).json({ error: error.message })
            return
        }
    }

    static getKids = async (req: Request, res: Response) => {
        try {
            const kids = await Kid.findAll({ where: { userId: req.user.id } })
            res.status(200).json(kids)
        } catch (e) {
            // console.log(e)
            const error = new Error('Hubo un error')
            res.status(500).json({ error: error.message })
            return
        }
    }

    static getKidById = async (req: Request, res: Response) => {
        const kid = await Kid.findByPk(req.kids.id)
        res.status(200).json(kid)
    }

    static updateKid = async (req: Request, res: Response) => {
        const { name, genero, fechaNacimiento, escolarizacion, observaciones } = req.body
        await req.kids.update({ name, genero, fechaNacimiento, escolarizacion, observaciones })
        res.status(200).json('Niño actualizado exitosamente!')
    }

    static deleteKid = async (req: Request, res: Response) => {
        await req.kids.destroy()
        res.status(200).json('Niño eliminado exitosamente!')
    }
}