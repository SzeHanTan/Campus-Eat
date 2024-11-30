import express from "express";
import { handlePaymentScreenshot } from "../controllers/paymentController.js";
import multer from "multer";

// Set up multer for handling image uploads
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Route to handle the payment screenshot upload
router.post("/upload-screenshot", upload.single('paymentImage'), handlePaymentScreenshot);

export default router;
