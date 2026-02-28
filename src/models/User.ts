import {Model, Table, Column, DataType, Default, Unique, AllowNull, HasMany} from 'sequelize-typescript'
import Kid from './Kid'

@Table({
    tableName: 'user'
})

class User extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare password: string

    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare email: string

    @AllowNull(false)
    @Column({
        type: DataType.ENUM('Madre', 'Padre', 'Cuidador', 'Profesional')
    })
    declare parentesco: string

    @Column({
        type: DataType.STRING(6)
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean

    @HasMany(() => Kid)
    declare kids: Kid[]
}

export default User