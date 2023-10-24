import { NextFunction, Request, Response } from "express";
import { ROLES } from "../helpers/constants";

//Validar rol para funciones de administrador
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const {rol} = req.body.userConfirmed;
    if (rol !== ROLES.admin) {
        res.status(401).json({
            msg: "El usuario no es administrador",
          });
        return
    }
    console.log("El usuario es administrador")
    next();

}

