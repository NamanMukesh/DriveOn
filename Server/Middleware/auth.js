import JWT from "jsonwebtoken";
import User from "../Models/User.js";

export const protect = async(req, res, next)=> {
    const token = req.headers.authorization;
    if(!token){
        return res.json({sucess: false, message: "Not Authorized"})
    }
    try {
        const userId = JWT.decode(token, process.env.JWT_SECRET)
        if(!userId){
            return res.json({sucess: false, message: "Not Authorized"})
        }
        req.user = await User.findById(userId).select("-password")
        next();
    } catch (error) {
        return res.json({sucess: false, message: "Not Authorized"})
    }
}