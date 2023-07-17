import mongoose from 'mongoose'

const DBConnection = async () => {
    const DB_URI = "mongodb+srv://fileshareuser:filesharepass@flie-sharing.hnzq5lv.mongodb.net/"
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true })
        console.log("Database connected successfully");
    } catch (error) {
        console.error('Error while connecting to database ', error.message);
    }
}

export default DBConnection;