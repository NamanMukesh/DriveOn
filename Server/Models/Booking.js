import mongoose from "mongoose";
const {ObjectID} = mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({
    car: {type: ObjectID, ref: "Car", required: true},
    user: {type: ObjectID, ref: "User", required: true},
    owner: {type: ObjectID, ref: "User", required: true},
    pickupDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    status: {type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending"},
    price: {type: Number, required: true}

}, {timestamps: true})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking