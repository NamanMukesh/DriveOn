import User from "../Models/User.js"
import bcrypt from 'bcrypt'
import JWT from "jsonwebtoken";

//Generate JWT Token

const generateToken = (userID)=> {
    const payload = userID;
    return JWT.sign(payload, process.env.JWT_SECRET)
}

export const registerUser = async(req, res)=> {
    try{
        const {name, email, password} = req.body

        if(!name || !email || !password || password.length < 8){
            return res.json({sucess: false, message: 'Fill all the fields'})
        }

        const userExists = await User.findOne({email})

        if(userExists){
            return res.json({sucess: false, message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password: hashedPassword})
        const token = generateToken(user._id.toString())
        res.json({sucess: true, token})

    }catch (error)  {
        console.log(error.message);
        res.json({sucess: false, message: error.message})
    }
}

// User Login
export const loginUser = async (req, res)=> {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({sucess: false, message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({sucess: false, message: "Invalid Credentials"})
        }
        const token = generateToken(user._id.toString())
        res.json({sucess: true, token})
    }catch (error){
        console.log(error.message);
        res.json({sucess: false, message: error.message})
    }
}

//Get User data using Token (JWT)
export const getUserData = async (req, res)=> {
    try {
        const {user} = req;
        res.json({sucess: true, user})
    } catch (error) {
        console.log(error.message);
        res.json({sucess: false, message: error.message})
    }
}