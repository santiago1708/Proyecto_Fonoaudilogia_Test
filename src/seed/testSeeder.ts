import { Op } from 'sequelize'
import colors from 'colors'
import { db } from '../config/db'
import Test from '../models/Test'
import KidTest from '../models/KidTest'
import Actividad from '../models/Actividad'
import RecomendacionNivel from '../models/RecomendacionNivel'
import { cuestionarios } from '../data/cuestionarios'
import { ACTIVIDADES_FAMILIA, ACTIVIDADES_PROFESIONAL, INTRO_PROFESIONAL, RECOMENDACIONES_FAMILIA, type Nivel } from '../data/contenido'

// Carga el contenido inicial del documento de parámetros.
//   npm run seed               -> solo crea lo que falta (respeta lo editado desde el panel)
//   npm run seed -- --reiniciar -> restaura cuestionarios, recomendaciones y actividades originales
const reiniciar = process.argv.includes('--reiniciar')

const seedDB = async () => {
    try {
        await db.authenticate()
        await db.sync({ alter: true })

        // 1. Cuestionarios
        let creados = 0
        for (const c of cuestionarios) {
            const existente = await Test.findOne({ where: { clave: c.clave } })
            if (!existente) {
                await Test.create({ ...c, activo: true })
                creados++
            } else if (reiniciar) {
                await existente.update({ ...c, activo: true })
            }
        }

        // Los cuestionarios de la versión anterior (sin clave) se borran si no tienen evaluaciones;
        // si las tienen, quedan inactivos para conservar el historial
        const antiguos = await Test.findAll({
            where: { [Op.or]: [{ clave: null }, ...(reiniciar ? [{ clave: { [Op.notIn]: cuestionarios.map(c => c.clave) } }] : [])] }
        })
        for (const t of antiguos) {
            if (await KidTest.count({ where: { testId: t.id } })) await t.update({ activo: false })
            else await t.destroy()
        }

        // 2. Recomendaciones por resultado (familia y profesional)
        if (reiniciar) await RecomendacionNivel.destroy({ where: {} })
        if (await RecomendacionNivel.count() === 0) {
            const niveles = Object.keys(RECOMENDACIONES_FAMILIA) as Nivel[]
            await RecomendacionNivel.bulkCreate([
                ...niveles.map(nivel => ({ nivel, perfil: 'familia', ...RECOMENDACIONES_FAMILIA[nivel] })),
                ...niveles.map(nivel => ({ nivel, perfil: 'profesional', objetivo: INTRO_PROFESIONAL, items: [] }))
            ])
        }

        // 3. Actividades por rango de edad
        if (reiniciar) await Actividad.destroy({ where: {} })
        if (await Actividad.count() === 0) {
            const familia = Object.entries(ACTIVIDADES_FAMILIA).flatMap(([clave, lista]) =>
                lista.map((a, orden) => ({ clave, perfil: 'familia', orden, ...a })))
            const profesional = Object.entries(ACTIVIDADES_PROFESIONAL).flatMap(([clave, lista]) =>
                lista.map(({ procedimiento, ...a }, orden) => ({ clave, perfil: 'profesional', orden, pasos: procedimiento, ...a })))
            await Actividad.bulkCreate([...familia, ...profesional])
        }

        console.log(colors.green.bold(reiniciar
            ? 'Contenido original restaurado (cuestionarios, recomendaciones y actividades).'
            : `Contenido listo. Cuestionarios nuevos creados: ${creados}.`))
        process.exit(0)
    } catch (error) {
        console.log(colors.red.bold('Error al cargar el contenido:'), error)
        process.exit(1)
    }
}

seedDB()
