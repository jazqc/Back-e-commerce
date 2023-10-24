import nodemailer from 'nodemailer';
require('dotenv').config();


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cussejazmin@gmail.com',
        pass: process.env.KEYFOREMAIL
    },
from: 'cussejazmin@gmail.com'
});

export const sendEmail = async (to: string, code: string): Promise<void> => {

    const mailOptions = {
        from: '"Tienda de Perfumes" cussejazmin@gmail.com',
        to,
        subject: 'Código de verificación para Tienda de Perfumes',
        text: `
            LLegó tu código de verificación para Tienda de perfumes.
            El código es ${code}
            `
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("correo electrónico enviado")
    } catch (error) {
        console.log("Error al enviar el correo electrónico: ", error)
    }
}