// Contenido de recomendaciones y actividades del documento
// "PARÁMETROS PARA PÁGINA WEB" (secciones IV a VIII).

export type Nivel = 'esperado' | 'leve' | 'alto'
export type Perfil = 'familia' | 'profesional'

export const NIVELES: Record<Nivel, { clasificacion: string; mensaje: string }> = {
    esperado: {
        clasificacion: 'Desarrollo esperado',
        mensaje: 'El desarrollo del lenguaje se encuentra acorde a la edad. Se recomienda continuar estimulando la interacción comunicativa y regular el uso de pantallas.'
    },
    leve: {
        clasificacion: 'Riesgo leve',
        mensaje: 'Se identifican algunos indicadores de alerta. Se recomienda supervisión y reducción del tiempo frente a dispositivos.'
    },
    alto: {
        clasificacion: 'Riesgo alto',
        mensaje: 'Se identifican múltiples factores de riesgo. Se recomienda valoración fonoaudiológica.'
    }
}

// Sección VIII: 0–5 Desarrollo esperado, 6–10 Riesgo leve, 11 o más Riesgo alto
export const clasificarPuntaje = (puntaje: number): Nivel => {
    if (puntaje <= 5) return 'esperado'
    if (puntaje <= 10) return 'leve'
    return 'alto'
}

export const perfilDeParentesco = (parentesco: string): Perfil =>
    parentesco === 'Profesional' ? 'profesional' : 'familia'

// Sección V: recomendaciones según el resultado (cuidador y/o padre de familia)
export const RECOMENDACIONES_FAMILIA: Record<Nivel, { objetivo: string; items: string[] }> = {
    esperado: {
        objetivo: 'Mantener y enriquecer las habilidades comunicativas.',
        items: [
            'Continuar con conversaciones cara a cara.',
            'Leer cuentos y jugar de acuerdo con la edad.',
            'Respetar las recomendaciones de uso de pantallas para cada etapa.',
            'Mantener rutinas de juego, conversación y lectura compartida.',
            'Continuar el seguimiento del desarrollo.'
        ]
    },
    leve: {
        objetivo: 'Fortalecer las interacciones y vigilar los indicadores identificados.',
        items: [
            'Aumentar las oportunidades de conversación durante las rutinas.',
            'Incorporar juegos de turnos y actividades comunicativas acordes con la edad.',
            'Evitar que las pantallas sustituyan el juego, las comidas compartidas o las conversaciones.',
            'Observar las habilidades que generaron alertas.',
            'Consultar con un profesional si las dificultades persisten o generan preocupación.'
        ]
    },
    alto: {
        objetivo: 'Orientar hacia una valoración profesional oportuna.',
        items: [
            'Recomendar una valoración fonoaudiológica.',
            'Indicar que las actividades en casa complementan, pero no sustituyen, la evaluación profesional.',
            'Sugerir interacciones cotidianas que no generen presión ni frustración.',
            'Facilitar el acceso al contacto profesional, si esta función se incorpora.',
            'Mantener el registro de los resultados para facilitar el seguimiento.'
        ]
    }
}

// Sección VI: texto introductorio y aviso del módulo profesional
export const INTRO_PROFESIONAL =
    'Este módulo ofrece orientaciones para profundizar en los indicadores identificados y acompañar la toma de decisiones clínicas. No reemplaza la evaluación profesional ni asigna automáticamente un diagnóstico: son recursos de apoyo que el profesional puede seleccionar y adaptar de acuerdo con las características del niño.'

export const AVISO_PROFESIONAL =
    'Estas actividades son propuestas de apoyo y no pruebas estandarizadas. Los resultados de cada actividad deben interpretarse en conjunto con la historia del desarrollo, la observación clínica y los procedimientos de evaluación que correspondan.'

export const AVISO_ORIENTATIVO =
    'Los resultados de FonoAlerta tienen carácter orientativo y no sustituyen una valoración fonoaudiológica.'

export type ActividadFamilia = {
    nombre: string
    objetivo: string
    pasos: string[]
    materiales: string
    recomendacion: string
}

