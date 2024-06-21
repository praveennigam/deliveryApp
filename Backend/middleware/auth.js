import jwt from "jsonwebtoken";

const authMiddleware = async(req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }

    try {
        // Verify the JWT token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Set the userId in the request body
        req.body.userId = token_decode.id;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Handle the error gracefully
        console.error("Error verifying JWT token:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export default authMiddleware;