import dotenv from "dotenv";
import { connect } from "mongoose";
dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;

try {
    await connect(connectionString);
    console.log('Conectado a la db');
} catch (error) {
    console.log(error)
}