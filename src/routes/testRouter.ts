import { Router } from 'express'
import { TestController } from '../controllers/TestController'
import { hasAcces, validateKidExists, validateKidId } from '../middlewares/kid'
import { authenticateJWT } from '../middlewares/auth'

const routerTest = Router()
routerTest.use(authenticateJWT)

routerTest.param('kidId', validateKidId)
routerTest.param('kidId', validateKidExists)
routerTest.param('kidId', hasAcces)

// Los cuestionarios se cargan con `npm run seed`; ya no se pueden crear desde la API
routerTest.get('/get-tests', TestController.getAllTests)
routerTest.get('/get-tests/kid/:kidId', TestController.getTestsForKid)

export default routerTest
