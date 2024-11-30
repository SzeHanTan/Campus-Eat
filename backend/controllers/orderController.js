import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
    },
});
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only JPEG, PNG, and PDF files are allowed"), false);
        }
        cb(null, true);
    },
});

// Helper function to calculate group discount
const calculateGroupDiscount = (items, groupSize) => {
    const DISCOUNT_THRESHOLD = 5; // Minimum group size for a discount
    const DISCOUNT_RATE = 0.1; // 10% discount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (groupSize >= DISCOUNT_THRESHOLD) {
        return totalAmount * DISCOUNT_RATE; // Calculate discount amount
    }
    return 0; // No discount if group size is below the threshold
};

// Existing functions (placeOrder, verifyOrder, etc.) remain unchanged...

// New Endpoint: Upload Receipt
const uploadReceipt = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Update the order in the database with the receipt file path
        await orderModel.findByIdAndUpdate(orderId, { receiptPath: req.file.path });

        res.json({ success: true, message: "Receipt uploaded successfully" });
    } catch (error) {
        console.error("Error uploading receipt:", error);
        res.status(500).json({ success: false, message: "Error uploading receipt" });
    }
};

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,uploadReceipt,upload}
