import { NextFunction, Request, Response } from "express";
import Product from "../models/products";

//chequeo si hay stock para cumplir con las cantidades
export const checkStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const items = req.body.items;
  const productsInDB = await Product.find();
  const errorMsg: string[] = [];
  items.forEach(async (el: { id: number; quantity: Number }) => {
    const product = productsInDB.find((p) => p.id === el.id);
    if (product) {
      if (product.stock >= el.quantity) {
      } else {
        errorMsg.push(
          `No hay stock suficiente del producto ${product.title}, quedan ${product.stock} unidades`
        );
      }
    }
  });

  if (errorMsg.length > 0) {
    res.status(422).json({
      msg: errorMsg.join(' - ')
    });
  } else next();
};
