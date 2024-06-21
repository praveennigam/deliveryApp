import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator'; // Import validator module for email validation

// Login user
const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }
        const token = createToken(user._id);
        res.json({ success: true, token, user: { name: user.name, email: user.email, _id: user._id } });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Register user
const registerUser = async(req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if user is already registered
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email' });
        }
        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({ name, password: hashedPassword, email });
        const user = await newUser.save();

        // Create a token for the new user
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

export { loginUser, registerUser };