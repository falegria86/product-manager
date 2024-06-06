import ProductDaoMongoDB from '../daos/mongodb/products.dao.js';
import CartDaoMongoDB from '../daos/mongodb/carts.dao.js';

const cartDao = new CartDaoMongoDB();
const productDao = new ProductDaoMongoDB();

export const getByCartId = async (id) => {
    try {
        const cart = await cartDao.getCartById(id);
        if (!cart) return false;
        else return cart;
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllCarts = async () => {
    try {
        return await cartDao.getAllCarts();
    } catch (error) {
        console.log(error);
    }
}

export const createCart = async () => {
    try {
        const newCart = await cartDao.createCart();
        if (!newCart) return false;
        else return newCart;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateCart = async (id, obj) => {
    try {
        const updatedCart = await cartDao.updateCart(id, obj);
        if (!updatedCart) return false;
        else return updatedCart;
    } catch (error) {
        throw new Error(error);
    }
}

export const removeCart = async (id) => {
    try {
        const deletedCart = await cartDao.removeCart(id);
        if (!deletedCart) return false;
        else return deletedCart;
    } catch (error) {
        throw new Error(error);
    }
}

export const addProductToCart = async (cartId, prodId) => {
    try {
        const cartExists = await getByCartId(cartId);
        const productExists = await productDao.getProductById(prodId);
        if (!cartExists || !productExists) return null;

        const productExistsInCart = await cartDao.productExistsInCart(cartId, prodId);

        if (productExistsInCart) {
            const quantity = productExistsInCart.products.find(p => p.product.toString() === prodId).quantity + 1;
            return await cartDao.addProdToCart(cartId, prodId, quantity);
        }

        return await cartDao.addProdToCart(cartId, prodId);
    } catch (error) {
        throw new Error(error);
    }
}

export const removeProductFromCart = async (idCart, idProduct) => {
    try {
        const cartExists = await getByCartId(idCart);
        const productExists = cartExists.products.find(product => product.product._id.toString() === idProduct);

        if (!cartExists || !productExists) return null;

        return await cartDao.removeProductFromCart(idCart, idProduct);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateProductQuantityToCart = async (cartId, prodId, quantity) => {
    try {
        const cartExists = await getByCartId(cartId);
        const productExists = cartExists.products.find(p => p.product._id.toString() === prodId);

        if (!cartExists || !productExists) return null;

        return await cartDao.updateProductQuantityToCart(cartId, prodId, quantity)
    } catch (error) {
        throw new Error(error);
    }
};

export const clearCart = async (cartId) => {
    try {
        const existCart = await getByCartId(cartId);
        if (!existCart) return null;
        return cartDao.clearCart(cartId);
    } catch (error) {
        throw new Error(error);
    }
};
