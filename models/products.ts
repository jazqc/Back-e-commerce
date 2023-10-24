import { Schema, Types, model, Model } from 'mongoose';

export interface IProduct {
    id: Number;
    title: String;
    desc: String;
    img: String;
    price: Number;
    stock: Number;
}

const ProductSchema = new Schema<IProduct> ({
    id: {
        type: Number,
        required: [true, "El id es obligatorio"],
        unique: true
    },
    title: {
        type: String,
        required: [true, "El título es obligatorio"]
    },
        desc: {
            type: String,
            required: [true, "La descripción es obligatoria"]
        },
        img: {
            type: String,
            required: false,
        },

        price: {
            type: String,
            required: [true, "El precio es obligatorio"]
        },
        stock: {
            type: Number,
            required: [true, "El stock es obligatorio"]
        }

    })

    const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema); 

export default Product