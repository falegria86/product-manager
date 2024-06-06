import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

const connectionString = process.env.DB_CONNECTION_STRING;

const connectToDatabase = async () => {
    try {
        await connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

connectToDatabase();
