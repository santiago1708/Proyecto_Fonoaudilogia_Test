import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const enviarCorreoConfirmacion = async (emailDestino: string, nombre: string, token: string) => {
    try {
        const data = await resend.emails.send({
            from: 'App de Evaluación <onboarding@resend.dev>',
            to: emailDestino,
            subject: 'Confirma tu cuenta - Código de Verificación',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2>¡Hola, ${nombre}!</h2>
                    <p>Gracias por registrarte en nuestro sistema. Para activar tu cuenta, ingresa el siguiente código de 6 dígitos:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; display: inline-block; margin: 15px 0;">
                        <h1 style="font-size: 40px; letter-spacing: 5px; color: #4F46E5; margin: 0;">${token}</h1>
                    </div>
                    <p style="color: #666; font-size: 14px;">Este código expirará pronto. Si no solicitaste este registro, ignora este correo.</p>
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
            from: 'App de Evaluación <onboarding@resend.dev>',
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