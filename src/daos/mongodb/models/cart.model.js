import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            _id: false,
            quantity: {
                type: Number,
                default: 1,
                min: [1, 'Quantity must be at least 1']
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: [true, 'Product ID is required']
            }
        }
    ]
});

export const CartModel = model('carts', cartSchema);