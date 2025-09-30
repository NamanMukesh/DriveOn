import { response } from "express";
import User from "../Models/User.js";


//API to Change Role of User
export const changeRoleToOwner = async (req, res)=> {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "Owner"})
        res.json({sucess: true, message: "Now you can list cars"})
    } catch (error) {
        console.log(error.message);
        res.json({sucess: false, message: error.message})
    }
}

//API to List Car
export const addCar = async(req, res)=> {
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;
        
    } catch (error) {
        console.log(error.message);
        res.json({sucess: false, message: error.message})
    }
}