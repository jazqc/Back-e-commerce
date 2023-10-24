import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Favs, { IFavs } from "../models/favs";
import Product, { IProduct } from "../models/products";

//Traer los productos favoritos de un usuario
export const getFavs = async (req: Request, res: Response) => {
  const userId: ObjectId = req.body.userConfirmed._id;
  const user = { user: userId };
try {
const favsProducts: IFavs | null = await Favs.findOne(user);
const productsInDB = await Product.find()
let favsByUser: IProduct[] = []
if (favsProducts) {
favsProducts.products.forEach( (el) => {
   const foundproduct = productsInDB.find((product) => product.id === el);
   if (foundproduct) {
    favsByUser.push(foundproduct)
   }

})
}
  res.status(200).json({
    data: favsByUser,
  });
}
 catch(error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};


//Agregar productos favoritos a un usuario
export const addFavs = async (req: Request, res: Response) => {
  const userId: ObjectId = req.body.userConfirmed._id;
  const favData = req.body;
  const pr = req.body.products;

  try {
    const existingUserFavs = await Favs.findOne({ user: userId }); //chequeo si el usuario ya tiene favoritos

    if (existingUserFavs) {
      //chequeo si ya lo tiene entre sus favs.
      if (existingUserFavs.products.includes(pr)) {
        res.status(200).json({
          msg: "el producto ya se encuentra en sus favoritos",
        });
      } else {
        existingUserFavs.products.push(pr);
        existingUserFavs.save();

        res.status(200).json({
          msg: "producto agregado a sus favoritos",
        });
      }
    } else {
      //si el usuario aún no tiene, lo guardo en la DB
      const newFavsData: IFavs = {
        ...favData,
        user: userId,
        products: [pr],
      };
      const favs = new Favs(newFavsData);
      await favs.save();
      res.status(201).json({
        msg: "producto agregado a sus favoritos",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
}
