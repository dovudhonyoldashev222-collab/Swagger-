const { Types } = require("../model/typesSchema");

const createTypes = async (req, res) => {
    try {
        const { name } = req.body;
        const existing = await Types.findOne({ name });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Bu tur allaqachon mavjud"
            });
        }
        const newTypes = new Types({ name });
        await newTypes.save();
        return res.status(201).json({
            success: true,
            message: "Tur muvaffaqiyatli qo'shildi",
            data: newTypes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Tur qo'shishda xato"
        });
    }
};

const getTypes = async (req, res) => {
    try {
        const types = await Types.find({});
        res.json({
            success: true,
            message: "Barcha turlari olindi",
            innerData: types
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi: Turlari olishda xato"
        });
    }
};

const getTypeById = async (req, res) => {
    try {
        const type = await Types.findById(req.params.id);
        if (!type) {
            return res.status(404).json({
                success: false,
                message: "Tur topilmadi"
            });
        }
        res.status(200).json({ message: "Tur topildi", type });
    } catch (err) {
        res.status(500).json({ message: "Server xatosi" });
    }
};

const searchTypes = async (req, res) => {
    try {
        // Swagger'dan keladigan 'name' yoki boshqa joydan kelishi mumkin bo'lgan 'query' parametrini olamiz
        const searchQuery = req.query.name || req.query.query;

        if (!searchQuery || typeof searchQuery !== "string" || !searchQuery.trim()) {
            return res.status(400).json({ message: "Invalid search query" });
        }

        const result = await Types.find({
            name: { $regex: searchQuery.trim(),$options: "i" }
        });

        if (result.length === 0) {
            return res.status(200).json({ message: "Tur topilmadi", data: [] });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server xatosi" });
    }
};

const updateTypes = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updated = await Types.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Tur topilmadi"
            });
        }
        res.json({
            success: true,
            message: "Tur muvaffaqiyatli yangilandi",
            type: updated
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server xatosi" });
    }
};

const deleteTypes = async (req, res) => {
    try {
        const deleted = await Types.findByIdAndDelete(req.params.id || req.body.id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Tur topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Tur muvaffaqiyatli o'chirildi",
            data: deleted
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server Xatosi ${err.message}`
        });
    }
};

module.exports = {
    createTypes,
    getTypes,
    getTypeById,
    searchTypes,
    updateTypes,
    deleteTypes
};