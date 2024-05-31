import ProductDaoMongoDB from '../daos/mongodb/products.dao.js';

const productDao = new ProductDaoMongoDB();

export const getByProductId = async (id) => {
    try {
        return await productDao.getProductById(id);
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllProducts = async () => {
    try {
        return await productDao.getAllProducts();
    } catch (error) {
        throw new Error(error);
    }
}

export const createProduct = async (obj) => {
    try {
        return await productDao.createProduct(obj);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateProduct = async (id, obj) => {
    try {
        return await productDao.updateProduct(id, obj);
    } catch (error) {

    }
}

export const removeProduct = async (id) => {
    try {
        return await productDao.removeProduct(id);
    } catch (error) {
        throw new Error(error);
    }
}