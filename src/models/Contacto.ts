import { Model, Table, Column, DataType, AllowNull, Default } from 'sequelize-typescript'

// Fonoaudiólogas disponibles para el contacto por WhatsApp
@Table({ tableName: 'contactos' })
class Contacto extends Model {
    @AllowNull(false)
    @Column({ type: DataType.STRING(80) })
    declare nombre: string

    // Número con indicativo de país, solo dígitos (ej.: 573001234567)
    @AllowNull(false)
    @Column({ type: DataType.STRING(20) })
    declare telefono: string

    @Column({ type: DataType.STRING(160) })
    declare descripcion: string

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    declare activo: boolean
}

export default Contacto
