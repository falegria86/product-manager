import { CartModel } from "./models/cart.model.js";

export default class CartManager {
    async createCart() {
        try {
            return await CartModel.create({
                products: [],
            });
        } catch (error) {
            console.log("There was an error creating cart: ", error);
        }
    }

    async getAllCarts() {
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log("There was an error getting carts: ", error);
        }
    }

    async getCartById(id) {
        try {
            return await CartModel.findById(id).populate("products.product");
        } catch (error) {
            console.log(error);
        }
    }

    async removeCart(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async addProdToCart(cartId, prodId, quantity = 1) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) return null;

            const productIndex = cart.products.findIndex(product => product.product.toString() === prodId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.push({ product: prodId, quantity });
            }

            await cart.save();

            return cart;
        } catch (error) {
            console.log(error);
        }
    }


    async productExistsInCart(cartId, prodId) {
        try {
            return await CartModel.findOne({
                _id: cartId,
                products: { $elemMatch: { product: prodId } }
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeProdFromCart(cartId, prodId) {
        try {
            return await CartModel.findOneAndUpdate(
                { _id: cartId },
                { $pull: { products: { product: prodId } } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateCart(id, obj) {
        try {
            const cart = await CartModel.findByIdAndUpdate(id, obj, {
                new: true,
            });

            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductQuantityToCart(cartId, prodId, quantity) {
        try {
            return await CartModel.findOneAndUpdate(
                { _id: cartId, 'products.product': prodId },
                { $set: { 'products.$.quantity': quantity } },
                { new: true }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async clearCart(cartId) {
        try {
            return await CartModel.findByIdAndUpdate(
                cartId,
                { $set: { products: [] } },
                { new: true }
            );
        } catch (error) {
            console.log(error);
        }
    }
}