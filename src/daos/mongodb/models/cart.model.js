import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
            default: []
        }
    ]
});

CartSchema.pre('find', function () {
    this.populate('proucts')
});

export const CartModel = model('carts', CartSchema);