import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const DBConnection = async () => {
    const DB_URI = process.env.mongoDB_URI;
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true })
        console.log("Database connected successfully");
    } catch (error) {
        console.error('Error while connecting to database ', error.message);
    }
}

export default DBConnection;