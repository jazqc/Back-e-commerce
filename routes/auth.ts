import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import {check} from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existEmail } from "../helpers/validacionesDB";
import { isVerified } from "../middlewares/validarVerificado";

const router = Router()

router.post("/register",
[
    check ("name", 'el nombre es obligatorio').not().isEmpty(), 
    check ("email", 'el email es obligatorio').isEmail(), 
    check ("password", 'el password debe ser de 6 digitos').isLength({min: 6}), 
    check ("email").custom(existEmail),     
    
    recolectarErrores
],
register)

router.post("/login",
[
    check ("email", 'el email es obligatorio').not().isEmpty(), 
    check ("email", 'el email no es válido').isEmail(),
    check ("password", 'el password debe ser de 6 digitos').isLength({min: 6}),
    recolectarErrores 
],
login
);

router.patch (
    "/verify",
    [
        check ("email", 'el email es obligatorio').not().isEmpty(), 
        check ("email", 'el email no es válido').isEmail(),
        check ("code", 'el código es obligatorio').not().isEmpty(),
        recolectarErrores

    ],
    verifyUser
)

export default router