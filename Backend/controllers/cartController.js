import userModel from "../models/userModel.js";

const addToCart = async(req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user by userId
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the cartData or initialize if it doesn't exist
        let cartData = userData.cartData || {};

        // Increment the quantity of the item in the cart
        if (cartData[itemId]) {
            cartData[itemId] += 1; // Item already exists in cart
        } else {
            cartData[itemId] = 1; // Item does not exist in cart, set quantity to 1
        }

        // Update the user's cartData
        userData.cartData = cartData;
        await userData.save();

        console.log("Updated userData:", userData); // Logging for debugging

        res.json({ success: true, message: "Cart data updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const removeFromCart = async(req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user by userId
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the cartData or initialize if it doesn't exist
        let cartData = userData.cartData || {};

        // Decrease the quantity of the item in the cart
        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        } else {
            // Item does not exist in cart or quantity is already 0
            return res.status(400).json({ success: false, message: "Item not found in cart or quantity already 0" });
        }

        // Update the user's cartData
        userData.cartData = cartData;
        await userData.save();

        console.log("Updated userData:", userData); // Logging for debugging

        res.json({ success: true, message: "Item removed from cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getCart = async(req, res) => {
    try {
        const userId = req.body.userId;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData || {}; // Ensure cartData is not null
        res.json({ success: true, cartData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { getCart, removeFromCart, addToCart };