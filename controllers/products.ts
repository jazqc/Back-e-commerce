
import {Request, Response} from "express";
import { ObjectId } from "mongoose";
import Product, { IProduct } from "../models/products";


//Traer los productos de la base de datos
export const getProducts = async (req: Request, res: Response) => {


    const products = await Product.find()

    res.status(200).json ({
        data: [
            ...products
        ]

    })

}

//Agregar productos a la base de datos
export const addProducts = async (req: Request, res: Response) => {
    const productData: IProduct = req.body

    const data = {
        ...productData,
    }

    const product = new Product(data)
    await product.save()
    res.status(201).json({
        msg: "producto creado con exito"
    })
}

//Modificar el stock de un producto
export const changeStock =async (req: Request, res: Response) => {
    const {id, stock}: IProduct = req.body

    try {
        const product = await Product.findOne({id})
        if(!product) {
            res.status(404).json({
                msg: "producto no existe en la Base de datos"
            });
        return
    }
    await Product.findOneAndUpdate(
        {id},
        {stock: stock}
    )
    res.status(200).json({
        msg: "Stock modificado con éxito"
    })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
    
}

//Modificar datos de un producto
export const changeProduct =async (req: Request, res: Response) => {
    const {id, desc, img, price, title}: IProduct = req.body

    try {
        const product = await Product.findOne({id})
        if(!product) {
            res.status(404).json({
                msg: "producto no existe en la Base de datos"
            });
        return
    }
    await Product.findOneAndUpdate(
        {id},
        {desc: desc,
        img: img,
        price: price,
        title: title}


    )
    res.status(200).json({
        msg: "producto modificado con éxito"
    })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
    
}      
