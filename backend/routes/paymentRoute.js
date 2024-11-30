// backend/routes/paymentRoute.js
import express from 'express';
import { uploadPaymentScreenshot } from '../controllers/paymentController.js'; // Import the controller function
import upload from '../middleware/uploadmiddleware.js'; // Import the Multer middleware

const router = express.Router();

// POST request to upload payment screenshot
// This will use the 'upload' middleware to handle the file upload
router.post('/upload-screenshot', upload, uploadPaymentScreenshot);

export default router;
