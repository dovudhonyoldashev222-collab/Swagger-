const { HumanCt } = require("../model/humanCtSchema");

// ---------------------- create humanCt --------------------
const createHumanCategory = async (req, res) => {
    try {
        const { name, start_age, finish_age, gender } = req.body;

        const newCategory = new HumanCt({
            name,
            start_age,
            finish_age,
            gender
        });

        await newCategory.save();
        res.status(201).json({
            success: true,
            message: "Inson toifasi muvaffaqiyatli yaratildi",
            humanCt: newCategory
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ---------------------- getHumanCts ----------------------------
const getHumanCategories = async (req, res) => {
    try {
        const categories = await HumanCt.find();
        res.status(200).json({ 
            success: true, 
            message: "Barcha inson toifalari ro'yxati olingan",
            humanCt: categories 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ------------------------- get humanCt By ID -------------------------------
const getHumanCategoryBy = async (req, res) => {
    try {
        const category = await HumanCt.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: "Toifa topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, 
            humanCategory: category 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// --------------------------- update humanCt -----------------------------
const updateHumanCategory = async (req, res) => {
    try {
        const { name, start_age, finish_age, gender } = req.body;

        const updatedCategory = await HumanCt.findByIdAndUpdate(
            req.params.id,
            { name, start_age, finish_age, gender }, 
            { new: true, runValidators: true } 
        );

        if (!updatedCategory) {
            return res.status(404).json({ 
                success: false, 
                message: "Toifa topilmadi" 
            });
        }
        res.status(200).json({
            success: true,
            message: "Muvaffaqiyatli yangilandi",
            humanCategory: updatedCategory
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ---------------------------- delete humanCt ---------------------------
const deleteHumanCategory = async (req, res) => {
    try {
        const deletedCategory = await HumanCt.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ 
                success: false, 
                message: "Toifa topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: "Muvaffaqiyatli o'chirildi" 
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
    createHumanCategory,
    getHumanCategories,
    getHumanCategoryBy,
    updateHumanCategory,
    deleteHumanCategory
};