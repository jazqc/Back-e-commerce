import mongoose from "mongoose"

export const dbConnection = async(): Promise<void> => {
    try {

        const dbURL = process.env.MONGODB_URI
        if (!dbURL) {
            throw new Error('La URL no está correctamente definida')
        }
        await mongoose.connect(dbURL)  
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la DB')
    }
}