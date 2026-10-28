import { Model, Table, Column, DataType, AllowNull, Default } from 'sequelize-typescript'

// Actividades por rango de edad y perfil (familia | profesional), gestionadas por administradores
@Table({ tableName: 'actividades' })
class Actividad extends Model {
    // Clave del rango de edad del cuestionario (ej.: '0-12m')
    @AllowNull(false)
    @Column({ type: DataType.STRING(10) })
    declare clave: string

    @AllowNull(false)
    @Column({ type: DataType.ENUM('familia', 'profesional') })
    declare perfil: string

    @AllowNull(false)
    @Column({ type: DataType.STRING(120) })
    declare nombre: string

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    declare objetivo: string

    // Pasos (familia) o procedimiento (profesional)
    @AllowNull(false)
    @Default([])
    @Column({ type: DataType.JSON })
    declare pasos: string[]

    @Column({ type: DataType.TEXT })
    declare materiales: string

    @Column({ type: DataType.TEXT })
    declare recomendacion: string

    @Column({ type: DataType.TEXT })
    declare aspectos: string

    @Column({ type: DataType.TEXT })
    declare orientacionFamiliar: string

    @Column({ type: DataType.TEXT })
    declare orientacionProfesional: string

    @Column({ type: DataType.TEXT })
    declare precaucion: string

    @Default(0)
    @Column({ type: DataType.INTEGER })
    declare orden: number
}

export default Actividad
