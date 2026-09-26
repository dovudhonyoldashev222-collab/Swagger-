const { Venue } = require("../model/venueSchema");

// ---------------------- create venue ------------------
const createVenue = async (req, res) => {
    try {
        const {
            name,
            address,
            location,
            site,
            phone,
            venue_type_id,
            schema,
            region_id,
            district_id
        } = req.body;

        const existingVenue = await Venue.findOne({phone})
        console.log(existingVenue);
        
        if(existingVenue){
            return res.status(400).json({
                success: false,
                message: "Bu raqam bilan ro'yxatdan o'tgan O'kazilish mavjud"
            })
        }else{

            
            const newVenue = new Venue({
               name,
               address,
               location,
               site,
               phone,
               venue_type_id,
               schema,
               region_id,
               district_id
            });
        
            await newVenue.save();
            res.status(201).json({
                success: true,
                message: "O'tkazilish joyi muvaffaqiyatli yaratildi",
                venue: newVenue
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ----------------------- get venues -----------------------
const getVenues = async (req, res) => {
    try {
        const venues = await Venue.find().populate("venue_type_id");
        res.status(200).json({
            success: true,
            venues
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ------------------- get venue by id ------------------------
const getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id).populate("venue_type_id");
        if (!venue) {
            return res.status(404).json({
                success: false,
                message: "O'tkazilish joyi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            venue
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ---------------------- update venue -----------------------
const updateVenue = async (req, res) => {
    try {
        const {
            name,
            address,
            location,
            site,
            phone,
            venue_type_id,
            schema,
            region_id,
            district_id
        } = req.body;

        const updatedVenue = await Venue.findByIdAndUpdate(
            req.params.id,
            {
                name,
                address,
                location,
                site,
                phone,
                venue_type_id,
                schema,
                region_id,
                district_id
            },
            { new: true }
        );

        if (!updatedVenue) {
            return res.status(404).json({
                success: false,
                message: "O'tkazilish joyi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            message: "O'tkazilish joyi muvaffaqqiyatli yangilandi",
            venue: updatedVenue
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ------------------------- delete venue -------------------------
const deleteVenue = async (req, res) => {
    try {
        const deletedVenue = await Venue.findByIdAndDelete(req.params.id);
        if (!deletedVenue) {
            return res.status(404).json({
                success: false,
                message: "O'tkazlish joyi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            message: "O'tkazilish joyi o'chirildi"
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
    createVenue, 
    getVenues, 
    getVenueById, 
    updateVenue, 
    deleteVenue 
};