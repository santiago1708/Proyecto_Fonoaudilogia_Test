import { Model, Table, Column, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Kid from './Kid'
import Test from './Test'

@Table({
    tableName: 'kid_test'
})

class KidTest extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number

    @AllowNull(false)
    @ForeignKey(() => Kid)
    @Column({
        type: DataType.INTEGER
    })
    declare kidId: number

    @BelongsTo(() => Kid, { onDelete: 'CASCADE' })
    declare kid: Kid

    @AllowNull(false)
    @ForeignKey(() => Test)
    @Column({
        type: DataType.INTEGER
    })
    declare testId: number

    @BelongsTo(() => Test)
    declare test: Test

    // Desarrollo esperado | Riesgo leve | Riesgo alto
    @Column({
        type: DataType.STRING(100)
    })
    declare clasificacion: string

    // esperado | leve | alto
    @Column({
        type: DataType.STRING(20)
    })
    declare nivel: string

    @Column({
        type: DataType.TEXT
    })
    declare mensaje: string

    // Respuestas individuales: [{ idPregunta, pregunta, respuesta, puntaje }]
    @Column({
        type: DataType.JSON
    })
    declare respuestas: object

    // Respuestas que suman puntaje (requieren atención)
    @Column({
        type: DataType.JSON
    })
    declare indicadores: object

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare puntaje: number

    @AllowNull(false)
    @Column({
        type: DataType.DATEONLY
    })
    declare fechaRealizacion: Date

    // Edad exacta del niño al momento de la evaluación
    @Column({
        type: DataType.INTEGER
    })
    declare edadMeses: number

    @Column({
        type: DataType.STRING(30)
    })
    declare edadTexto: string

    @Column({
        type: DataType.STRING(20)
    })
    declare personaResponde: string

    @Column({
        type: DataType.STRING(30)
    })
    declare tiempoPantallas: string

    // Perfil de la cuenta que realizó la evaluación: familia | profesional
    @Column({
        type: DataType.STRING(20)
    })
    declare perfilUsuario: string

    // Mejora | Sin cambios | Empeoramiento | Primera evaluación
    @Column({
        type: DataType.STRING(30)
    })
    declare progreso: string

    @Column({
        type: DataType.TEXT
    })
    declare mensajeProgreso: string

    // Recomendaciones y actividades presentadas al finalizar la evaluación
    @Column({
        type: DataType.JSON
    })
    declare recomendaciones: object
}

export default KidTest
