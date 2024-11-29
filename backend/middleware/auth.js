import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers['token']; 
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Login again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET); 
        req.body.userId = token_decode.id;  
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(403).json({ success: false, message: "Invalid token. Please login again" });
    }
};

export default authMiddleware;
