import colors from 'colors'
import { db } from '../config/db'
import User from '../models/User'

// Uso: npm run admin -- correo@ejemplo.com
// La persona debe haberse registrado antes en la aplicación.
const correo = process.argv[2]?.trim()

const main = async () => {
    if (!correo) {
        console.log(colors.yellow('Uso: npm run admin -- correo@ejemplo.com'))
        process.exit(1)
    }
    await db.authenticate()
    await db.sync({ alter: true })
    const user = await User.findOne({ where: { email: correo } })
    if (!user) {
        console.log(colors.red(`No hay ninguna cuenta registrada con el correo ${correo}`))
        process.exit(1)
    }
    await user.update({ rol: 'admin' })
    console.log(colors.green(`${user.name} (${user.email}) ahora es administrador(a).`))
    process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
