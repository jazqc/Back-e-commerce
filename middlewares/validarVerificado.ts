import { Request, Response, NextFunction } from "express";

export const isVerified = (req: Request, res: Response, next: NextFunction) =>
{
    const {verified} = req.body.userConfirmed;

    if(!verified) {
        res.status(401).json({
            msg: "el usuario no está verificado"
        })
    return
    }
    next();
}