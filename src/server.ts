import express from 'express'; 
import morgan from 'morgan';
import colors from 'colors';
import { db } from './config/db';
import routerAuth from './routes/AuthRouter';
import routerKid from './routes/kidRouter';

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green('Conexión a la base de datos establecida correctamente'));
    } catch (error) {
        console.log(colors.red('Error al conectar a la base de datos:'), error);
    }
}

connectDB();
const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', routerAuth)
app.use('/api/kid', routerKid)

export default app;