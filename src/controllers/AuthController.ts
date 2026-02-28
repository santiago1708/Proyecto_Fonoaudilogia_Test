import type {Request, Response} from 'express'

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        console.log(req.body)
        res.json({message: "Cuenta creada exitosamente"})
    }
}