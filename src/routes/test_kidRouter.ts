import { Router } from 'express'
import { test_kidController } from '../controllers/test_kidController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'
import { hasAcces, validateKidExists, validateKidId } from '../middlewares/kid'
import { authenticateJWT } from '../middlewares/auth'

const routerTestKid = Router()
routerTestKid.use(authenticateJWT)

routerTestKid.param('kidId', validateKidId)
routerTestKid.param('kidId', validateKidExists)
routerTestKid.param('kidId', hasAcces)

routerTestKid.post('/kid/:kidId/test/:testId', 
    param('testId').isInt().withMessage('El testId debe ser un número entero'),
    body('respuestas')
        .isArray({ min: 10, max: 10 }).withMessage('Debe enviar exactamente 10 respuestas')
        .custom((value) => {
            for (let resp of value) {
                if (typeof resp.puntaje !== 'number') {
                    throw new Error('Cada respuesta debe incluir su puntaje numérico (0 o 2)');
                }
            }
            return true;
        }),
    handleInputErrors,
    test_kidController.evaluateKid); 

routerTestKid.get('/history/kid/:kidId', test_kidController.getKidHistory)

export default routerTestKid