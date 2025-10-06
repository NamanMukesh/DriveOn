import express from "express";
import { changeBookingStatus, checkAvaibilityofCar, createBooking, getOwnerBookings, getUserBookings } from "../Controllers/bookingController.js";
import { protect } from "../Middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvaibilityofCar)
bookingRouter.post('/create', protect, createBooking)
bookingRouter.get('/user', protect, getUserBookings)
bookingRouter.get('/owner', protect, getOwnerBookings)
bookingRouter.post('/change-status', protect, changeBookingStatus)


export default bookingRouter