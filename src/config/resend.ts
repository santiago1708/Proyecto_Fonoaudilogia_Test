import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export const enviarCorreoConfirmacion = async (emailDestino: string, nombre: string, token: string) => {
    try {
        const data = await resend.emails.send({
            from: 'App de Evaluación <soporte@sveladevdomain.me>', // Usa tu dominio verificado
            to: emailDestino,
            subject: 'Confirma tu cuenta - Código de Verificación',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; color: #333;">
                    <h2 style="color: #4F46E5;">¡Hola, ${nombre}!</h2>
                    <p>Gracias por registrarte. Para activar tu cuenta, ingresa el siguiente código:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; display: inline-block; margin: 15px 0;">
                        <h1 style="font-size: 40px; letter-spacing: 5px; color: #4F46E5; margin: 0;">${token}</h1>
                    </div>
                    <p>O haz clic en el siguiente botón para ir directamente:</p>
                    <a href="${FRONTEND_URL}/api/auth/confirm-email" 
                       style="background-color: #4F46E5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 10px 0;">
                       Confirmar Cuenta
                    </a>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">Si el botón no funciona, copia y paste este enlace: ${FRONTEND_URL}/api/auth/confirm-email</p>
                </div>
            `
        });

        return data;
    } catch (error) {
        console.error('Error al enviar el correo con Resend:', error);
        throw new Error('No se pudo enviar el correo de verificación');
    }
};

export const enviarCorreoRecuperacion = async (emailDestino: string, nombre: string, token: string) => {
    try {
        const data = await resend.emails.send({
            from: 'App de Evaluación <onboarding@sveladevdomain.me>',
            to: emailDestino,
            subject: 'Recupera tu contraseña - Código de Verificación',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2>¡Hola, ${nombre}!</h2>
                    <p>Has solicitado recuperar tu contraseña. Ingresa el siguiente código de 6 dígitos:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; display: inline-block; margin: 15px 0;">
                        <h1 style="font-size: 40px; letter-spacing: 5px; color: #4F46E5; margin: 0;">${token}</h1>
                    </div>
                    <p style="color: #666; font-size: 14px;">Este código expirará pronto. Si no solicitaste este cambio, ignora este correo.</p>
                </div>
            `
        });
        return data;
    } catch (error) {
        console.error('Error al enviar el correo con Resend:', error);
        throw new Error('No se pudo enviar el correo de recuperación de contraseña');
    }
}