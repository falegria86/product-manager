import { Router } from "express";
import CartManager from "../daos/filesystem/cart.manager.js";

const router = Router();
const cartManager = new CartManager('./carts.json');

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const carts = await cartManager.getCartById(cid);
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.addCart();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/:cid/product/:id', async (req, res) => {
    try {
        const { cid, id } = req.params;
        const cart = await cartManager.addProductCartById(cid, id);
        return res.status(200).json(cart)
        console.log(cid, id)
    } catch (error) {

    }
})

export default router;