// backend/controllers/paymentController.js
import path from 'path';

// Handle the file upload after the middleware processes it
export const uploadPaymentScreenshot = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Extract file details
    const filePath = req.file.path; // Path where the file is stored
    const fileName = req.file.filename; // The file name assigned by multer

    // Optional: Process the file further (e.g., store metadata in DB, etc.)

    return res.json({
        success: true,
        message: "Payment screenshot uploaded successfully",
        filePath: filePath, // You can return the file path to the frontend if needed
    });
};
