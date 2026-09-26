const { Lang } = require("../model/langSchema");

// ---------------------- Create Lang ----------------------
const createLang = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({
                success: false,
                message: "Til nomi kiritilishi shart"
            });
        }

        const existingLang = await Lang.findOne({
            name: { $regex: `^${name.trim()}$`, $options: "i" }
        });

        if (existingLang) {
            return res.status(400).json({
                success: false,
                message: "Bu til allaqachon mavjud"
            });
        }

        const newLang = new Lang({
            name: name.trim()
        });

        await newLang.save();
        return res.status(201).json({
            success: true,
            message: "Til muvaffaqiyatli qo'shildi",
            data: newLang
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: Tilni qo'shish jarayonida xato yuz berdi. ${err.message}`
        });
    }
};

// ---------------------- Get Langs --------------------------
const getLangs = async (req, res) => {
    try {
        const langs = await Lang.find({});
        return res.status(200).json({
            success: true,
            message: "Barcha tillar ro'yxati olingan.",
            innerData: langs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: Tillarni olishda xato yuz berdi. ${error.message}`
        });
    }
};

// ----------------------- Get Lang By ID --------------------------
const getLangById = async (req, res) => {
    try {
        const langId = req.params.id;

        const lang = await Lang.findById(langId);

        if (!lang) {
            return res.status(404).json({
                success: false,
                message: "Til topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Til topildi",
            lang
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: ${err.message}`
        });
    }
};

// ----------------------- Search Lang --------------------------
const searchLang = async (req, res) => {
    try {
        const searchTerm = req.query.name || req.query.query;

        if (!searchTerm || typeof searchTerm !== "string" || !searchTerm.trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid search query: til nomi kiritilmadi"
            });
        }

        const result = await Lang.find({
            name: { $regex: searchTerm.trim(),$options: "i" }
        });

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Til topilmadi"
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

// ----------------------- Update Lang -------------------------
const updateLang = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || typeof name !== "string") {
            return res.status(400).json({
                success: false,
                message: "Yangi til nomini kiritish majburiy"
            });
        }

        const updatedLang = await Lang.findByIdAndUpdate(
            id,
            { name: name.trim() },
            { new: true }
        );

        if (!updatedLang) {
            return res.status(404).json({
                success: false,
                message: "Til topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Til muvaffaqiyatli yangilandi",
            lang: updatedLang
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: ${err.message}`
        });
    }
};

// ----------------------- Delete Lang -------------------------
const deleteLang = async (req, res) => {
    try {
        const langId = req.params.id || req.body.id;

        const deletedLang = await Lang.findByIdAndDelete(langId);

        if (!deletedLang) {
            return res.status(404).json({
                success: false,
                message: "Til topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Til muvaffaqiyatli o'chirildi",
            data: deletedLang
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server xatosi: ${err.message}`
        });
    }
};

module.exports = {
    createLang,
    getLangs,
    getLangById,
    searchLang,
    updateLang,
    deleteLang
};  