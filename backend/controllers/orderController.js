import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    const frontend_url = "http://localhost:5174";

    try {
        // Extract group size and items from the request
        const { userId, items, amount, address, groupSize } = req.body;

        // Calculate group discount
        const discount = calculateGroupDiscount(items, groupSize);
        const discountedAmount = amount - discount;

        // Save new order to the database
        const newOrder = new orderModel({
            userId,
            items,
            amount: discountedAmount, // Save discounted amount
            address,
            discountApplied: discount > 0, // Track if discount was applied
            discountAmount: discount, // Store the discount amount
        });
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare line items for Stripe payment
        const line_items = items.map((item) => ({
            price_data: {
                currency: "myr",
                product_data: { name: item.name },
                unit_amount: item.price*100, // Convert to Stripe's currency format
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "myr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2*100 // Convert to Stripe's currency format
            },
            quantity: 1,
        });

        // Add a discount line item if applicable
        if (discount > 0) {
            line_items.push({
                price_data: {
                    currency: "myr",
                    product_data: { name: "Group Discount" },
                    unit_amount: -discount*100 // Stripe supports negative amounts for discounts
                },
                quantity: 1,
            });
        }

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Send the session URL to the frontend
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Verify order payment status
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            // Update the order status to paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            // Delete the order if payment failed
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Get user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//Listing orders for admin panel
const listOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

//api for updating order status
const updateStatus=async(req,res)=>{
    try {
        const orders = await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
