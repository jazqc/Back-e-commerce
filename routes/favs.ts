import { Router } from "express";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { addFavs, getFavs } from "../controllers/favs";
// import { existProduct } from "../helpers/validacionesDB";



const router = Router()

router.get("/", 
[
    validarJWT,
    isVerified,
    recolectarErrores
],
getFavs)

router.post("/", 
[
    validarJWT,
    isVerified,
    recolectarErrores
],
addFavs)


export default router