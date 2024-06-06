import ProductDaoMongoDB from '../daos/mongodb/products.dao.js';

const productDao = new ProductDaoMongoDB();

export const getByProductId = async (id) => {
    try {
        const product = await productDao.getProductById(id);
        if (!product) return false;
        else return product;
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllProducts = async (page, limit, category, sort, status) => {
    try {
        return await productDao.getAllProducts(page, limit, category, sort, status);
    } catch (error) {
        throw new Error(error);
    }
}

export const createProduct = async (obj) => {
    try {
        const newProduct = await productDao.createProduct(obj);
        if (!newProduct) return false;
        else return newProduct;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (id, obj) => {
    try {
        const updatedProduct = await productDao.updateProduct(id, obj);
        if (!updateProduct) return false;
        else return updatedProduct;
    } catch (error) {
        throw new Error(error);
    }
}

export const removeProduct = async (id) => {
    try {
        const deletedProduct = await productDao.removeProduct(id);
        if (!deletedProduct) return false;
        else return deletedProduct;
    } catch (error) {
        throw new Error(error);
    }
}