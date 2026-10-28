import { Router } from 'express'
import { param } from 'express-validator'
import { authenticateJWT, requireAdmin } from '../middlewares/auth'
import { handleInputErrors } from '../middlewares/validation'
import { AdminController } from '../controllers/AdminController'

const routerAdmin = Router()
routerAdmin.use(authenticateJWT, requireAdmin)

const id = [param('id').isInt({ min: 1 }).withMessage('Identificador no válido'), handleInputErrors]

routerAdmin.get('/tests', AdminController.getTests)
routerAdmin.put('/tests/:id', id, AdminController.updateTest)

routerAdmin.get('/recomendaciones', AdminController.getRecomendaciones)
routerAdmin.put('/recomendaciones/:id', id, AdminController.updateRecomendacion)

routerAdmin.get('/actividades', AdminController.getActividades)
routerAdmin.post('/actividades', AdminController.createActividad)
routerAdmin.put('/actividades/:id', id, AdminController.updateActividad)
routerAdmin.delete('/actividades/:id', id, AdminController.deleteActividad)

routerAdmin.get('/contactos', AdminController.getContactos)
routerAdmin.post('/contactos', AdminController.createContacto)
routerAdmin.put('/contactos/:id', id, AdminController.updateContacto)
routerAdmin.delete('/contactos/:id', id, AdminController.deleteContacto)

routerAdmin.get('/administradores', AdminController.getAdmins)
routerAdmin.post('/administradores', AdminController.setRol)

export default routerAdmin
