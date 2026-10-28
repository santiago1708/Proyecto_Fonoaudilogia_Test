import type { Request, Response } from 'express'
import { Op } from 'sequelize'
import Test from '../models/Test'
import KidTest from '../models/KidTest'
import Actividad from '../models/Actividad'
import RecomendacionNivel from '../models/RecomendacionNivel'
import Contacto from '../models/Contacto'
import User from '../models/User'
import type { Pregunta } from '../data/cuestionarios'

const error = (res: Response, status: number, mensaje: string) => { res.status(status).json({ error: mensaje }) }
const textoLimpio = (v: unknown) => typeof v === 'string' ? v.trim() : ''
const listaDeTextos = (v: unknown) => Array.isArray(v) ? v.map(textoLimpio).filter(Boolean) : []

// Parámetros, sección III: cada rango contiene EXACTAMENTE 10 preguntas cerradas
const validarPreguntas = (preguntas: unknown): { preguntas?: Pregunta[]; mensaje?: string } => {
    if (!Array.isArray(preguntas) || preguntas.length !== 10) {
        return { mensaje: 'El cuestionario debe tener exactamente 10 preguntas' }
    }
    const limpias: Pregunta[] = []
    for (const [i, p] of preguntas.entries()) {
        const texto = textoLimpio(p?.pregunta)
        if (!texto) return { mensaje: `La pregunta ${i + 1} no tiene texto` }
        if (!Array.isArray(p?.opciones) || p.opciones.length < 2) {
            return { mensaje: `La pregunta ${i + 1} debe tener al menos 2 opciones de respuesta` }
        }
        const opciones = []
        for (const o of p.opciones) {
            const respuesta = textoLimpio(o?.respuesta)
            const puntaje = Number(o?.puntaje)
            if (!respuesta) return { mensaje: `La pregunta ${i + 1} tiene una opción sin texto` }
            if (!Number.isInteger(puntaje) || puntaje < 0 || puntaje > 10) {
                return { mensaje: `El puntaje de "${respuesta}" en la pregunta ${i + 1} debe ser un número entero entre 0 y 10` }
            }
            opciones.push({ respuesta, puntaje })
        }
        if (new Set(opciones.map(o => o.respuesta.toLowerCase())).size !== opciones.length) {
            return { mensaje: `La pregunta ${i + 1} tiene opciones repetidas` }
        }
        const recomendacion = textoLimpio(p?.recomendacion)
        limpias.push({ id: i + 1, pregunta: texto, opciones, ...(recomendacion ? { recomendacion } : {}) })
    }
    return { preguntas: limpias }
}

const camposActividad = (body: Record<string, unknown>) => ({
    clave: textoLimpio(body.clave),
    perfil: body.perfil === 'profesional' ? 'profesional' : 'familia',
    nombre: textoLimpio(body.nombre),
    objetivo: textoLimpio(body.objetivo),
    pasos: listaDeTextos(body.pasos),
    materiales: textoLimpio(body.materiales) || null,
    recomendacion: textoLimpio(body.recomendacion) || null,
    aspectos: textoLimpio(body.aspectos) || null,
    orientacionFamiliar: textoLimpio(body.orientacionFamiliar) || null,
    orientacionProfesional: textoLimpio(body.orientacionProfesional) || null,
    precaucion: textoLimpio(body.precaucion) || null,
    orden: Number.isInteger(Number(body.orden)) ? Number(body.orden) : 0
})

export class AdminController {
    // ---------- Cuestionarios ----------
    static getTests = async (_req: Request, res: Response) => {
        const tests = await Test.findAll({ order: [['activo', 'DESC'], ['minMeses', 'ASC']] })
        const usos = await KidTest.count({ group: ['testId'] }) as unknown as { testId: number; count: number }[]
        res.json(tests.map(t => ({ ...t.toJSON(), evaluaciones: Number(usos.find(u => u.testId === t.id)?.count ?? 0) })))
    }

    static updateTest = async (req: Request, res: Response) => {
        const test = await Test.findByPk(+req.params.id)
        if (!test) return error(res, 404, 'El cuestionario no existe')

        const name = textoLimpio(req.body.name)
        const rango = textoLimpio(req.body.rango)
        const minMeses = Number(req.body.minMeses)
        const maxMeses = Number(req.body.maxMeses)
        if (!name || !rango) return error(res, 400, 'El nombre y el rango son obligatorios')
        if (!Number.isInteger(minMeses) || !Number.isInteger(maxMeses) || minMeses < 0 || maxMeses < minMeses || maxMeses > 120) {
            return error(res, 400, 'Revisa la edad mínima y máxima en meses')
        }
        const { preguntas, mensaje } = validarPreguntas(req.body.preguntas)
        if (!preguntas) return error(res, 400, mensaje!)

        const activo = req.body.activo !== false
        if (activo) {
            // Dos cuestionarios activos no pueden cubrir la misma edad
            const cruce = await Test.findOne({
                where: { id: { [Op.ne]: test.id }, activo: true, minMeses: { [Op.lte]: maxMeses }, maxMeses: { [Op.gte]: minMeses } }
            })
            if (cruce) return error(res, 400, `Las edades se cruzan con el cuestionario activo "${cruce.name}"`)
        }

        // Las evaluaciones ya hechas guardan su propia copia de preguntas y respuestas
        await test.update({ name, rango, minMeses, maxMeses, preguntas, activo })
        res.json(test)
    }

