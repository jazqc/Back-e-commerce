import { Request, Response } from "express"
import User, { IUser } from "../models/user"
import bcryptjs from "bcryptjs"
import { ROLES } from "../helpers/constants"
import randomstring from "randomstring"
import { sendEmail } from "../mailer/mailer"
import { generateJWT } from "../helpers/generateJWT"


//Registro de usuario
export const register = async (req: Request, res: Response) =>  {
    const {name, email, password, rol}: IUser= req.body
    const user = new User ({name, email, password, rol});
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    const adminKey = req.headers["admin-key"];

    if(adminKey === process.env.KEYFORADMIN as string) {
        user.rol = ROLES.admin

    }

    const newCode = randomstring.generate(6);
    user.code = newCode

    await user.save();

    await sendEmail(email, newCode);

    res.status(201).json({user})
}

//Login de usuario
export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password} : IUser = req.body;

    try {
        const user = await User.findOne({email})
        if(!user) {
            res.status(400).json ({
                msg: "Email no registrado, debe registrarse para loguearse"
            })
        return
        }
        
        const validatePassword =bcryptjs.compareSync(password, user.password);
        if(!validatePassword) {
            res.status(401).json({
               msg: "password incorrecto" 
            });
            return
        };

        const token = await generateJWT(user.id)
        res.status(202).json({
            user,
            token
        })
        
        if (user.rol === ROLES.admin)  {
            console.log("el user es admin")
        } else {
            console.log("el user no es admin")
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }

}


//verificar usuario
export const verifyUser = async (req: Request, res: Response) => {
    const {email, code} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user) {
            res.status(404).json({
                msg: "El email no existe en la DB"
            });
            return
        }
        if(user.verified) {
            res.status(404).json({
                msg: "El usuario ya está verificado"
            });
            return
        }
        if(code !== user.code) {
            res.status(401).json({
                msg: "El código es incorrecto"
            })
            return
        };
        await User.findOneAndUpdate(
            {email},
            {verified: true}
        );

        res.status(200).json({
            msg: "Usuario verificado con éxito"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
}