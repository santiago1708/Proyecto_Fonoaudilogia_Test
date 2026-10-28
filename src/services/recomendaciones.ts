import Actividad from '../models/Actividad'
import RecomendacionNivel from '../models/RecomendacionNivel'
import { AVISO_ORIENTATIVO, AVISO_PROFESIONAL, NIVELES, type Nivel, type Perfil } from '../data/contenido'
import type { Pregunta } from '../data/cuestionarios'

type Indicador = { idPregunta: number; pregunta: string; respuesta: string; puntaje: number }

const actividadParaPerfil = (a: Actividad, perfil: Perfil) => perfil === 'profesional'
    ? {
        nombre: a.nombre, objetivo: a.objetivo, procedimiento: a.pasos, aspectos: a.aspectos ?? '',
        orientacionFamiliar: a.orientacionFamiliar || undefined,
        orientacionProfesional: a.orientacionProfesional || undefined,
        precaucion: a.precaucion || undefined
    }
    : {
        nombre: a.nombre, objetivo: a.objetivo, pasos: a.pasos,
        materiales: a.materiales ?? '', recomendacion: a.recomendacion ?? ''
    }

// Bloque de recomendaciones y actividades que se muestra (y se guarda) al finalizar
// una evaluación, según el rango de edad, el resultado, el perfil y las respuestas.
export const armarRecomendaciones = async (
    clave: string, nivel: Nivel, perfil: Perfil, indicadores: Indicador[], preguntas: Pregunta[]
) => {
    const [general, actividades] = await Promise.all([
        RecomendacionNivel.findOne({ where: { nivel, perfil } }),
        Actividad.findAll({ where: { clave, perfil }, order: [['orden', 'ASC'], ['id', 'ASC']] })
    ])

    // Recomendaciones asociadas a las preguntas que sumaron puntos
    const porRespuesta = indicadores
        .map(ind => ({ ...ind, recomendacion: preguntas.find(p => p.id === ind.idPregunta)?.recomendacion?.trim() }))
        .filter(r => r.recomendacion)

    const lista = actividades.map(a => actividadParaPerfil(a, perfil))
    const base = {
        perfil,
        nivel,
        mensaje: NIVELES[nivel].mensaje,
        recomendaciones: general?.items ?? [],
        porRespuesta
    }

    return perfil === 'profesional'
        ? { ...base, introduccion: general?.objetivo ?? '', actividadesProfesional: lista, aviso: AVISO_PROFESIONAL }
        : { ...base, objetivo: general?.objetivo ?? '', actividadesFamilia: lista, aviso: AVISO_ORIENTATIVO }
}
