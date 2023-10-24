import { Router } from "express";
import { createOrders, getOrders } from "../controllers/orders"
import { recolectarErrores } from "../middlewares/recolectarErrores";
import validarJWT from "../middlewares/validarJWT";
import { isVerified } from "../middlewares/validarVerificado";
import { check } from "express-validator";
import { checkStock } from "../middlewares/checkStock";
import { updateStock } from "../middlewares/updateStock";



const router = Router()

router.get("/", 
[
    validarJWT,
    recolectarErrores
],
getOrders)

router.post("/",
[
    validarJWT,
    isVerified,
    check("totalPrice", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("totalCost", "El total es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
    check("items", "Los items son obligatorio").not().isEmpty(),   
    checkStock,
    updateStock,
    recolectarErrores
], 
createOrders)

export default router