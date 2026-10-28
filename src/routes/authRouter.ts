import { Router } from 'express'
import { body, param } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middlewares/validation'
import { authenticateJWT } from '../middlewares/auth'
import { Limiter } from '../config/limiter'

const routerAuth = Router()
// El límite aplica a las rutas públicas; /profile se consulta en cada carga de la app
routerAuth.use((req, res, next) => req.path === '/profile' ? next() : Limiter(req, res, next))

routerAuth.post('/create-account',
    body('name').notEmpty().withMessage('El nombre es un campo obligatorio'),
    body('parentesco').isIn(['Madre', 'Padre', 'Cuidador', 'Profesional']).withMessage('Selecciona un tipo de usuario válido'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => value === req.body.password).withMessage('Las contraseñas no coinciden'),
    body('aceptaPrivacidad').custom(value => value === true).withMessage('Debes aceptar la política de privacidad'),
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

routerAuth.get('/profile', 
    authenticateJWT,
    AuthController.user
)

routerAuth.post('/change-password', 
    authenticateJWT,
    body('currentPassword')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .notEmpty().withMessage('La contraseña actual es un campo obligatorio'),
    body('newPassword')
        .isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres')
        .notEmpty().withMessage('La nueva contraseña es un campo obligatorio'),
    body('confirmNewPassword').custom((value, { req }) => value === req.body.newPassword).withMessage('Las nuevas contraseñas no coinciden'),
    handleInputErrors,
    AuthController.changePassword
)

export default routerAuth;