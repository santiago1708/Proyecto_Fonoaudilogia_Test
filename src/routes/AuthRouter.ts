import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middlewares/validation'

const routerAuth = Router()

routerAuth.post('/create-account', 
    body('name').isString().withMessage('El nombre es un campo obligatorio'),
    body('kinship').isString().withMessage('El parentesco es un campo obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden'),
    handleInputErrors,
    AuthController.createAccount)

export default routerAuth;