import * as services from '../services/products.services.js';

export const getAllCtr = async (req, res, next) => {
    try {
        const { page, limit, category, sort, status } = req.query;
        const products = await services.getAllProducts(page, limit, category, sort, status);
        const next = products.hasNextPage ? `http://localhost:8080/products?page=${products.nextPage}` : null;
        const prev = products.hasPrevPage ? `http://localhost:8080/products?page=${products.prevPage}` : null;

        res.status(200).json({
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasNextPage: products.hasNextPage,
            hasPrevPage: products.hasPrevPage,
            prevLink: prev,
            nextLink: next,
        });
    } catch (error) {
        next(error);
    }
}

export const getByIdCtr = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await services.getByProductId(pid);

        if (!product) res.status(400).json({ message: 'Product not found!' });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

export const createCtr = async (req, res, next) => {
    try {
        const product = { ...req.body };
        const newProduct = await services.createProduct(product);
        if (!newProduct) res.status(404).json({ message: "Error creating product" });
        else res.status(200).json(newProduct);
    } catch (error) {
        next(error);
    }
}

export const updateCtr = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await services.updateProduct(pid, req.body);
        if (!updatedProduct) res.status(404).json({ message: "Error updating product" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

export const removeCtrl = async (req, res, next) => {
    try {
        const { pid } = req.params;
        await services.removeProduct(pid);
        res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        next(error);
    }
}