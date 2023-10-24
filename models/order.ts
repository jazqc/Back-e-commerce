import { Schema, Types, model, Model } from 'mongoose';

interface IItem {
    id: Number;
    title: String;
    desc: String;
    img: String;
    price: Number;
    quantity: Number;
}
interface IShippingDetails {
    name: String;
    cellphone: Number,
    location: String;
    adress: String;

}

export interface IOrder {
    createdAt: Date;
    user: Types.ObjectId;
    totalPrice: Number;
    shippingCost: Number;
    items: IItem[];
    shippingDetails: IShippingDetails[];
    status: String;
    totalCost: Number;
}

const OrderSchema = new Schema<IOrder> ({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    items: {
        type: [{
            id: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            desc: {
                type: String,
                required: true,
            },
            img: {
                type: String,
                required: false,
            },
            price: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },

        }],
        required: true,

    },

    shippingDetails: {
        name: {
            type: String,
            required: true
        },
        cellphone: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        },
    },
    status: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },

    
})

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema); 

export default Order