import { Router } from 'express'
import { test_kidController } from '../controllers/test_kidController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middlewares/validation'
import { hasAcces, validateKidExists, validateKidId } from '../middlewares/kid'
import { authenticateJWT } from '../middlewares/auth'
import { PERSONAS_RESPONDE, TIEMPOS_PANTALLA } from '../data/contenido'

const routerTestKid = Router()
routerTestKid.use(authenticateJWT)

routerTestKid.param('kidId', validateKidId)
routerTestKid.param('kidId', validateKidExists)
routerTestKid.param('kidId', hasAcces)

routerTestKid.post('/kid/:kidId/test/:testId',
    param('testId').isInt().withMessage('El testId debe ser un número entero'),
    body('personaResponde')
        .isIn(PERSONAS_RESPONDE).withMessage('Selecciona quién responde la evaluación'),
    body('tiempoPantallas')
        .isIn(TIEMPOS_PANTALLA).withMessage('Selecciona el tiempo promedio diario de pantallas'),
    body('respuestas')
        .isArray({ min: 10, max: 10 }).withMessage('Debe enviar exactamente 10 respuestas')
        .custom((value) => {
            for (const resp of value) {
                if (typeof resp?.respuesta !== 'string' || !Number.isInteger(+resp?.idPregunta)) {
                    throw new Error('Cada respuesta debe indicar la pregunta y la opción elegida')
                }
            }
            return true
        }),
    handleInputErrors,
    test_kidController.evaluateKid)

routerTestKid.get('/recientes', test_kidController.getRecentEvaluations)
routerTestKid.get('/history/kid/:kidId', test_kidController.getKidHistory)
routerTestKid.get('/recomendaciones/kid/:kidId', test_kidController.getKidRecommendations)
routerTestKid.get('/kid/:kidId/:evaluacionId',
    param('evaluacionId').isInt().withMessage('Evaluación no válida'),
    handleInputErrors,
    test_kidController.getEvaluation)

export default routerTestKid
