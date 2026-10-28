// Cuestionarios del documento "PARÁMETROS PARA PÁGINA WEB" (sección III).
// Las preguntas y puntajes se transcriben tal como aparecen en el documento.
// Rangos en meses: el mes del borde pertenece al rango mayor
// (ej.: 12 meses exactos -> rango 12–24 meses).

export type Opcion = { respuesta: string; puntaje: number }
// `recomendacion` (opcional): se muestra al usuario cuando la respuesta elegida suma puntos
export type Pregunta = { id: number; pregunta: string; opciones: Opcion[]; recomendacion?: string }
export type Cuestionario = {
    clave: string
    name: string
    rango: string
    minMeses: number
    maxMeses: number
    preguntas: Pregunta[]
}

const siNo: Opcion[] = [{ respuesta: 'Sí', puntaje: 0 }, { respuesta: 'No', puntaje: 2 }]
const noSi: Opcion[] = [{ respuesta: 'No', puntaje: 0 }, { respuesta: 'Sí', puntaje: 2 }]
const noAvecesSi: Opcion[] = [{ respuesta: 'No', puntaje: 0 }, { respuesta: 'A veces', puntaje: 1 }, { respuesta: 'Sí', puntaje: 2 }]
const nuncaAvecesSiempre: Opcion[] = [{ respuesta: 'Nunca', puntaje: 0 }, { respuesta: 'A veces', puntaje: 1 }, { respuesta: 'Siempre', puntaje: 2 }]
const pantallasHoras: Opcion[] = [
    { respuesta: 'No usa', puntaje: 0 },
    { respuesta: 'Menos de 1 hora', puntaje: 1 },
    { respuesta: '1–2 horas', puntaje: 2 },
    { respuesta: 'Más de 2 horas', puntaje: 3 }
]

const p = (id: number, pregunta: string, opciones: Opcion[]): Pregunta => ({ id, pregunta, opciones })

