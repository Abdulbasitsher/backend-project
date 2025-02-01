import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const DBconnect = async () => {
    try {
        const dbconnection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("Database connected successfully", dbconnection.connection.host);
    } catch (error) {
        console.error("Error on connecting to the database: ", error);
    }
}

export default DBconnect;