const { District } = require("../model/districtSchema");

// ---------------------- Create District ---------------
const createDistrict = async (req, res) => {
    try {
        const { name, regionId } = req.body;

        const existingDistrict = await District.findOne({ name, regionId });

        if (existingDistrict) {
            return res.status(400).json({
                success: false,
                message: "Ushbu hududda bu nomli tuman allaqachon mavjud"
            });
        } else {
            const newDistrict = new District({
                name,
                regionId
            });

            await newDistrict.save();
            return res.status(201).json({
                success: true,
                message: "Tuman muvaffaqiyatli qo'shildi",
                data: newDistrict,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Tumanni qo'shish jarayonida xato yuz berdi.",
        });
    }
};

// ---------------------- get districts --------------------------
const getDistricts = async (req, res) => {
    try {
        const districts = await District.find({}).populate("regionId");
        res.json({
            success: true,
            message: "Barcha tumanlar ro'yxati olingan.",
            innerData: districts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi: Tumanlarni olishda xato yuz berdi.",
        });
    }
};

// ----------------------- get districtById --------------------------
const getDistrictById = async (req, res) => {
    try {
        const districtId = req.params.id;

        const district = await District.findById(districtId).populate("regionId");

        if (!district) {
            return res.status(404).json({
                success: false,
                message: "Tuman topilmadi"
            });
        }
        res.status(200).json({ message: "Tuman topildi", district });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

// ----------------------- search district --------------------------
const searchDistrict = async (req, res) => {
    try {
        const searchTerm = req.query.name || req.query.query;

        if (!searchTerm || typeof searchTerm !== "string") {
            return res.status(400).json({
                success: false,
                message: "name yoki query parametri ko'rsatilmagan"
            });
        }

        const result = await District.find({
            name: { $regex: searchTerm,$options: "i" }
        }).populate("regionId");

        res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            districts: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi"
        });
    }
};

// ----------------------- update district -------------------------
const updateDistrict = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, regionId } = req.body;

        const updatedDistrict = await District.findByIdAndUpdate(
            id,
            { name, regionId },
            { new: true }
        );

        if (!updatedDistrict) {
            return res.status(404).json({
                success: false,
                message: "Tuman topilmadi"
            });
        }

        res.json({
            success: true,
            message: "Tuman muvaffaqiyatli yangilandi",
            district: updatedDistrict
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message,
        });
    }
};

// ----------------------- delete district -------------------------
const deleteDistrict = async (req, res) => {
    try {
        const deletedDistrict = await District.findByIdAndDelete(req.params.id || req.body.id);

        if (!deletedDistrict) {
            return res.status(404).json({
                success: false,
                message: "Tuman topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tuman muvaffaqiyatli o'chirildi",
            data: deletedDistrict
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server Xatosi ${err.message}`
        });
    }
};

module.exports = {
    createDistrict,
    getDistricts,
    getDistrictById,
    searchDistrict,
    updateDistrict,
    deleteDistrict
};