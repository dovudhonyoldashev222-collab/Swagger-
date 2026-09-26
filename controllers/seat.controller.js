const { Seat } = require("../model/seatSchema");

// -------------------------- create seat --------------------------------
const createSeat = async (req, res) => {
    try {
        const { 
            sector, 
            row_number,
            number, 
            venue_id, 
            seat_type_id, 
            location_in_schema 
        } = req.body;
        const newSeat = new Seat({ 
            sector, 
            row_number, 
            number, 
            venue_id, 
            seat_type_id, 
            location_in_schema 
        });
        await newSeat.save();
        res.status(201).json({ 
            success: true, 
            message: "O'rindiq muvaffaqiyatli saqlandi", 
            seat: newSeat 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// -------------------------- get seats ----------------------------
const getSeats = async (req, res) => {
    try {
        const seats = await Seat.find()
        .populate("venue_id").populate("seat_type_id");
        res.status(200).json({ success: true, seats });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// -------------------------- gte seat by id ----------------------------
const getSeatBy = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id)
        .populate("venue_id").populate("seat_type_id");
        if (!seat) return res.status(404).json({ 
            success: false, 
            message: "O'rindiq topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            seat 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// -------------------------- update seat ----------------------------
const updateSeat = async (req, res) => {
    try {
        const { 
            sector, 
            row_number, 
            number, 
            venue_id, 
            seat_type_id, 
            location_in_schema 
        } = req.body;
        const updatedSeat = await Seat.findByIdAndUpdate(
            req.params.id,
            { sector, 
                row_number, 
                number, 
                venue_id, 
                seat_type_id, 
                location_in_schema 
            },
            { new: true }
        );
        if (!updatedSeat) return res.status(404).json({ 
            success: false, 
            message: "O'rindiq topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            message: "O'rindiq yangilandi", 
            seat: updatedSeat 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// -------------------------- delete seat ----------------------------
const deleteSeat = async (req, res) => {
    try {
        const deletedSeat = await Seat.findByIdAndDelete(req.params.id);
        if (!deletedSeat) return res.status(404).json({ 
            success: false, 
            message: "O'rindiq topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            message: "O'rindiq o'chirildi",
            deleted: deletedSeat 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

module.exports = { 
    createSeat, 
    getSeats, 
    getSeatBy, 
    updateSeat, 
    deleteSeat 
};