export type ActividadProfesional = {
    nombre: string
    objetivo: string
    procedimiento: string[]
    aspectos: string
    orientacionFamiliar?: string
    orientacionProfesional?: string
    precaucion?: string
}

// Sección IV: actividades para el perfil cuidador y/o padre de familia
export const ACTIVIDADES_FAMILIA: Record<string, ActividadFamilia[]> = {
    '0-12m': [
        {
            nombre: '¡Hablemos cara a cara!',
            objetivo: 'Favorecer la atención a la voz, el intercambio comunicativo y la imitación de sonidos.',
            pasos: [
                'Ubíquese frente al bebé, a una distancia cómoda.',
                'Llámelo suavemente por su nombre y espere unos segundos.',
                'Sonríale, háblele y produzca sonidos sencillos.',
                'Si el bebé balbucea, responda imitando su sonido y agregando otro.',
                'Repita el intercambio durante unos minutos, respetando sus señales de cansancio.'
            ],
            materiales: 'Ninguno.',
            recomendacion: 'Realice esta actividad varias veces al día durante rutinas como el cambio de pañal, el baño o el juego. No es necesario que el bebé responda siempre de la misma manera.'
        },
        {
            nombre: 'Descubramos los sonidos',
            objetivo: 'Favorecer la atención auditiva y la interacción con el entorno.',
            pasos: [
                'En un ambiente tranquilo, produzca sonidos suaves con su voz o con objetos seguros.',
                'Observe si el bebé orienta la mirada, cambia su expresión o busca el origen del sonido.',
                'Nombre lo que escucha: «Escucha, suena la campana».',
                'Espere su reacción y vuelva a interactuar con él.'
            ],
            materiales: 'Objetos seguros que produzcan sonidos suaves.',
            recomendacion: 'Evite los sonidos fuertes y no utilice pantallas como sustituto de la interacción directa.'
        }
    ],
    '12-24m': [
        {
            nombre: 'Pido, señalo y nombro',
            objetivo: 'Fortalecer la intención comunicativa, los gestos y la comprensión de palabras.',
            pasos: [
                'Coloque dos objetos familiares frente al niño, como una pelota y un muñeco.',
                'Pregunte: «¿Quieres la pelota o el muñeco?».',
                'Espere a que señale, mire, vocalice o intente nombrar el objeto.',
                'Responda a su intención y modele la palabra: «Pelota, quieres la pelota».',
                'Repita con objetos de la vida cotidiana.'
            ],
            materiales: 'Juguetes u objetos familiares.',
            recomendacion: 'Acepte las diferentes formas de comunicación del niño y modele palabras sin obligarlo a repetirlas.'
        },
        {
            nombre: 'Hagamos lo que dice la canción',
            objetivo: 'Fortalecer la comprensión de palabras y la imitación de gestos.',
            pasos: [
                'Cante una canción infantil acompañada de movimientos.',
                'Modele acciones como aplaudir, saludar o levantar las manos.',
                'Invite al niño a imitarlas.',
                'Nombre cada acción mientras la realiza.',
                'Repita la canción y dé tiempo para que el niño participe.'
            ],
            materiales: 'Ninguno.',
            recomendacion: 'Priorice la canción compartida con el adulto; no necesita reproducirla en un dispositivo.'
        }
    ],
    '2-3a': [
        {
            nombre: 'La bolsa de los objetos',
            objetivo: 'Favorecer el vocabulario, la denominación y la producción de frases.',
            pasos: [
                'Introduzca en una bolsa tres o cuatro objetos familiares y seguros.',
                'Permita que el niño saque uno.',
                'Pregunte: «¿Qué es?» o «¿Para qué sirve?».',
                'Si dice una palabra, amplíela en una frase. Por ejemplo, si dice «carro», responda: «Sí, es un carro rojo».',
                'Continúe con los demás objetos.'
            ],
            materiales: 'Bolsa y objetos cotidianos.',
            recomendacion: 'Evite corregir constantemente la pronunciación; modele la forma correcta dentro de una conversación natural.'
        },
        {
            nombre: 'Sigamos instrucciones',
            objetivo: 'Favorecer la comprensión verbal y el seguimiento de instrucciones sencillas.',
            pasos: [
                'Pida al niño que realice una acción, como «dame la pelota».',
                'Cuando pueda hacerlo, proponga dos acciones relacionadas: «Toma el carro y ponlo en la caja».',
                'Acompañe la instrucción con gestos si lo necesita.',
                'Reconozca sus intentos y repita la actividad durante el juego.'
            ],
            materiales: 'Juguetes y una caja.',
            recomendacion: 'Ajuste la dificultad a la comprensión del niño, sin convertir el juego en una prueba de exigencia.'
        }
    ],
    '3-4a': [
        {
            nombre: 'Cuéntame qué pasó',
            objetivo: 'Favorecer la expresión oral, la organización de ideas y la conversación.',
            pasos: [
                'Converse con el niño sobre algo que haya hecho durante el día.',
                'Formule preguntas sencillas: «¿Con quién jugaste?» y «¿Qué hicieron?».',
                'Espere su respuesta sin anticiparse.',
                'Ayúdelo a ampliar sus frases mediante modelos: «Jugaste con tu amigo en el parque».',
                'Haga comentarios relacionados con lo que cuenta para mantener la conversación.'
            ],
            materiales: 'Ninguno.',
            recomendacion: 'Aproveche las experiencias cotidianas y valore el contenido de lo que comunica, no solamente la forma en que habla.'
        },
        {
            nombre: '¿Qué está pasando en la imagen?',
            objetivo: 'Fortalecer el vocabulario, la descripción y la construcción de frases.',
            pasos: [
                'Muestre al niño una imagen de una escena cotidiana o un libro ilustrado.',
                'Pregunte qué personas, objetos o acciones observa.',
                'Invítelo a explicar qué cree que está ocurriendo.',
                'Agregue palabras nuevas y amplíe sus respuestas.',
                'Cambie de imagen y repita.'
            ],
            materiales: 'Un libro ilustrado o dibujos hechos a mano.',
            recomendacion: 'Permita que el niño explore sus propias ideas y responda a sus preguntas con frases claras.'
        }
    ],
    '4-5a': [
        {
            nombre: 'Inventemos un cuento',
            objetivo: 'Favorecer la narración, el vocabulario y la secuencia de acontecimientos.',
            pasos: [
                'Elija un personaje y un lugar.',
                'Pregunte al niño qué podría pasarle al personaje.',
                'Ayúdelo a organizar la historia con preguntas sobre el inicio, lo que sucede después y el final.',
                'Modele conectores como «primero», «después» y «al final».',
                'Invítelo a contar nuevamente la historia con sus propias palabras.'
            ],
            materiales: 'Juguetes, objetos cotidianos o dibujos.',
            recomendacion: 'Valore las ideas y ayúdelo a organizar la narración sin exigir que memorice un relato.'
        },
        {
            nombre: 'Adivina qué es',
            objetivo: 'Fortalecer la descripción, el vocabulario y la comprensión de características.',
            pasos: [
                'Escoja un objeto conocido sin mostrarlo.',
                'Describa su color, forma, uso o lugar donde se encuentra.',
                'Invite al niño a adivinar.',
                'Cambien los roles para que el niño describa un objeto y usted lo adivine.'
            ],
            materiales: 'Objetos cotidianos.',
            recomendacion: 'Anime al niño a utilizar varias características para describir, respetando su nivel de expresión.'
        }
    ],
    '5-6a': [
        {
            nombre: 'Ordenemos la historia',
            objetivo: 'Fortalecer la secuenciación narrativa y la organización del discurso.',
            pasos: [
                'Relate una historia breve o describa una rutina conocida.',
                'Pida al niño que explique qué ocurrió primero, qué pasó después y cómo terminó.',
                'Pregunte por las razones de algunas acciones: «¿Por qué crees que pasó eso?».',
                'Invítelo a volver a contar la historia utilizando conectores.'
            ],
            materiales: 'Una historia conocida o situaciones de la vida cotidiana.',
            recomendacion: 'Escuche el relato completo antes de ayudarlo a reorganizar las ideas.'
        },
        {
            nombre: 'El reportero del día',
            objetivo: 'Favorecer la expresión de experiencias, la formulación de preguntas y los turnos conversacionales.',
            pasos: [
                'Invite al niño a contar una experiencia reciente.',
                'Haga preguntas como «¿qué ocurrió?», «¿quién estaba?» y «¿cómo te sentiste?».',
                'Después, permita que él le haga preguntas a usted.',
                'Escuche sin interrumpir y responda de manera relacionada con el tema.'
            ],
            materiales: 'Ninguno.',
            recomendacion: 'Convierta la conversación en una rutina familiar y evite sustituirla por videos durante ese momento.'
        }
    ],
    '6-7a': [
        {
            nombre: 'Te cuento y te explico',
            objetivo: 'Fortalecer la narración, la coherencia y el uso de conectores.',
            pasos: [
                'Pida al niño que explique cómo se realiza una actividad que conozca.',
                'Invítelo a organizar sus ideas en pasos.',
                'Anímelo a utilizar expresiones como «primero», «luego», «porque» y «finalmente».',
                'Haga preguntas para comprobar si la explicación se entiende.',
                'Permita que vuelva a explicarla con mayor claridad.'
            ],
            materiales: 'Ninguno.',
            recomendacion: 'Utilice actividades cotidianas, como preparar una merienda o explicar las reglas de un juego.'
        },
        {
            nombre: 'Club de lectura y conversación',
            objetivo: 'Favorecer la comprensión de relatos, la inferencia y la expresión de opiniones.',
            pasos: [
                'Lean juntos un cuento corto o un texto adecuado para su edad.',
                'Pregunte quiénes son los personajes, qué ocurrió y cómo terminó la historia.',
                'Converse sobre por qué sucedieron los acontecimientos.',
                'Invite al niño a expresar qué parte le gustó y por qué.',
                'Relacione la historia con una experiencia propia.'
            ],
            materiales: 'Libro o texto impreso.',
            recomendacion: 'Priorice la comprensión y el intercambio de ideas, no la velocidad de lectura.'
        }
    ]
}

