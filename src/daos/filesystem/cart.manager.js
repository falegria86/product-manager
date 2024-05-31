import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "./product.manager.js";

const productManager = new ProductManager('./products.json');

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async addCart() {
        try {
            const cart = {
                id: uuidv4(),
                productos: [],
            }

            const carts = await this.#getCarts();
            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            console.log("There was an error adding cart: ", error);
        }
    }

    async #getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsFile = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(cartsFile);

                return carts;
            } else {
                return [];
            }
        } catch (error) {
            console.log("There was an error getting carts: ", error);
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.#getCarts();
            if (!carts || carts.length <= 0) return { error: 'There are no carts' };

            const cart = carts.find(el => el.id === id);

            if (cart) {
                return cart;
            } else {
                return { error: `Card with ID: ${id} not found!` };
            }
        } catch (error) {
            console.log(`Error getting cart with ID: ${id}`);
        }
    }

    async addProductCartById(cartId, productId) {
        try {
            const carts = await this.#getCarts();
            if (!carts || carts.length <= 0) return { error: 'There are no carts' };

            // Buscamos el carrito
            const cart = carts.find(el => el.id === cartId);
            if (!cart) return { error: `Cart with ID ${cartId} not found` };

            // Traemos la lista de productos para checar si el producto existe
            const productList = await productManager.getProducts();
            const productCheck = productList.find(product => product.id === productId);
            if (!productCheck) return { error: 'Product does not exist' };

            const { productos } = cart;
            const producto = productos.find(product => product.productId == productId);
            const filteredProducts = productos.filter(product => product.productId !== productId);

            filteredProducts.push({
                productId,
                quantity: producto ? producto.quantity + 1 : 1
            });

            cart.productos = filteredProducts;
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            console.log(`Error adding product to cart: ${error}`);
        }
    }
}