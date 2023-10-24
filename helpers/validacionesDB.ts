import { sendEmail } from "../mailer/mailer"
import Product, { IProduct } from "../models/products"
import User, { IUser } from "../models/user"


//validación de registro de email
export const existEmail =async (email: string): Promise<void> => {
    const existEmail: IUser | null = await User.findOne({email})

    if (existEmail && existEmail.verified) {
        throw new Error(`El correo ${email} ya está registrado`)
    }

    if (existEmail && !existEmail.verified) {
        await sendEmail(email, existEmail.code as string)
        throw new Error(`El usuario ya está registrado y se reenvió el código de verificación a ${email}`)
    }
}

//validación de ID de producto

export const existProduct =async (id: Number): Promise<void> => {
    const existProduct: IProduct| null = await Product.findOne({id})

    if (existProduct) {
        throw new Error(`Ya existe un producto con el id: ${id}`)
    }
}