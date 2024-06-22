import { ProductModel } from "./models/product.model.js";

export default class ProductManager {
    async getAllProducts(page = 1, limit = 1000, category, sort, status) {
        try {
            const filter = {};

            if (category) {
                filter.category = category;
            }

            if (status) {
                filter.status = status;
            }

            const sortOrder = {};

            if (sort) {
                if (sort === 'asc') {
                    sortOrder.price = 1;
                } else if (sort === 'desc') {
                    sortOrder.price = -1;
                }
            }

            return await ProductModel.paginate(filter, { page, limit, sort: sortOrder });
        } catch (error) {
            console.error('There was an error getting products: ', error);
            throw error;
        }
    }


    async getProductById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async createProduct(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, obj) {
        try {
            return await ProductModel.findByIdAndUpdate(id, obj, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeProduct(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}