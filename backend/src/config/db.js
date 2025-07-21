import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
       await mongoose.connect("mongodb+srv://amithp460:9MEqJdDL58pWMzol@cluster0.tyfmk5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
         console.log("MongoDB connected successfully");
    }catch(error){
        console.error("MongoDB connection failed:", error.message);
    }
}