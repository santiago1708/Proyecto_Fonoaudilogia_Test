import { Model, Table, Column, DataType, AllowNull, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import User from './User'
import KidTest from './KidTest'
import { edadEnMeses, formatearEdad } from '../utils/edad'

@Table({
    tableName: 'kids'
})

class Kid extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type: DataType.ENUM('Masculino', 'Femenino')
    })
    declare genero: string

    @AllowNull(false)
    @Column({
        type: DataType.DATEONLY
    })
    declare fechaNacimiento: Date

    @Column({
        type: DataType.VIRTUAL,
        get(this: Kid) {
            return formatearEdad(edadEnMeses(this.getDataValue('fechaNacimiento')))
        }
    })
    declare edadCalculada: string

    @Column({
        type: DataType.VIRTUAL,
        get(this: Kid) {
            return edadEnMeses(this.getDataValue('fechaNacimiento'))
        }
    })
    declare edadEnMeses: number

    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare escolarizacion: boolean

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    declare observaciones: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    declare userId: number

    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    declare user: User

    @HasMany(() => KidTest)
    declare kidTests: KidTest[]
}

export default Kid
