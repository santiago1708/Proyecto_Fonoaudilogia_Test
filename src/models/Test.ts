import { Model, Table, Column, DataType, AllowNull, HasMany, Default, Unique } from 'sequelize-typescript'
import KidTest from './KidTest'

@Table({
    tableName: 'test'
})

class Test extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string

    // Identificador del rango de edad (ej.: '0-12m', '2-3a')
    @Unique
    @Column({
        type: DataType.STRING(10)
    })
    declare clave: string

    @Column({
        type: DataType.STRING(30)
    })
    declare rango: string

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare minMeses: number

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare maxMeses: number

    @AllowNull(false)
    @Column({
        type: DataType.JSON
    })
    declare preguntas: object

    // Los cuestionarios antiguos quedan inactivos para conservar el historial
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare activo: boolean

    @HasMany(() => KidTest)
    declare kidTests: KidTest[]
}

export default Test
