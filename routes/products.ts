import { Router } from "express";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { check } from "express-validator";
import validarJWT from "../middlewares/validarJWT";
import { isAdmin } from "../middlewares/validarRol";
import { addProducts, getProducts, changeStock, changeProduct } from "../controllers/products";
import { existProduct } from "../helpers/validacionesDB";



const router = Router()

router.get("/", 
[
    recolectarErrores
],
getProducts)

router.post("/",
[   
    validarJWT,
    isAdmin,
    check("desc", "La descripción es obligatoria").not().isEmpty(),
    check("id", "El id es obligatorio").not().isEmpty(),
    check ("id").custom(existProduct),
    check("price", "El precio es obligatorio").not().isEmpty(),   
    check("stock", "El stock es obligatorio").not().isEmpty(),
    check("title", "El nombre es obligatorio").not().isEmpty(),
    recolectarErrores
], 
addProducts)

router.patch("/changeStock",
[   
    validarJWT,
    isAdmin,
    check("id", "El id es obligatorio").not().isEmpty(),
    check("stock", "El stock obligatorio").not().isEmpty(),
    recolectarErrores
], 
changeStock)

router.patch("/changeProduct",
[   
    validarJWT,
    isAdmin,
    check("id", "El id es obligatorio").not().isEmpty(),
    recolectarErrores
], 
changeProduct)



export default router
