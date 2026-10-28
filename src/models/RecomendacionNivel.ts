import { Model, Table, Column, DataType, AllowNull, Default } from 'sequelize-typescript'

// Recomendaciones según el resultado (nivel) y el perfil, gestionadas por administradores
@Table({ tableName: 'recomendaciones_nivel' })
class RecomendacionNivel extends Model {
    @AllowNull(false)
    @Column({ type: DataType.ENUM('esperado', 'leve', 'alto') })
    declare nivel: string

    @AllowNull(false)
    @Column({ type: DataType.ENUM('familia', 'profesional') })
    declare perfil: string

    @Column({ type: DataType.TEXT })
    declare objetivo: string

    @AllowNull(false)
    @Default([])
    @Column({ type: DataType.JSON })
    declare items: string[]
}

export default RecomendacionNivel
