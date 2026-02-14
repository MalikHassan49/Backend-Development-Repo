import mongoose from "mongoose";

const connectDB = async() => {
  try {
    const dbConnection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)

  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
    
  }

}

export default connectDB;