// Sección VI: actividades para el perfil profesional
export const ACTIVIDADES_PROFESIONAL: Record<string, ActividadProfesional[]> = {
    '0-12m': [
        {
            nombre: 'Observación de la interacción comunicativa',
            objetivo: 'Observar las respuestas del bebé a la voz, los gestos y las oportunidades de interacción.',
            procedimiento: [
                'En un ambiente tranquilo, permita que el bebé interactúe con su cuidador.',
                'Observe la orientación hacia la voz, las expresiones faciales, los balbuceos y los turnos de interacción.',
                'Proponga al cuidador llamar al bebé, sonreírle y responder a sus vocalizaciones.',
                'Registre las respuestas observadas en diferentes momentos.'
            ],
            aspectos: 'Vocalizaciones, atención a la voz, reciprocidad y respuesta a los intentos comunicativos.',
            orientacionFamiliar: 'Responder a las vocalizaciones del bebé, hablarle durante las rutinas y mantener momentos de interacción cara a cara.'
        },
        {
            nombre: 'Observación de la respuesta a sonidos y voces',
            objetivo: 'Explorar las respuestas conductuales ante sonidos y estímulos vocales apropiados.',
            procedimiento: [
                'Presente la voz del cuidador y sonidos suaves en condiciones controladas.',
                'Observe cambios de atención, orientación o respuesta conductual.',
                'Registre los resultados sin interpretar la ausencia de una respuesta aislada como un diagnóstico.'
            ],
            aspectos: 'Respuesta a sonidos, atención auditiva e interacción.',
            orientacionProfesional: 'Si existen preocupaciones sobre la audición o la respuesta a sonidos, recomendar una evaluación auditiva según corresponda.'
        }
    ],
    '12-24m': [
        {
            nombre: 'Observación de la comunicación intencional',
            objetivo: 'Explorar cómo el niño solicita, señala, comparte atención y utiliza palabras o gestos.',
            procedimiento: [
                'Presente juguetes u objetos familiares.',
                'Observe si el niño solicita objetos, señala para compartir interés, mira al adulto o utiliza vocalizaciones y palabras.',
                'Cree oportunidades de comunicación durante el juego.',
                'Registre las formas de comunicación que aparecen espontáneamente y con ayuda.'
            ],
            aspectos: 'Intención comunicativa, gestos, atención conjunta y vocabulario expresivo.',
            orientacionFamiliar: 'Responder a los gestos e intentos comunicativos y modelar palabras en contextos cotidianos.'
        },
        {
            nombre: 'Comprensión de instrucciones cotidianas',
            objetivo: 'Observar la comprensión de palabras y órdenes sencillas.',
            procedimiento: [
                'Utilice objetos conocidos.',
                'Presente instrucciones sencillas y apropiadas para la edad.',
                'Observe si el niño responde sin depender exclusivamente de gestos.',
                'Registre las respuestas y las ayudas necesarias.'
            ],
            aspectos: 'Comprensión verbal, respuesta a instrucciones y necesidad de apoyos contextuales.',
            orientacionFamiliar: 'Dar instrucciones breves, acompañarlas con situaciones significativas y permitir tiempo para responder.'
        }
    ],
    '2-3a': [
        {
            nombre: 'Muestra de lenguaje espontáneo',
            objetivo: 'Explorar el vocabulario, la combinación de palabras y la intención de comunicación.',
            procedimiento: [
                'Proponga un juego libre con juguetes familiares.',
                'Evite dirigir toda la interacción mediante preguntas.',
                'Registre las palabras y combinaciones producidas espontáneamente.',
                'Observe cómo solicita, comenta, responde e inicia intercambios.'
            ],
            aspectos: 'Diversidad de vocabulario, combinación de palabras, comprensión y funciones comunicativas.',
            orientacionFamiliar: 'Ampliar las expresiones del niño mediante modelos naturales, sin exigir repeticiones constantes.'
        },
        {
            nombre: 'Juego de comprensión y secuencias',
            objetivo: 'Observar la comprensión de instrucciones sencillas y relacionadas.',
            procedimiento: [
                'Utilice muñecos u objetos de juego.',
                'Proponga acciones como «dale de comer al muñeco» o «guarda el carro en la caja».',
                'Observe la respuesta y la necesidad de apoyos.',
                'Registre los resultados según el contexto y las oportunidades ofrecidas.'
            ],
            aspectos: 'Comprensión verbal, vocabulario de acciones y seguimiento de instrucciones.',
            orientacionFamiliar: 'Incorporar instrucciones funcionales durante el juego y las rutinas del hogar.'
        }
    ],
    '3-4a': [
        {
            nombre: 'Descripción de escenas',
            objetivo: 'Observar el vocabulario, la construcción de frases y la organización de ideas.',
            procedimiento: [
                'Presente una imagen con una escena cotidiana.',
                'Invite al niño a contar qué sucede.',
                'Realice preguntas abiertas y dé tiempo para responder.',
                'Registre las estructuras lingüísticas utilizadas y los apoyos requeridos.'
            ],
            aspectos: 'Longitud y estructura de las frases, vocabulario, comprensión y coherencia.'
        },
        {
            nombre: 'Conversación por turnos',
            objetivo: 'Explorar la participación en intercambios comunicativos breves.',
            procedimiento: [
                'Converse sobre un tema conocido para el niño.',
                'Observe si responde, aporta información relacionada e inicia nuevos intercambios.',
                'Registre los turnos y los apoyos necesarios para mantener la interacción.'
            ],
            aspectos: 'Reciprocidad, mantenimiento del tema, comprensión y expresión oral.',
            orientacionFamiliar: 'Crear oportunidades para conversar y ampliar las respuestas sin convertir cada intercambio en un interrogatorio.'
        }
    ],
    '4-5a': [
        {
            nombre: 'Narración a partir de secuencias',
            objetivo: 'Explorar la organización temporal y causal del discurso.',
            procedimiento: [
                'Presente imágenes que representen una historia sencilla.',
                'Invite al niño a ordenarlas y contar lo sucedido.',
                'Observe cómo organiza el inicio, los acontecimientos y el desenlace.',
                'Registre el uso de conectores, vocabulario y relaciones entre los acontecimientos.'
            ],
            aspectos: 'Secuenciación, coherencia, cohesión y expresión narrativa.'
        },
        {
            nombre: 'Comprensión de relatos',
            objetivo: 'Explorar la comprensión de información explícita y las relaciones sencillas entre acontecimientos.',
            procedimiento: [
                'Lea un cuento breve apropiado para la edad.',
                'Formule preguntas sobre personajes, acciones y acontecimientos.',
                'Invite al niño a explicar por qué ocurrió una situación.',
                'Registre sus respuestas y los apoyos requeridos.'
            ],
            aspectos: 'Comprensión oral, vocabulario, inferencias sencillas y capacidad de explicar acontecimientos.'
        }
    ],
    '5-6a': [
        {
            nombre: 'Relato de experiencias',
            objetivo: 'Explorar la narración de experiencias y la organización del discurso.',
            procedimiento: [
                'Invite al niño a relatar una experiencia familiar.',
                'Observe si organiza los acontecimientos y establece relaciones temporales y causales.',
                'Formule preguntas de aclaración cuando sea necesario.',
                'Registre la estructura narrativa y los recursos lingüísticos utilizados.'
            ],
            aspectos: 'Coherencia, conectores, vocabulario y secuenciación.'
        },
        {
            nombre: 'Comprensión de instrucciones de varios pasos',
            objetivo: 'Explorar la comprensión de instrucciones acordes con la edad y la situación.',
            procedimiento: [
                'Presente instrucciones funcionales que incluyan dos acciones relacionadas.',
                'Observe si el niño las comprende y ejecuta.',
                'Registre la necesidad de repetición, apoyos o reformulación.'
            ],
            aspectos: 'Comprensión verbal, secuenciación de acciones y respuesta a instrucciones.',
            precaucion: 'Interpretar el desempeño teniendo en cuenta la atención, el contexto y otros factores que pueden influir en la respuesta.'
        }
    ],
    '6-7a': [
        {
            nombre: 'Organización y explicación de un relato',
            objetivo: 'Explorar la coherencia narrativa, el uso de conectores y la explicación de acontecimientos.',
            procedimiento: [
                'Pida al niño que relate una experiencia o una historia conocida.',
                'Observe la organización de los acontecimientos.',
                'Pregunte por las causas y consecuencias de las situaciones.',
                'Registre la coherencia, la cohesión y la claridad del mensaje.'
            ],
            aspectos: 'Estructura narrativa, conectores, vocabulario y relaciones causales.'
        },
        {
            nombre: 'Conversación sobre una lectura',
            objetivo: 'Explorar la comprensión oral, la formulación de opiniones y la participación conversacional.',
            procedimiento: [
                'Lea un texto breve o permita que el niño lo lea según sus habilidades.',
                'Formule preguntas de comprensión.',
                'Pida que explique una idea o justifique una opinión.',
                'Observe la organización de las respuestas, la pertinencia de la información y los turnos conversacionales.'
            ],
            aspectos: 'Comprensión, expresión, coherencia y participación comunicativa.',
            orientacionFamiliar: 'Mantener momentos de lectura compartida y conversaciones sobre las experiencias cotidianas.'
        }
    ]
}

// Parámetros, sección III: campos obligatorios de cada evaluación
export const PERSONAS_RESPONDE = ['Madre', 'Padre', 'Cuidador', 'Profesional']
export const TIEMPOS_PANTALLA = ['No usa', 'Menos de 1 hora', '1–2 horas', 'Más de 2 horas']
