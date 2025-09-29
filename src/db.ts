import mongoose from "mongoose";

export default async function connectDB() {
    const URI = process.env.URI ||'No string ';
    console.log(URI)
    
    await mongoose.connect(URI, {
        dbName: "trullo"
    })
} 