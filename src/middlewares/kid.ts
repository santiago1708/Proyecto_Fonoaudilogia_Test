import { Request, Response, NextFunction } from 'express'
import Kid from '../models/Kid'
import { param, validationResult } from 'express-validator'


declare global {
    namespace Express {
        interface Request {
            kid?: Kid
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
        const kidd = await Kid.findByPk(Number(kidId))
        if (!kidd) {
            return res.status(404).json({ error: 'Niño no encontrado' })
        }
        req.kid = kidd
        next()
    } catch (error) {
        //console.log(error)
        res.status(500).json({ error: 'Ocurrio un error' })
    }   
} 