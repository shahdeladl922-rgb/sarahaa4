import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";




export default async function connectionDB() {
    try {
        await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("connect DB successfully.......😍");

    } catch (error) {
        console.log("DB CONNECTED failed.......😒");

    }
}