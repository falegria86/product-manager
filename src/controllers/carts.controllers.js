import * as services from "../services/carts.services.js";

export const getAllCtr = async (req, res, next) => {
    try {
        const carts = await services.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
}

export const getByIdCtr = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await services.getByCartId(cid);

        if (!cart) {
            res.status(400).json({ message: 'Cart not found' })
        } else {
            res.status(200).json(cart);
        }
    } catch (error) {
        next(error);
    }
}

export const createCtr = async (req, res, next) => {
    try {
        const newCart = await services.createCart();
        if (!newCart) {
            res.status(400).json({ message: 'Error creating cart' });
        } else {
            res.status(200).json(newCart);
        }
    } catch (error) {
        next(error);
    }
}

export const updateCtr = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const updatedCart = await services.updateCart(cid, req.body);

        if (!updatedCart) {
            res.status(400).json({ message: 'Error updating cart' });
        } else {
            res.status(200).json(updatedCart);
        }
    } catch (error) {
        next(error);
    }
}

export const removeCtrl = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const deletedCart = await services.removeCart(cid);

        if (!deletedCart) {
            res.status(400).json({ message: 'Error deleting cart' });
        } else {
            res.status(200).json(deletedCart);
        }
        res.status(200).json({ message: `Cart with id ${cid} removed successfully` });
    } catch (error) {
        next(error);
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;

        const newProductToUserCart = await services.addProductToCart(
            idCart,
            idProd,
        );

        if (!newProductToUserCart) res.json({ msg: "Either product or cart doesn't exist" });
        else res.json(newProductToUserCart);
    } catch (error) {
        next(error);
    }
};

export const removeProductFromCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;

        const delProdToUserCart = await services.removeProductFromCart(
            idCart,
            idProd,
        );

        if (!delProdToUserCart) res.json({ msg: "Either product or cart doesn't exist" });
        else res.json({ msg: `Product ${idProd} deleted from cart ${idCart}` });
    } catch (error) {
        next(error);
    }
};

export const updateProductQuantityToCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const { idProd } = req.params;
        const { quantity } = req.body;

        const updatedProductQuantity = await services.updateProductQuantityToCart(
            idCart,
            idProd,
            quantity
        );

        if (!updatedProductQuantity) res.json({ msg: "Error updating product quantity" });
        else res.json(updatedProductQuantity);
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const clearCart = await services.clearCart(
            idCart,
        );

        if (!clearCart) res.json({ msg: "Error clearing cart" });
        else res.json(clearCart);
    } catch (error) {
        next(error);
    }
};