const {Booking} = require("../model/bookingSchema")

// -------------------- post Booking -----------------------
const addBooking = async (req, res) => {
    try{
        const {
            cart_id,
            payment_method_id,
            delivery_method_id,
            discount_coupon_id,
            status_id,
        } = req.body

        const newBooking = new Booking({
            cart_id,
            payment_method_id,
            delivery_method_id,
            discount_coupon_id,
            status_id,
        })

        await newBooking.save();
        res.status(201).json({
            success: true,
            message: "Buyurtma muvaffaqiyatli yaratildi",
            booking: newBooking
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    } 
}

// -------------------- get bookings -----------------------
const getBookings = async (req,res) => {
    try{
        const bookings = await Booking.find().populate("cart_id")
        res.status(200).json({
            success: true,
            message: "Barcha buyurtmalar ro'yxati olingan.",
            data: bookings,
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Server xatosi: Buyurtmalarni olishda xato yuz berdi.",
        });
    }
}

//--------------------- getbookingById ----------------------
const getBookingBy = async (req, res) => {
    try {
        const bookingId = req.params.id
        const booking = await Booking.findById(bookingId).populate("cart_id")
        if(!booking) {
            return res.status(404).json({message: "Buyurtma topilmadi"})
        }
        res.status(200).json({message: "buyurtma topildi", booking})
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Internal Server Eror"})
    }
}

// -------------------------Update booking--------------------
const updateBooking = async (req,res) => {
    try{
        const {id} = req.params;
        const {
            cart_id, 
            payment_method_id, 
            delivery_method_id, 
            discount_coupon_id, 
            status_id,
        } = req.body;

        const updateBooking = await Booking.findByIdAndUpdate(
            id,
            {cart_id,payment_method_id, delivery_method_id,discount_coupon_id, status_id},
            {new: true}
        )
        if (!updateBooking) {
            return res.status(404).json({
                success: false,
                message: "buyurtma topilmadi",
            })
        }
        res.json({
            success: true,
            message: "buyurtma muvaffaqiyatli yangilandi",
            user:updateBooking,
        })
    } catch(error){
        res.status(200).status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

// --------------------delete user---------------------
const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id || req.body.id);
        
        if (!deletedBooking) {
            return res.status(404).json({ 
                success: false, 
                message: "Buyurtma topilmadi!" 
            });
        }
        
        return res.status(200).json({ 
            success: true, 
            message: "Buyurtma muvaffaqiyatli o'chirildi!", 
            data: deletedBooking 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {addBooking, getBookings, getBookingBy,updateBooking, deleteBooking}