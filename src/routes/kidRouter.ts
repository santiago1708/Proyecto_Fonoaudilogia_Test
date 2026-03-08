import { Router } from 'express'
import { KidController } from '../controllers/KidController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'
import { authenticateJWT } from '../middlewares/auth'
import { hasAcces, validateKidExists, validateKidId } from '../middlewares/kid'

const routerKid = Router()
routerKid.use(authenticateJWT)
routerKid.param('kidId', validateKidId)
routerKid.param('kidId', validateKidExists)
routerKid.param('kidId', hasAcces)

routerKid.post('/add-kid', 
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto'),
    body('genero')
        .notEmpty().withMessage('El género es obligatorio')
        .isIn(['Masculino', 'Femenino']).withMessage('El género debe ser "Masculino" o "Femenino"'),
    body('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida'),
    body('escolarizacion')
        .isBoolean().withMessage('La escolarización debe ser un valor booleano'),
    body('observaciones')
        .optional()
        .isString().withMessage('Las observaciones deben ser una cadena de texto'),
    handleInputErrors,
    KidController.addKid
)

routerKid.get('/get-kids', KidController.getKids)
routerKid.get('/get-kid/:kidId', KidController.getKidById)

routerKid.put('/update-kid/:kidId', 
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto'),
    body('genero')
        .notEmpty().withMessage('El género es obligatorio')
        .isIn(['Masculino', 'Femenino']).withMessage('El género debe ser "Masculino" o "Femenino"'),
    body('fechaNacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida'),
    body('escolarizacion')
        .isBoolean().withMessage('La escolarización debe ser un valor booleano'),
    body('observaciones')
        .optional()
        .isString().withMessage('Las observaciones deben ser una cadena de texto'),
    handleInputErrors,
    KidController.updateKid)

routerKid.delete('/delete-kid/:kidId', KidController.deleteKid)

export default routerKid;