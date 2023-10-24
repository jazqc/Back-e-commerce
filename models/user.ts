import { Schema, model, Model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
    name: string;
    email: string;
    password: string;
    rol?: string;
    code?: string;
    verified?: boolean;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"]
    },
    rol: {
        type: String,
        default: ROLES.user
    },
    code: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, code, ...user} = this.toObject();
    return user
}

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User
