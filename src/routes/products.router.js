import { Router } from "express";
import ProductManager from "../manager/product.manager.js";
import { productValidator } from "../middlewares/product.validator.js";

const router = Router();
const productManager = new ProductManager('./products.json');

router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);

        if (!product) res.status(400).json({ message: 'Product not found!' });

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', productValidator, async (req, res) => {
    try {
        const product = await productManager.addProduct(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.updateProduct(pid, req.body);

        if (!product) res.status(400).json({ message: 'Product not found!' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.deleteProduct(pid);

        if (!product) res.status(400).json({ message: 'Product not found!' });
        res.status(200).json(product);
    } catch (error) {

    }
})

export default router;