    // ---------- Recomendaciones por resultado ----------
    static getRecomendaciones = async (_req: Request, res: Response) => {
        const filas = await RecomendacionNivel.findAll({ order: [['perfil', 'ASC'], ['id', 'ASC']] })
        res.json(filas)
    }

    static updateRecomendacion = async (req: Request, res: Response) => {
        const fila = await RecomendacionNivel.findByPk(+req.params.id)
        if (!fila) return error(res, 404, 'La recomendación no existe')
        await fila.update({ objetivo: textoLimpio(req.body.objetivo), items: listaDeTextos(req.body.items) })
        res.json(fila)
    }

    // ---------- Actividades ----------
    static getActividades = async (_req: Request, res: Response) => {
        const actividades = await Actividad.findAll({ order: [['clave', 'ASC'], ['perfil', 'ASC'], ['orden', 'ASC'], ['id', 'ASC']] })
        res.json(actividades)
    }

    static createActividad = async (req: Request, res: Response) => {
        const datos = camposActividad(req.body)
        if (!datos.clave || !datos.nombre || !datos.objetivo || datos.pasos.length === 0) {
            return error(res, 400, 'El rango, el nombre, el objetivo y al menos un paso son obligatorios')
        }
        const actividad = await Actividad.create(datos)
        res.status(201).json(actividad)
    }

    static updateActividad = async (req: Request, res: Response) => {
        const actividad = await Actividad.findByPk(+req.params.id)
        if (!actividad) return error(res, 404, 'La actividad no existe')
        const datos = camposActividad(req.body)
        if (!datos.clave || !datos.nombre || !datos.objetivo || datos.pasos.length === 0) {
            return error(res, 400, 'El rango, el nombre, el objetivo y al menos un paso son obligatorios')
        }
        await actividad.update(datos)
        res.json(actividad)
    }

    static deleteActividad = async (req: Request, res: Response) => {
        const eliminadas = await Actividad.destroy({ where: { id: +req.params.id } })
        if (!eliminadas) return error(res, 404, 'La actividad no existe')
        res.json({ message: 'Actividad eliminada' })
    }

    // ---------- Contactos de WhatsApp ----------
    static getContactos = async (_req: Request, res: Response) => {
        res.json(await Contacto.findAll({ order: [['id', 'ASC']] }))
    }

    private static datosContacto = (body: Record<string, unknown>) => ({
        nombre: textoLimpio(body.nombre),
        telefono: textoLimpio(body.telefono).replace(/\D/g, ''),
        descripcion: textoLimpio(body.descripcion) || null,
        activo: body.activo !== false
    })

    static createContacto = async (req: Request, res: Response) => {
        const datos = AdminController.datosContacto(req.body)
        if (!datos.nombre || datos.telefono.length < 10) return error(res, 400, 'Escribe el nombre y el número con indicativo de país (ej.: 573001234567)')
        res.status(201).json(await Contacto.create(datos))
    }

    static updateContacto = async (req: Request, res: Response) => {
        const contacto = await Contacto.findByPk(+req.params.id)
        if (!contacto) return error(res, 404, 'El contacto no existe')
        const datos = AdminController.datosContacto(req.body)
        if (!datos.nombre || datos.telefono.length < 10) return error(res, 400, 'Escribe el nombre y el número con indicativo de país (ej.: 573001234567)')
        await contacto.update(datos)
        res.json(contacto)
    }

    static deleteContacto = async (req: Request, res: Response) => {
        const eliminados = await Contacto.destroy({ where: { id: +req.params.id } })
        if (!eliminados) return error(res, 404, 'El contacto no existe')
        res.json({ message: 'Contacto eliminado' })
    }

    // ---------- Administradores ----------
    static getAdmins = async (_req: Request, res: Response) => {
        res.json(await User.findAll({ where: { rol: 'admin' }, attributes: ['id', 'name', 'email'], order: [['name', 'ASC']] }))
    }

    static setRol = async (req: Request, res: Response) => {
        const email = textoLimpio(req.body.email)
        const rol = req.body.rol === 'admin' ? 'admin' : 'usuario'
        const user = await User.findOne({ where: { email } })
        if (!user) return error(res, 404, 'No hay ninguna cuenta registrada con ese correo')
        if (rol === 'usuario' && user.id === req.user.id) return error(res, 400, 'No puedes quitarte a ti mismo el rol de administrador')
        await user.update({ rol })
        res.json({ message: rol === 'admin' ? `${user.name} ahora es administrador(a)` : `${user.name} ya no es administrador(a)` })
    }
}
