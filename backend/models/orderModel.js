import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false },
    receipt: { type: String, default: null }, // URL/path of the uploaded receipt
    discountApplied: { type: Boolean, default: false }, // Whether a discount was applied
    discountAmount: { type: Number, default: 0 }, // Discount amount applied
    paymentQR: { type: String, default: null }, // URL for the payment QR code
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;