export const cuestionarios: Cuestionario[] = [
    {
        clave: '0-12m',
        name: 'Cuestionario 0 a 12 meses',
        rango: '0–12 meses',
        minMeses: 0,
        maxMeses: 11,
        preguntas: [
            p(1, '¿Responde cuando lo llaman por su nombre?', siNo),
            p(2, '¿Balbucea sonidos como "ba-ba" o "ma-ma"?', siNo),
            p(3, '¿Imita gestos o sonidos?', siNo),
            p(4, '¿Establece contacto visual durante la interacción?', siNo),
            p(5, '¿Se calma al escuchar la voz del cuidador?', siNo),
            p(6, 'Tiempo diario de exposición a pantallas:', [
                { respuesta: 'No usa', puntaje: 0 },
                { respuesta: 'Menos de 30 minutos', puntaje: 1 },
                { respuesta: '30–60 minutos', puntaje: 2 },
                { respuesta: 'Más de 1 hora', puntaje: 3 }
            ]),
            p(7, '¿Usa pantallas durante la alimentación?', nuncaAvecesSiempre),
            p(8, '¿Las pantallas reemplazan el juego cara a cara?', noAvecesSi),
            p(9, '¿Interactúa verbalmente con adultos varias veces al día?', siNo),
            p(10, '¿Presenta poco interés por sonidos del entorno?', noSi)
        ]
    },
    {
        clave: '12-24m',
        name: 'Cuestionario 12 a 24 meses',
        rango: '12–24 meses',
        minMeses: 12,
        maxMeses: 23,
        preguntas: [
            p(1, '¿Dice al menos 10 palabras con intención comunicativa?', siNo),
            p(2, '¿Señala para pedir o mostrar objetos?', siNo),
            p(3, '¿Comprende órdenes simples?', siNo),
            p(4, '¿Combina dos palabras?', siNo),
            p(5, '¿Imita palabras nuevas?', siNo),
            p(6, 'Tiempo diario de pantallas:', pantallasHoras),
            p(7, '¿Usa pantallas durante las comidas?', nuncaAvecesSiempre),
            p(8, '¿Prefiere la pantalla sobre la interacción con adultos?', noAvecesSi),
            p(9, '¿Responde cuando se le habla sin distracción digital?', siNo),
            p(10, '¿Tiene baja interacción verbal diaria?', noSi)
        ]
    },
    {
        clave: '2-3a',
        name: 'Cuestionario 2 a 3 años',
        rango: '2–3 años',
        minMeses: 24,
        maxMeses: 35,
        preguntas: [
            p(1, '¿Forma frases de dos o más palabras?', siNo),
            p(2, '¿Comprende instrucciones de dos pasos?', siNo),
            p(3, '¿Se le entiende al menos el 50% de lo que dice?', siNo),
            p(4, '¿Nombra objetos familiares?', siNo),
            p(5, '¿Intenta mantener conversación?', siNo),
            p(6, 'Tiempo diario de pantallas:', pantallasHoras),
            p(7, '¿Usa pantallas antes de dormir?', noSi),
            p(8, '¿Prefiere pantallas sobre el juego con otros niños?', noAvecesSi),
            p(9, '¿Presenta irritabilidad al retirar el dispositivo?', noSi),
            p(10, '¿Disminuye la interacción verbal por uso de pantallas?', noSi)
        ]
    },
    {
        clave: '3-4a',
        name: 'Cuestionario 3 a 4 años',
        rango: '3–4 años',
        minMeses: 36,
        maxMeses: 47,
        preguntas: [
            p(1, '¿El niño habla en frases completas de 4 o más palabras (por ejemplo: "quiero jugar con el carro")?', siNo),
            p(2, '¿Hace preguntas frecuentes como "qué", "dónde" o "por qué"?', siNo),
            p(3, '¿Se le entiende aproximadamente el 75% de lo que dice, incluso por personas que no lo conocen bien?', siNo),
            p(4, '¿Relata experiencias simples que le ocurrieron durante el día?', siNo),
            p(5, '¿Mantiene una conversación breve de al menos 2 o 3 turnos?', siNo),
            p(6, '¿Usa pantallas más de 2 horas al día?', noSi),
            p(7, '¿Usa dispositivos electrónicos antes de dormir?', noSi),
            p(8, '¿El uso de pantallas reduce el tiempo de interacción familiar (conversaciones, juego compartido)?', noSi),
            p(9, '¿Usa dispositivos electrónicos sin supervisión de un adulto?', noSi),
            p(10, '¿Presenta irritabilidad o enojo cuando se le retira el dispositivo?', noSi)
        ]
    },
    {
        clave: '4-5a',
        name: 'Cuestionario 4 a 5 años',
        rango: '4–5 años',
        minMeses: 48,
        maxMeses: 59,
        preguntas: [
            // Preguntas 1 a 5 con el puntaje tal como figura en el documento: No (0), Sí (2)
            p(1, '¿Narra hechos o historias siguiendo una secuencia lógica (inicio, desarrollo y final)?', noSi),
            p(2, '¿Utiliza un vocabulario variado para expresar ideas, emociones o describir objetos?', noSi),
            p(3, '¿Pronuncia correctamente la mayoría de los sonidos del habla para su edad?', noSi),
            p(4, '¿Comprende historias cortas cuando se le leen y puede responder preguntas sobre ellas?', noSi),
            p(5, '¿Mantiene una conversación de al menos 4 turnos (intercambios) con otra persona?', noSi),
            p(6, '¿Usa pantallas más de 2 horas al día?', noSi),
            p(7, '¿Usa dispositivos electrónicos sin supervisión adulta?', noSi),
            p(8, '¿Prefiere usar pantallas en lugar de realizar juegos activos o interactivos con otras personas?', noSi),
            p(9, '¿Utiliza pantallas durante las comidas?', noSi),
            p(10, '¿Presenta irritabilidad o dificultad para dejar el dispositivo cuando se le solicita?', noSi)
        ]
    },
    {
        clave: '5-6a',
        name: 'Cuestionario 5 a 6 años',
        rango: '5–6 años',
        minMeses: 60,
        maxMeses: 71,
        preguntas: [
            // Preguntas 1 a 5 con el puntaje tal como figura en el documento: No (0), Sí (2)
            p(1, '¿Narra historias estructuradas con inicio, desarrollo y final claramente definidos?', noSi),
            p(2, '¿Utiliza conectores como "porque", "entonces", "después" para organizar sus ideas?', noSi),
            p(3, '¿Presenta una pronunciación adecuada para su edad (sin errores persistentes en sonidos)?', noSi),
            p(4, '¿Comprende instrucciones complejas de dos o más pasos?', noSi),
            p(5, '¿Participa activamente en conversaciones grupales respetando turnos?', noSi),
            p(6, '¿Usa pantallas más de 2 horas al día?', noSi),
            p(7, '¿Usa dispositivos electrónicos sin supervisión adulta?', noSi),
            p(8, '¿Ha disminuido su interés por actividades sociales debido al uso de pantallas?', noSi),
            p(9, '¿Utiliza pantallas antes de dormir?', noSi),
            p(10, '¿Reemplaza actividades escolares o de aprendizaje por el uso de pantallas?', noSi)
        ]
    },
    {
        clave: '6-7a',
        name: 'Cuestionario 6 a 7 años',
        rango: '6–7 años',
        minMeses: 72,
        maxMeses: 84,
        preguntas: [
            p(1, '¿Narra historias con inicio, desarrollo y final coherente?', siNo),
            p(2, '¿Utiliza conectores como "porque", "entonces", "después"?', siNo),
            p(3, '¿Se le entiende claramente cuando habla?', siNo),
            p(4, '¿Comprende instrucciones de tres pasos?', siNo),
            p(5, '¿Participa adecuadamente en conversaciones grupales?', siNo),
            p(6, '¿Usa pantallas más de 2 horas diarias?', noSi),
            p(7, '¿Usa dispositivos sin supervisión adulta?', noSi),
            p(8, '¿Prefiere pantallas en lugar de actividades sociales o deportivas?', noAvecesSi),
            p(9, '¿Usa pantallas antes de dormir?', noSi),
            p(10, '¿Ha disminuido su interés por la lectura o actividades escolares debido al uso de pantallas?', noSi)
        ]
    }
]
