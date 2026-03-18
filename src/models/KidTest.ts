import {Model, Table, Column, DataType, AllowNull, ForeignKey, BelongsTo} from 'sequelize-typescript'
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
    declare id: number;

    @AllowNull(false)
    @ForeignKey(() => Kid)
    @Column({
        type: DataType.INTEGER
    })
    declare kidId: number

    @AllowNull(false)
    @ForeignKey(() => Test)
    @Column({
        type: DataType.INTEGER
    })
    declare testId: number

    @Column({
        type: DataType.STRING(100)
    })
    declare clasificacion: string

    @Column({
        type: DataType.JSON
    })
    declare respuestas: object

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
}

export default KidTest