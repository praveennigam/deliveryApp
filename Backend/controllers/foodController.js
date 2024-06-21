import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Controller function to add a food item
const addFood = async(req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image_filename = req.file.filename;

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Controller function to list all food items
const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find();
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error listing food:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Controller function to remove a food item
const removeFood = async(req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image file:", err);
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { addFood, listFood, removeFood };