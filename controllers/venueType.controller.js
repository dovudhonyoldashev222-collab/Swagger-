const { VenueType } = require("../model/venueTypeSchema");

// -------------------- create venueType--------------------------
const createVenueType = async (req, res) => {
    try {
        const { name } = req.body; 

        const newType = new VenueType({ name });
        await newType.save();

        res.status(201).json({
            success: true,
            message: "Joy turi muvaffaqiyatli yaratildi",
            venueType: newType
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ------------------ get venueTypes ---------------
const getVenueTypes = async (req, res) => {
    try {
        const venueTypes = await VenueType.find();
        res.status(200).json({
            success: true,
            venueTypes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// --------------------- getByid------------------------
const getVenueTypeBy = async (req, res) => {
    try {
        const venueType = await VenueType.findById(req.params.id);
        if (!venueType) {
            return res.status(404).json({
                success: false,
                message: "Joy turi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            venueType
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ------------------------ update ------------------------
const updateVenueType = async (req, res) => {
    try {
        const { name } = req.body; 

        const updatedType = await VenueType.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );

        if (!updatedType) {
            return res.status(404).json({
                success: false,
                message: "Joy turi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            message: "Joy turi muvaffaqiyatli yangilandi",
            venueType: updatedType
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ------------------------ search ------------------------
const searchVenueType = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Qidiruv uchun name parametri ko'rsatilishi shart"
            });
        }

        const result = await VenueType.find({
            name: { $regex: name, $options: "i" }
        });

        if (result.length === 0) {
            return res.json({
                success: true,
                message: "Mos keluvchi joy turlari topilmadi",
                venueTypes: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            venueTypes: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// Delete
const deleteVenueType = async (req, res) => {
    try {
        const deletedType = await VenueType.findByIdAndDelete(req.params.id);
        if (!deletedType) {
            return res.status(404).json({
                success: false,
                message: "Joy turi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            message: "Joy turi o'chirildi"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

module.exports = { createVenueType, getVenueTypes, getVenueTypeBy, searchVenueType, updateVenueType, deleteVenueType };