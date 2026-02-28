import { Model, Table, Column, DataType, AllowNull, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript'
import KidTest from './KidTest'
import Kid from './Kid'

@Table({
    tableName: 'test'
})

class Test extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string

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

    @BelongsToMany(() => Kid, () => KidTest)
    declare kids: Kid[];
}

export default Test