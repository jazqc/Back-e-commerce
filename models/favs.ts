import { Schema, Types, model, Model} from 'mongoose';


export interface IFavs {
    user: Types.ObjectId;
    products: Number[]
}

const FavsSchema = new Schema<IFavs> ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: Number,
        required: true
    }]
})

const Favs: Model<IFavs> = model<IFavs>("Favs", FavsSchema); 

export default Favs