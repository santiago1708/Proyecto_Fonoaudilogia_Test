import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

// DB_SSL=false para una base local (PostgreSQL en el PC no usa SSL).
// Si no se define, se mantiene la configuración original usada en el despliegue.
const usarSSL = process.env.DB_SSL !== 'false'

export const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: usarSSL ? { ssl: { require: false } } : {}
})
