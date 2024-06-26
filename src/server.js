import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import userRouter from "./routes/user.router.js";
import "./daos/mongodb/connection.js";

dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: { secret: '1234' },
        ttl: 180,
    }),
    secret: '1234',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 180000,
        // sameSite: 'lax',
        // secure: process.env.NODE_ENV === 'production',
    }
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