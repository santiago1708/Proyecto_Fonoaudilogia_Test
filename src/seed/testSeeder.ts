import { db } from '../config/db';
import Test from '../models/Test';
import colors from 'colors';

const testsData = [
    {
        name: "Cuestionario 0 a 6 meses",
        minMeses: 0,
        maxMeses: 6,
        preguntas: [
            { id: 1, pregunta: "¿El bebé es expuesto diariamente a televisión, celular o tablet?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿La exposición supera los 30 minutos al día?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿Permanece pasivo frente a la pantalla sin vocalizar?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Disminuye el contacto visual cuando hay dispositivos encendidos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Responde menos a la voz del cuidador cuando hay pantalla activa?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Se utiliza el celular o televisión para calmar el llanto?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Permanece solo frente a la pantalla sin interacción adulta?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿Hay pantallas encendidas de fondo durante gran parte del día?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿Se observa menor balbuceo comparado con otros bebés de su edad?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Prefiere fijar la mirada en la pantalla más que en el rostro del adulto?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    },
    {
        name: "Cuestionario 6 a 12 meses",
        minMeses: 7,
        maxMeses: 12,
        preguntas: [
            { id: 1, pregunta: "¿Está expuesto a pantallas más de 1 hora diaria?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿Disminuye el balbuceo después de usar dispositivos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿No responde consistentemente a su nombre cuando hay pantalla?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Se reduce la interacción vocal con adultos en presencia de pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Prefiere la pantalla sobre juguetes o interacción social?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Se le ofrece el dispositivo durante las comidas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Se altera cuando se retira el dispositivo?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿No señala objetos mientras observa contenido digital?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿Permanece más atento a la pantalla que a estímulos auditivos del entorno?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Se observa menor intención comunicativa cuando hay uso frecuente de pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    },
    {
        name: "Cuestionario 12 a 18 meses",
        minMeses: 13,
        maxMeses: 18,
        preguntas: [
            { id: 1, pregunta: "¿La exposición diaria supera 1 hora?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿Dice pocas palabras para su edad y usa frecuentemente pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿Prefiere el celular sobre la interacción con adultos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Imita sonidos digitales pero no palabras funcionales?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Usa dispositivos antes de dormir?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Permanece solo mientras utiliza el dispositivo?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Se altera significativamente al suspender el uso?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿Las pantallas reemplazan momentos de juego interactivo?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿No señala para pedir o mostrar objetos y tiene alta exposición digital?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Disminuye la respuesta a órdenes simples cuando hay pantalla activa?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    },
    {
        name: "Cuestionario 18 a 24 meses",
        minMeses: 19,
        maxMeses: 24,
        preguntas: [
            { id: 1, pregunta: "¿Está expuesto a pantallas más de 2 horas diarias?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿No combina dos palabras y presenta uso frecuente de dispositivos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿Repite frases de programas sin intención comunicativa?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Prefiere contenido digital sobre juego simbólico?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Usa dispositivos durante las comidas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Se distrae fácilmente después de usar pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Presenta berrinches intensos al retirar el dispositivo?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿Disminuye su iniciativa para comunicarse sin estímulo digital?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿Usa pantallas antes de dormir regularmente?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Permanece sin supervisión adulta mientras utiliza el dispositivo?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    },
    {
        name: "Cuestionario 2 a 3 años",
        minMeses: 25,
        maxMeses: 36,
        preguntas: [
            { id: 1, pregunta: "¿La exposición diaria supera 2 horas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿Repite guiones de dibujos animados fuera de contexto?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿Prefiere dispositivos sobre juego con otros niños?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Presenta dificultad para responder preguntas simples y usa frecuentemente pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Usa dispositivos antes de dormir?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Permanece más tiempo en pantallas que en juego libre?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Se irrita cuando se limita el tiempo de uso?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿Se distrae con facilidad en actividades sin estímulo digital?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿Presenta vocabulario limitado y alta exposición digital?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Permanece sin supervisión adulta mientras usa dispositivos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    },
    {
        name: "Cuestionario 3 a 4 años",
        minMeses: 37,
        maxMeses: 48,
        preguntas: [
            { id: 1, pregunta: "¿Usa pantallas más de 3 horas al día?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿Prefiere contenido digital sobre juego simbólico?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿Imita constantemente personajes digitales?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Tiene dificultad para narrar experiencias y usa frecuentemente pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Usa dispositivos durante las comidas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Tiene dispositivo propio?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Se distrae fácilmente tras uso prolongado?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿Presenta irritabilidad al retirar el dispositivo?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿Disminuye la participación en conversaciones familiares por uso digital?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Usa pantallas antes de dormir diariamente?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    },
    {
        name: "Cuestionario 4 a 5 años",
        minMeses: 49,
        maxMeses: 60,
        preguntas: [
            { id: 1, pregunta: "¿Usa pantallas más de 2–3 horas al día?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿Prefiere videos o videojuegos en lugar de escuchar cuentos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿Reemplaza actividades de juego por dispositivos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Tiene acceso libre sin supervisión constante?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Usa pantallas antes de dormir?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Presenta irritabilidad cuando no tiene acceso?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Se distrae fácilmente en actividades escolares?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿Habla frecuentemente de contenido digital en lugar de experiencias reales?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿Muestra bajo interés por actividades prelectoras debido a pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Permanece más tiempo frente a pantallas que interactuando con pares?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    },
    {
        name: "Cuestionario 5 a 6 años",
        minMeses: 61,
        maxMeses: 72,
        preguntas: [
            { id: 1, pregunta: "¿Usa pantallas más de 2 horas al día?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿Prefiere actividades digitales sobre conversaciones o juegos sociales?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿Ha disminuido su interés por la lectura debido al uso de pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Reemplaza tareas escolares por dispositivos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Usa dispositivos antes de dormir?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Presenta irritabilidad o ansiedad cuando no tiene acceso?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Se distrae fácilmente en clase tras uso prolongado?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿Habla constantemente de contenido digital?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿Tiene dispositivo propio?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Permanece sin supervisión adulta mientras usa pantallas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    },
    {
        name: "Cuestionario 6 a 7 años",
        minMeses: 73,
        maxMeses: 84,
        preguntas: [
            { id: 1, pregunta: "¿Usa dispositivos más de 3–4 horas al día?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 2, pregunta: "¿Prefiere videojuegos o redes sobre lectura recreativa?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 3, pregunta: "¿Realiza tareas escolares mientras tiene pantallas encendidas?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 4, pregunta: "¿Usa pantallas antes de dormir habitualmente?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 5, pregunta: "¿Tiene dispositivo propio con acceso libre?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 6, pregunta: "¿Presenta cambios conductuales cuando se restringe el uso?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 7, pregunta: "¿Se distrae con facilidad en el aula?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 8, pregunta: "¿Prefiere contenido digital sobre actividades al aire libre?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 9, pregunta: "¿Habla más de personajes digitales que de experiencias personales?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] },
            { id: 10, pregunta: "¿Permanece más tiempo frente a pantallas que interactuando con familia o amigos?", opciones: [{ respuesta: "No", puntaje: 0 }, { respuesta: "Sí", puntaje: 2 }] }
        ]
    }
];

const seedDB = async () => {
    try {
        await db.authenticate();
        await db.sync(); 
        await Test.destroy({ where: {} });

        await Test.bulkCreate(testsData);

        console.log(colors.green.bold('¡Los 9 cuestionarios (90 preguntas) se han insertado correctamente en la base de datos!'));
        process.exit(0);
    } catch (error) {
        console.log(colors.red.bold('Error al insertar los datos:'), error);
        process.exit(1);
    }
};

seedDB();