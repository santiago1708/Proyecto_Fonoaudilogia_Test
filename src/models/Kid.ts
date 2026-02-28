import {Model, Table, Column, DataType, AllowNull, ForeignKey, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import User from './User'
import dayjs from 'dayjs'
import Test from './Test'
import KidTest from './KidTest'

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
            const nacimiento = dayjs(this.getDataValue('fechaNacimiento'));
            const hoy = dayjs();
            
            const mesesTotales = hoy.diff(nacimiento, 'month');

            if (mesesTotales < 1) {
                const dias = hoy.diff(nacimiento, 'day');
                return `${dias} días`;
            } else if (mesesTotales < 12) {
                return `${mesesTotales} meses`;
            } else {
                const anios = hoy.diff(nacimiento, 'year');
                return `${anios} años`; 
            }
        }
    })
    declare edadCalculada: string;

    @Column({
        type: DataType.VIRTUAL,
        get(this: Kid) {
            const nacimiento = dayjs(this.getDataValue('fechaNacimiento'));
            const hoy = dayjs();
            return hoy.diff(nacimiento, 'month');
        }
    })
    declare edadEnMeses: number;

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

    @BelongsTo(() => User)
    declare user: User

    @BelongsToMany(() => Test, () => KidTest)
    declare tests: Test[]
}

export default Kid