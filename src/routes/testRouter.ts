import { Router } from 'express'
import { TestController } from '../controllers/TestController';
import { body } from 'express-validator';
import { handleInputErrors } from '../middlewares/validation';

const routerTest = Router();

routerTest.post('/new-test',
    body('name')
        .notEmpty().withMessage('El nombre del test es obligatorio')
        .isString().withMessage('El nombre del test debe ser una cadena de texto'),
    body('minMeses')
        .notEmpty().withMessage('El campo minMeses es obligatorio')
        .isInt({ min: 0 }).withMessage('El campo minMeses debe ser un número entero positivo'),
    body('maxMeses')
        .notEmpty().withMessage('El campo maxMeses es obligatorio')
        .isInt({ min: 0 }).withMessage('El campo maxMeses debe ser un número entero positivo'),
    body('preguntas')
        .notEmpty().withMessage('El campo preguntas es obligatorio')
        .isObject().withMessage('El campo preguntas debe ser un objeto JSON'),
    handleInputErrors,
    TestController.createTest)

    