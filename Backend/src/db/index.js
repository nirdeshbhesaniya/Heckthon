import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
try {
   const connectionInstance =  mongoose.connect(`${process.env.MONGODB_URI}_${DB_NAME}`)
   console.log(`MongoDB Connected !!`);
   
} catch (error) {
    console.log("Mongoose connection error:", error);
    process.exit(1);
}
}

export default connectDB;