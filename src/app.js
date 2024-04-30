import express from "express";
import ProductManager from "./manager/product.manager.js";

const productManager = new ProductManager('./products.json');
const app = express();

const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);

        if (!product) res.status(400).json({ message: 'Product not found!' });

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = await productManager.addProduct(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})