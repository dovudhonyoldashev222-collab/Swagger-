const { SeatType } = require("../model/seatTypeSchema");

// --------------------------- create seatType --------------------------------
const createSeatType = async (req, res) => {
    try {
        const { name } = req.body;
        const newType = new SeatType({ name });
        await newType.save();
        res.status(201).json({ 
            success: true, 
            message: "O'rindiq turi yaratildi", 
            seatType: newType 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// --------------------------- get seatTypes --------------------------------
const getSeatTypes = async (req, res) => {
    try {
        const seatTypes = await SeatType.find();
        res.status(200).json({ 
            success: true,
            seatTypes 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// --------------------------- get seatTypeById --------------------------------
const getSeatTypeById = async (req, res) => {
    try {
        const seatType = await SeatType.findById(req.params.id);
        if (!seatType) return res.status(404).json({ 
            success: false, 
            message: "Topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            seatType 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// --------------------------- update seatType --------------------------------
const updateSeatType = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedType = await SeatType.findByIdAndUpdate(req.params.id, 
            { name }, 
            { new: true }
        );
        if (!updatedType) return res.status(404).json({ 
            success: false, 
            message: "Topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            message: "Yangilandi", 
            seatType: updatedType 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// --------------------------- delete seat Type  --------------------------------
const deleteSeatType = async (req, res) => {
    try {
        const deleted = await SeatType.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ 
            success: false, 
            message: "Topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            message: "O'chirilildi" 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

const searchSeatType = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name parametri ko'rsatilmagan"
            });
        }
        const seatTypes = await SeatType.find({ name: { $regex: name, $options: "i" } });
        res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            seatTypes
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
    createSeatType, 
    getSeatTypes, 
    getSeatTypeById, 
    searchSeatType,
    updateSeatType, 
    deleteSeatType 
};