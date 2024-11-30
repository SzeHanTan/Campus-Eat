import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174"; // Update as per your frontend URL

    try {
        const { userId, items, amount, address, groupSize } = req.body;

        // Validate input
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Calculate group discount
        const discount = calculateGroupDiscount(items, groupSize || 1);
        const discountedAmount = Math.max(0, amount - discount); // Ensure amount is not negative

        // Save new order to the database
        const newOrder = new orderModel({
            userId,
            items,
            amount: discountedAmount,
            address,
            discountApplied: discount > 0,
            discountAmount: discount,
        });
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        // Prepare line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "myr",
                product_data: { 
                    name: item.name 
                },
                unit_amount: Math.round(item.price * 100) // Convert to Stripe format
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "myr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 200, // RM2 delivery fee in cents
            },
            quantity: 1
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            discounts: discount > 0 ? [{ coupon: "GROUPDISCOUNT" }] : [], // Example coupon handling
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        // Send the session URL to the frontend
        res.json({success: true, session_url: session.url});
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ success: false, message: "Server error occurred while placing order" });
    }
};

// Verify order payment status
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed, order deleted" });
        }
    } catch (error) {
        console.error("Error verifying order:", error.message);
        res.status(500).json({ success: false, message: "Server error occurred while verifying order" });
    }
};

// Get user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error.message);
        res.status(500).json({ success: false, message: "Server error occurred while fetching orders" });
    }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error listing orders:", error.message);
        res.status(500).json({ success: false, message: "Server error occurred while listing orders" });
    }
};

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status are required" });
        }

        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.error("Error updating order status:", error.message);
        res.status(500).json({ success: false, message: "Server error occurred while updating order status" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

