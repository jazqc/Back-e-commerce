
import {Request, Response} from "express";
import { ObjectId } from "mongoose";
import Order, { IOrder } from "../models/order"


export const getOrders = async (req: Request, res: Response) => {
    const userId: ObjectId = req.body.userConfirmed._id;
    const consulta = { user: userId };

    const orders = await Order.find(consulta)

    res.status(200).json ({
        data: [
            ...orders
        ]

    })

}

export const createOrders = async (req: Request, res: Response) => {
    const userId: ObjectId = req.body.userConfirmed._id;
    const orderData: IOrder = req.body

    const data = {
        ...orderData,
        user: userId,
        createdAT: new Date(),
        status: "pending"
    }

    const order = new Order(data)
    await order.save()
    res.status(201).json({
        msg: "orden creada con exito"
    })
}