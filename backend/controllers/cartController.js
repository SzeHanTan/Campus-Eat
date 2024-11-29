import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Validate user ID
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch user data
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update cart data
        let cartData = userData.cartData || {};
        cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Validate user ID
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch user data
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update cart data
        let cartData = userData.cartData || {};
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        // Validate user ID
        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch user data
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};

export { addToCart, removeFromCart, getCart };