import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";  // Database connection configuration
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js"; // Add the payment route

// app config
const app = express();
const port = process.env.PORT || 4000;  // Use environment variable for port

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();  // Connect to the database using your DB connection configuration

// Static folder for images
app.use("/images", express.static('uploads'));  // Serve images from the uploads directory

// api endpoints
app.use("/api/food", foodRouter);  // Food-related API routes
app.use("/api/user", userRouter);  // User-related API routes
app.use("/api/cart", cartRouter);  // Cart-related API routes
app.use("/api/order", orderRouter);  // Order-related API routes
app.use("/api/payment", paymentRouter);  // Payment-related API routes

app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

