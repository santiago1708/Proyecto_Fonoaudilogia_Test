import {Model, Table, Column, DataType, Default, Unique, AllowNull} from 'sequelize-typescript'

@Table({
    tableName: 'user'
})

export class User extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
        allowNull: false
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

    @Column({
        type: DataType.STRING(6)
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean
}

export default User