const { Region } = require("../model/regionSchema");

// ---------------------- Create Region ----------------------
const createRegion = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({
                success: false,
                message: "Viloyat nomi kiritilishi shart"
            });
        }

        const existingRegion = await Region.findOne({ 
            name: { $regex: `^${name.trim()}$`, $options: "i" } 
        });

        if (existingRegion) {
            return res.status(400).json({
                success: false,
                message: "Bu viloyat allaqachon mavjud"
            });
        }

        const newRegion = new Region({
            name: name.trim()
        });

        await newRegion.save();
        return res.status(201).json({
            success: true,
            message: "Viloyat muvaffaqiyatli qo'shildi",
            data: newRegion
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: Viloyatni qo'shish jarayonida xato yuz berdi. ${err.message}`
        });
    }
};

// ---------------------- Get Regions ----------------------
const getRegions = async (req, res) => {
    try {
        const regions = await Region.find({});
        return res.status(200).json({
            success: true,
            message: "Barcha viloyatlar ro'yxati olingan.",
            innerData: regions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: Viloyatlarni olishda xato yuz berdi. ${error.message}`
        });
    }
};

// ---------------------- Get Region By ID ----------------------
const getRegionById = async (req, res) => {
    try {
        const regionId = req.params.id;

        const region = await Region.findById(regionId);

        if (!region) {
            return res.status(404).json({
                success: false,
                message: "Viloyat topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Viloyat topildi",
            region
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: ${err.message}`
        });
    }
};

// ---------------------- Search Region ----------------------
const searchRegion = async (req, res) => {
    try {
        // Swagger query parametri "name" yoki "query" bo'lishi mumkin
        const searchTerm = req.query.name || req.query.query;

        if (!searchTerm || typeof searchTerm !== "string" || !searchTerm.trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid search query: qidiruv so'zi kiritilmadi"
            });
        }

        const result = await Region.find({
            name: { $regex: searchTerm.trim(),$options: "i" }
        });

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Viloyat topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            data: result
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: ${err.message}`
        });
    }
};

// ---------------------- Update Region ----------------------
const updateRegion = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({
                success: false,
                message: "Yangi viloyat nomini kiritish majburiy"
            });
        }

        const updatedRegion = await Region.findByIdAndUpdate(
            id,
            { name: name.trim() },
            { new: true }
        );

        if (!updatedRegion) {
            return res.status(404).json({
                success: false,
                message: "Viloyat topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Viloyat muvaffaqiyatli yangilandi",
            region: updatedRegion
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: ${err.message}`
        });
    }
};

// ---------------------- Delete Region ----------------------
const deleteRegion = async (req, res) => {
    try {
        const regionId = req.params.id || req.body.id;

        const deletedRegion = await Region.findByIdAndDelete(regionId);

        if (!deletedRegion) {
            return res.status(404).json({
                success: false,
                message: "Viloyat topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Viloyat muvaffaqiyatli o'chirildi",
            data: deletedRegion
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: ${err.message}`
        });
    }
};

module.exports = {
    createRegion,
    getRegions,
    getRegionById,
    searchRegion,
    updateRegion,
    deleteRegion
};