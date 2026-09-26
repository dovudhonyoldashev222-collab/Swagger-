const { VenuePhoto } = require("../model/venuePhotoSchema");

// --------------------- create veuePhoto -----------------------
const createVenuePhoto = async (req, res) => {
    try {
        const { venue_id, url } = req.body;

        const newPhoto = new VenuePhoto({ venue_id, url });
        await newPhoto.save();

        res.status(201).json({
            success: true,
            message: "Joy rasmi muvaffaqiyatli qo'shildi",
            venuePhoto: newPhoto
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ------------------------ get venuephotos -------------------------
const getVenuePhotos = async (req, res) => {
    try {
        const venuePhotos = await VenuePhoto.find().populate("venue_id");
        res.status(200).json({
            success: true,
            message: "Barcha ma'lumotlar olingan",
            venuePhotos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ---------------------------- getById --------------------------
const getVenuePhotoBy = async (req, res) => {
    try {
        const venuePhotoId = req.params.id
        const venuePhoto = await VenuePhoto.findById(venuePhotoId).populate("venue_id");
        if (!venuePhoto) {
            return res.status(404).json({
                success: false,
                message: "Joy rasmi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            venuePhoto
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ----------------------------- update venuePhoto -----------------------
const updateVenuePhoto = async (req, res) => {
    try {
        const { venue_id, url } = req.body; 

        const updatedPhoto = await VenuePhoto.findByIdAndUpdate(
            req.params.id,
            { venue_id, url },
            { new: true }
        );

        if (!updatedPhoto) {
            return res.status(404).json({
                success: false,
                message: "Joy rasmi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            message: "Joy rasmi muvaffaqiyatli yangilandi",
            venuePhoto: updatedPhoto
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ----------------------------------- delete venuPhoto----------------------------------
const deleteVenuePhoto = async (req, res) => {
    try {
        const deletedPhoto = await VenuePhoto.findByIdAndDelete(req.params.id || req.body.id);
        if (!deletedPhoto) {
            return res.status(404).json({
                success: false,
                message: "Joy rasmi topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            message: "Joy rasmi muvaffaqiyatli o'chirildi",
            deleted: deletedPhoto
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

const searchVenuePhoto = async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) {
            return res.status(400).json({
                success: false,
                message: "venueId parametri ko'rsatilmagan"
            });
        }
        const venuePhotos = await VenuePhoto.find({ venue_id: venueId }).populate("venue_id");
        res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            venuePhotos
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
    createVenuePhoto, 
    getVenuePhotos, 
    getVenuePhotoBy, 
    searchVenuePhoto,
    updateVenuePhoto, 
    deleteVenuePhoto 
};