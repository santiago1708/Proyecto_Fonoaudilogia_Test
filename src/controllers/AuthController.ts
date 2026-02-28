import type { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import { enviarCorreoConfirmacion } from '../config/resend'

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const { name, parentesco, email, password } = req.body
        try {
            const userEmailExist = await User.findOne({ where: { email } })
            if (userEmailExist) {
                const error = new Error('El correo electrónico ya está registrado')
                res.status(409).json({ message: error.message })
                return
            }

            const user = await User.create({
                name,
                email,
                password: await hashPassword(password), 
                parentesco,
                token: generateToken()
            })
            await user.save()
            await enviarCorreoConfirmacion(email, name, user.token)

            res.status(201).json({ message: 'Cuenta creada exitosamente. Por favor, revisa tu correo para confirmar tu cuenta.' })
        } catch (e) {
            console.log(e)
            const error = new Error('Hubo un error')
            res.status(500).json({ error: error.message })
            return
        }
    }
}