import { ProductModel } from "./models/product.model.js";

export default class ProductManager {
    async getAllProducts() {
        try {
            const response = await ProductModel.find({});
            return response;
        } catch (error) {
            console.log('There was an error getting products: ', error);
        }
    }

    async getProductById(id) {
        try {
            return ProductModel.findById(id);
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
            return ProductModel.findByIdAndUpdate(id, obj, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeProduct(id) {
        try {
            return ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}