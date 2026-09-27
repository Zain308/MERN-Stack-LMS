import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./utils/db";
import express from "express"; 

require("dotenv").config();

// Body parser middleware to handle JSON payloads (like base64 images)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

// create our server 
app.listen(process.env.PORT, () => {
    console.log(`Server is connected with the port ${process.env.PORT}`);
    connectDB();
});