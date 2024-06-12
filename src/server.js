import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from "cors";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import userRouter from "./routes/user.router.js";
import "./daos/mongodb/connection.js";
import "dotenv/config"

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.DB_CONNECTION_STRING,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});