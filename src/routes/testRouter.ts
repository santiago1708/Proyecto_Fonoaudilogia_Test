import { Router } from 'express'
import { TestController } from '../controllers/TestController';
import { body } from 'express-validator';
import { handleInputErrors } from '../middlewares/validation';
import { hasAcces, validateKidExists, validateKidId } from '../middlewares/kid';

const routerTest = Router();

routerTest.param('kidId', validateKidId)
routerTest.param('kidId', validateKidExists)
routerTest.param('kidId', hasAcces)

routerTest.post('/add-test', 
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto'),
    body('minMeses')
        .notEmpty().withMessage('Los meses mínimos son obligatorios')
        .isInt({ min: 0 }).withMessage('Debe ser un número entero positivo'),
    body('maxMeses')
        .notEmpty().withMessage('Los meses máximos son obligatorios')
        .isInt({ min: 1 }).withMessage('Debe ser un número entero mayor a 0')
        .custom((value, { req }) => {
            if (value < req.body.minMeses) {
                throw new Error('Los meses máximos no pueden ser menores que los mínimos')
            }
            return true
        }),
    body('preguntas')
        .notEmpty().withMessage('Las preguntas son obligatorias')
        .isObject().withMessage('Las preguntas deben tener un formato JSON válido'),
    handleInputErrors,
    TestController.createTest
)

routerTest.get('/get-tests', TestController.getAllTests)
routerTest.get('/get-tests/kid/:kidId', TestController.getTestsForKid)

export default routerTest;