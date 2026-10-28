import { Router } from 'express'
import { authenticateJWT } from '../middlewares/auth'
import Contacto from '../models/Contacto'

const routerContacto = Router()
routerContacto.use(authenticateJWT)

// Fonoaudiólogas disponibles para elegir en el botón de WhatsApp
routerContacto.get('/', async (_req, res) => {
    const contactos = await Contacto.findAll({
        where: { activo: true },
        attributes: ['id', 'nombre', 'telefono', 'descripcion'],
        order: [['id', 'ASC']]
    })
    res.json(contactos)
})

export default routerContacto
