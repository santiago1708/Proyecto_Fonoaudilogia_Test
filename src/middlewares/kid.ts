import { Request, Response, NextFunction } from 'express'
import Kid from '../models/Kid'
import { param, validationResult } from 'express-validator'


declare global {
    namespace Express {
        interface Request {
            kids?: Kid
        }
    }
}

export const validateKidId = async (req: Request, res: Response, next: NextFunction) => {
    await param('kidId')
        .isInt().withMessage('El ID del niño debe ser un número entero')
        .custom(value => value > 0).withMessage('id no valido')
        .run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateKidExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { kidId } = req.params
        const kid = await Kid.findByPk(+kidId)
        if (!kid) {
            const error = new Error(`El niño con ID ${kidId} no existe`)
            res.status(404).json({message : error.message})
            return
        }
        req.kids = kid
        next()
    } catch (error) {
         //console.log(error)
        res.status(500).json({ error: 'Ocurrio un error' })
    }   
}

export const hasAcces = async (req: Request, res: Response, next: NextFunction) => {
    if(req.kids.userId !== req.user.id){
        const error = new Error('No tienes permiso para acceder a este recurso')
        res.status(403).json({message : error.message})
        return
    }
    next()
}