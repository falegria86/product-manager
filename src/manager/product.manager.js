import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // Función para obtener el ID más alto
    async #getMaxId() {
        try {
            const products = await this.getProducts();
            if (products.length > 0) {
                const maxId = Math.max(...products.map(product => product.id));
                return maxId + 1;
            } else {
                return 1; // Si no hay productos, asignamos el 1 como el primer ID
            }
        } catch (error) {
            console.log('Error getting Max ID: ', error);
        }
    }

    async addProduct(productObj) {
        const { title, description, price, thumbnail, code, stock } = productObj;

        // Validamos que vengan todos los campos requeridos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return 'All fields must be provided!';
        }

        // Validamos que el precio sea un número
        if (isNaN(Number(price))) {
            return 'Price must be a number!';
        }

        // Validamos que el stock sea un número
        if (isNaN(Number(stock))) {
            return 'Stock must be a number!';
        }

        try {
            const maxId = await this.#getMaxId();
            console.log("MaxID: ", maxId)
            const product = {
                id: maxId,
                ...productObj,
            };

            const products = await this.getProducts();

            // Checamos si el código ya existe y tiramos error si es asi
            const codeExists = products.find(el => el.code === product.code);

            if (codeExists) return 'Product with that code already exists!';

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log('There was an error when adding product: ', error);
        }
    }

    async getProducts(limit) {
        try {
            if (fs.existsSync(this.path)) {
                const productsFile = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(productsFile);

                const productsLimit = products.slice(0, limit);
                return productsLimit;
            } else {
                return [];
            }
        } catch (error) {
            console.log('There was an error getting products: ', error);
        }
    }

    async getProductById(id) {
        try {
            const idNumber = +id; // Convertimos id a número
            const products = await this.getProducts();
            const product = products.find(product => product.id === idNumber);

            if (product) {
                return product;
            } else {
                return { error: `Product with ID ${id} doesn't exist!`};
            }
        } catch (error) {
            console.log(`Error getting product with ID: ${id} ${error}`)
        }
    }

    // async updateProduct(id, update) {
    //     // Validación para rechazar si se quiere actualizar el ID
    //     if (update.id) {
    //         console.log("ID cannot be updated!");
    //         return false;
    //     }

    //     try {
    //         if (fs.existsSync(this.path)) {
    //             const products = await this.getProducts();
    //             const productToUpdate = products.find(product => product.id === id);
    //             const newProducts = products.filter(product => product.id !== id);
    //             const updatedProduct = {
    //                 ...productToUpdate,
    //                 ...update,
    //             }

    //             newProducts.push(updatedProduct);
    //             await fs.promises.writeFile(this.path, JSON.stringify(newProducts));

    //             return updatedProduct;
    //         }
    //     } catch (error) {
    //         console.error('Error when updating product: ', error);
    //     }
    // }

    // async deleteProduct(id) {
    //     try {
    //         if (fs.existsSync(this.path)) {

    //             const products = await this.getProducts();
    //             const deletedProduct = products.find(product => product.id === id);

    //             if (!deletedProduct) {
    //                 return `Product with ID ${id} wasn't found`;
    //             }
    //             const newProducts = products.filter(product => product.id !== id);

    //             await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
    //             return deletedProduct;
    //         } else {
    //             return `There's no products yet!`
    //         }
    //     } catch (error) {
    //         console.log(`Error when trying to delete product with ID: ${id} ${error}`);
    //     }
    // }
}