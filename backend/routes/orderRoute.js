import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, uploadReceipt } from "../controllers/orderController.js"; // Import uploadReceipt controller
import multer from "multer";

const orderRouter = express.Router();

const upload = multer();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get('/list', listOrders);
orderRouter.post("/status", updateStatus);

orderRouter.post("/upload-receipt", upload.single("receipt"), uploadReceipt); // `receipt` is the form field name

export default orderRouter;