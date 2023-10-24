import { NextFunction, Request, Response } from "express";
import Product, { IProduct } from "../models/products";


//Actualizar stock en la DB cuando se hace una compra
export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const items = req.body.items;
  const productsInDB = await Product.find();

  for (const el of items) {
    const product: IProduct | undefined = productsInDB.find(
      (p) => p.id === el.id
    );
    if (product) {
      await Product.findOneAndUpdate({ id: el.id }, { stock: product.stock as number - el.quantity });
      console.log(`stock del producto ${product.title} actualizado`)
    }
    else(
        res.status(404).json({
            msg: "producto no encontrado en la DB",
          }) 
    )
  }
//sigue cuando se actualizan el stock de cada producto comprado
  next();
};
