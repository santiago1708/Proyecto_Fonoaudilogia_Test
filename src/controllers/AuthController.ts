import type { Request, Response } from 'express'
import User from '../models/User'
import { comparePassword, hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import { enviarCorreoConfirmacion } from '../config/resend'
import { generateJWT } from '../utils/jwt'

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
            // console.log(e)
            const error = new Error('Hubo un error')
            res.status(500).json({ error: error.message })
            return
        }
    }

    static confirmEmail = async (req: Request, res: Response) => {
        const { token } = req.body
        try {
            const user = await User.findOne({ where: { token } })
            if (!user) {
                const error = new Error('Token inválido')
                res.status(404).json({ message: error.message })
                return
            }
            user.confirmed = true
            user.token = null
            await user.save()
            res.json({ message: 'Correo confirmado exitosamente' })
        } catch (e) {
            // console.log(e)
            const error = new Error('Hubo un error')
            res.status(500).json({ error: error.message })
        }
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ where: { email } })

            if (!user) {
                const error = new Error('Correo electrónico no registrado')
                res.status(404).json({ error: error.message })
                return
            }

            if (!user.confirmed) {
                const error = new Error('Por favor, confirma tu correo electrónico antes de iniciar sesión')
                res.status(403).json({ error: error.message })
                return
            }

            const passwordCorrect = await comparePassword(password, user.password)
            if (!passwordCorrect) {
                const error = new Error('Contraseña incorrecta')
                res.status(401).json({ error: error.message })
                return
            }
            res.json(generateJWT(user.id))
        } catch (e) {
            // console.log(e)
            const error = new Error('Hubo un error')
            res.status(500).json({ error: error.message })
        }
    }

}