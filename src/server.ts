import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import { db } from './config/db';
import routerKid from './routes/kidRouter';
import routerTest from './routes/testRouter';
import routerTestKid from './routes/test_kidRouter';
import routerAuth from './routes/authRouter';
import routerAdmin from './routes/adminRouter';
import routerContacto from './routes/contactoRouter';

async function connectDB() {
    try {
        await db.authenticate()
        await db.sync({ alter: true })
        console.log(colors.green('Conexión a la base de datos establecida correctamente'));
    } catch (error) {
        console.log(colors.red('Error al conectar a la base de datos:'), error);
    }
}

connectDB();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', routerAuth)
app.use('/api/kid', routerKid)
app.use('/api/test', routerTest)
app.use('/api/evaluacion', routerTestKid)
app.use('/api/contactos', routerContacto)
app.use('/api/admin', routerAdmin)

export default app;
