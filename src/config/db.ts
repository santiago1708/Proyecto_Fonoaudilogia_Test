import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

// DB_SSL=false para una base local (PostgreSQL en el PC no usa SSL).
// En Render (u otro servicio en la nube) se deja sin definir: la conexión va cifrada
// y se acepta el certificado propio del proveedor.
const usarSSL = process.env.DB_SSL !== 'false'

export const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: usarSSL ? { ssl: { require: true, rejectUnauthorized: false } } : {}
})
