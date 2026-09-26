const { HumanCategory } = require("../model/humanCategorySchema");

// ---------------------- Create Human Category ---------------
const createHumanCategory = async (req, res) => {
    try {
        const { name, start_age, finish_age, gender } = req.body;

        const existingCategory = await HumanCategory.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Bu toifa nomi allaqachon mavjud"
            });
        } else {
            const newCategory = new HumanCategory({
                name,
                start_age,
                finish_age,
                gender
            });

            await newCategory.save();
            return res.status(201).json({
                success: true,
                message: "Yosh toifasi muvaffaqiyatli qo'shildi",
                data: newCategory,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Yosh toifasini qo'shish jarayonida xato yuz berdi.",
        });
    }
};

// ---------------------- get human categories --------------------------
const getHumanCategories = async (req, res) => {
    try {
        const categories = await HumanCategory.find({});
        res.json({
            success: true,
            message: "Barcha toifalar ro'yxati olingan.",
            innerData: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi: Toifalarni olishda xato yuz berdi.",
        });
    }
};

// ----------------------- get humanCategoryById --------------------------
const getHumanCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await HumanCategory.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Toifa topilmadi"
            });
        }
        res.status(200).json({ message: "Toifa topildi", category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

// ----------------------- search humanCategory --------------------------
const searchHumanCategory = async (req, res) => {
    try {
        const searchTerm = req.query.name || req.query.query;

        if (!searchTerm || typeof searchTerm !== "string") {
            return res.status(400).json({
                success: false,
                message: "name yoki query parametri ko'rsatilmagan"
            });
        }

        const result = await HumanCategory.find({
            $or: [
                { name: { $regex: searchTerm,$options: "i" } },
                { gender: { $regex: searchTerm,$options: "i" } }
            ]
        });

        res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            humanCategories: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi"
        });
    }
};

// ----------------------- update humanCategory -------------------------
const updateHumanCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, start_age, finish_age, gender } = req.body;

        const updatedCategory = await HumanCategory.findByIdAndUpdate(
            id,
            { name, start_age, finish_age, gender },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Toifa topilmadi"
            });
        }

        res.json({
            success: true,
            message: "Toifa muvaffaqiyatli yangilandi",
            humanCategory: updatedCategory
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message,
        });
    }
};

// ----------------------- delete humanCategory -------------------------
const deleteHumanCategory = async (req, res) => {
    try {
        const deletedCategory = await HumanCategory.findByIdAndDelete(req.params.id || req.body.id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Toifa topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Toifa muvaffaqiyatli o'chirildi",
            data: deletedCategory
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server Xatosi ${err.message}`
        });
    }
};

module.exports = {
    createHumanCategory,
    getHumanCategories,
    getHumanCategoryById,
    searchHumanCategory,
    updateHumanCategory,
    deleteHumanCategory
};