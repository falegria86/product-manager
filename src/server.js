import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import "./daos/mongodb/connection.js";
import "dotenv/config"

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});