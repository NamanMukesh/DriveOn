import Booking from "../Models/Booking.js"
import Car from "../Models/Car.js";

//Function to check Availability of Car for a given Date
const checkAvaibility = async (car, pickupDate, returnDate)=>{
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate}
    })
    return bookings.length === 0;
}

//API to Check Availability of Cars for the given Date and Location
export const  checkAvaibilityofCar = async (req, res)=> {
    try {
        const {location, pickupDate, returnDate} = req.body
        // Fetch all available cars for the given location
        const cars = await Car.find({location, isAvailable: true})

        //Check car availability for the given date range using promise
        const availabileCarPromises = cars.map(async (car)=> {
            const isAvailable = await checkAvaibility(car._id, pickupDate, returnDate)
            return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availabileCarPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true)   

        res.json({success: true, availableCars})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//API to Create Booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    // Validate inputs
    if (!car || !pickupDate || !returnDate) {
      return res.status(400).json({ success: false, message: "Car, pickupDate or returnDate is missing" });
    }

    const isAvailable = await checkAvaibility(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }

    const carData = await Car.findById(car);

    // Convert to Date objects
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    if (isNaN(picked.getTime()) || isNaN(returned.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    // const timeDiff = returned.getTime() - picked.getTime();
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;


    await Booking.create({ car, owner: carData.owner, user: _id, pickupDate: picked, returnDate: returned, price });

    res.json({ success: true, message: "Booking Created" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


//API to list User Bookings
export const getUserBookings = async(req, res)=> {
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})    
    }
}

//API to list Owner Bookings
export const getOwnerBookings = async(req, res)=> {
    try {
        if(req.user.role !== 'owner'){
            return res.json({success: false, message: "Unauthorized" })
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').
        select("-user.password").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})    
    }
}

//API to Change Bookings Status
export const changeBookingStatus = async(req, res)=> {
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success : false, message: "Unauthorized"})
        }
        
        booking.status = status;
        await booking.save();

        res.json({success: true, message: "Status updated", booking});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})    
    }
}