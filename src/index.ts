import colors from 'colors'
import app from './server';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${colors.yellow(PORT.toString())}`);
})