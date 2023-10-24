import express, {Express} from "express";
import cors from "cors";
import authRoutes from "../routes/auth"
import ordersRoutes from "../routes/orders"
import productsRoutes from "../routes/products"
import favsRoutes from "../routes/favs"
import { dbConnection } from "../database/config";

export class Server {
    app: Express
    port: string | number | undefined
    authPath: string
    ordersPath: string
    productsPath: string
    favsPath: string

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/auth';
        this.ordersPath =  '/orders';
        this.productsPath = '/products';
        this.favsPath = '/favs';


        this.conectDB()
        this.middelwares()
        this.routes()
    }
    async conectDB(): Promise<void> {
        await dbConnection();
    }

    middelwares(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(): void {
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.ordersPath, ordersRoutes)
        this.app.use(this.productsPath, productsRoutes)
        this.app.use(this.favsPath, favsRoutes)
    }
    
    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`corriendo en puerto ${this.port}`)
        })
    }
}