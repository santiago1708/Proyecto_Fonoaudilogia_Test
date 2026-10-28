import { NextFunction, Response, Request } from "express"
import User from "../models/User"
import { verifyJWT } from "../utils/jwt"

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).json({ error: 'No autorizado' })
        return
    }
    const [, token] = authorization.split(' ')
    if (!token) {
        res.status(401).json({ error: 'Token no válido' })
        return
    }

    let decoded: ReturnType<typeof verifyJWT>
    try {
        decoded = verifyJWT(token)
    } catch {
        // Token vencido, alterado o firmado con otra clave
        res.status(401).json({ error: 'Sesión no válida o vencida' })
        return
    }

    if (typeof decoded !== 'object' || !decoded.id) {
        res.status(401).json({ error: 'Token no válido' })
        return
    }

    try {
        // Nunca se incluye la contraseña en req.user (se envía al frontend en /auth/profile)
        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'name', 'email', 'parentesco', 'rol']
        })
        if (!user) {
            res.status(401).json({ error: 'Usuario no encontrado' })
            return
        }
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Hubo un error' })
    }
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.rol !== 'admin') {
        res.status(403).json({ error: 'Solo los administradores pueden realizar esta acción' })
        return
    }
    next()
}
