import { Router } from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middlewares/validation'

const routerAuth = Router()

routerAuth.post('/create-account',
    body('name').notEmpty().withMessage('El nombre es un campo obligatorio'),
    body('parentesco').notEmpty().withMessage('El parentesco es un campo obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden'),
    handleInputErrors,
    AuthController.createAccount)

routerAuth.post('/confirm-email',
    body('token')
        .notEmpty()
        .isInt()
        .isLength({ min: 6, max: 6 }).withMessage('Token no válido'),
    handleInputErrors,
    AuthController.confirmEmail)

routerAuth.post('/login',
    body('email')
        .isEmail().withMessage('El correo electrónico no es válido')
        .notEmpty().withMessage('El correo electrónico es un campo obligatorio'),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .notEmpty().withMessage('La contraseña es un campo obligatorio'),
    handleInputErrors,
    AuthController.login)

routerAuth.post('/forgot-password',
    body('email')
        .isEmail().withMessage('El correo electrónico no es válido')
        .notEmpty().withMessage('El correo electrónico es un campo obligatorio'),
    handleInputErrors,
    AuthController.forgotPassword)

routerAuth.post('/validate-token'
    , body('token')
        .notEmpty()
        .isInt()
        .isLength({ min: 6, max: 6 }).withMessage('Token no válido'),
    handleInputErrors,
    AuthController.validateToken
)

routerAuth.post('/reset-password/:token',
    param('token')
        .isInt()
        .isLength({ min: 6, max: 6 }).withMessage('Token no válido'),
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .notEmpty().withMessage('La contraseña es un campo obligatorio'),
    body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden'),
    handleInputErrors,
    AuthController.resetPassword
)

export default routerAuth;