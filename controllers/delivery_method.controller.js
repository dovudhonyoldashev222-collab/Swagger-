const { DeliveryMethod } = require("../model/deliveryMethodSchema");

// ---------------------- Create Delivery Method ---------------
const createDeliveryMethod = async (req, res) => {
    try {
        const { name } = req.body;

        const existingDeliveryMethod = await DeliveryMethod.findOne({ name });

        if (existingDeliveryMethod) {
            return res.status(400).json({
                success: false,
                message: "Bu yetkazib berish usuli allaqachon mavjud"
            });
        } else {
            const newDeliveryMethod = new DeliveryMethod({
                name
            });

            await newDeliveryMethod.save();
            return res.status(201).json({
                success: true,
                message: "Yetkazib berish usuli muvaffaqiyatli qo'shildi",
                data: newDeliveryMethod,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Yetkazib berish usulini qo'shish jarayonida xato yuz berdi.",
        });
    }
};

// ---------------------- get delivery methods --------------------------
const getDeliveryMethods = async (req, res) => {
    try {
        const deliveryMethods = await DeliveryMethod.find({});
        res.json({
            success: true,
            message: "Barcha yetkazib berish usullari ro'yxati olingan.",
            innerData: deliveryMethods,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi: Yetkazib berish usullarini olishda xato yuz berdi.",
        });
    }
};

// ----------------------- get deliveryMethodById --------------------------
const getDeliveryMethodById = async (req, res) => {
    try {
        const deliveryMethodId = req.params.id;

        const deliveryMethod = await DeliveryMethod.findById(deliveryMethodId);

        if (!deliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Yetkazib berish usuli topilmadi"
            });
        }
        res.status(200).json({ message: "Yetkazib berish usuli topildi", deliveryMethod });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

// ----------------------- search deliveryMethod --------------------------
const searchDeliveryMethod = async (req, res) => {
    try {
        const searchTerm = req.query.name || req.query.query;

        if (!searchTerm || typeof searchTerm !== "string") {
            return res.status(400).json({
                success: false,
                message: "name yoki query parametri ko'rsatilmagan"
            });
        }

        const result = await DeliveryMethod.find({
            name: { $regex: searchTerm,$options: "i" }
        });

        res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            deliveryMethods: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi"
        });
    }
};

// ----------------------- update deliveryMethod -------------------------
const updateDeliveryMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedDeliveryMethod = await DeliveryMethod.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedDeliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Yetkazib berish usuli topilmadi"
            });
        }

        res.json({
            success: true,
            message: "Yetkazib berish usuli muvaffaqiyatli yangilandi",
            deliveryMethod: updatedDeliveryMethod
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message,
        });
    }
};

// ----------------------- delete deliveryMethod -------------------------
const deleteDeliveryMethod = async (req, res) => {
    try {
        const deletedDeliveryMethod = await DeliveryMethod.findByIdAndDelete(req.params.id || req.body.id);

        if (!deletedDeliveryMethod) {
            return res.status(404).json({
                success: false,
                message: "Yetkazib berish usuli topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Yetkazib berish usuli muvaffaqiyatli o'chirildi",
            data: deletedDeliveryMethod
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server Xatosi ${err.message}`
        });
    }
};

module.exports = {
    createDeliveryMethod,
    getDeliveryMethods,
    getDeliveryMethodById,
    searchDeliveryMethod,
    updateDeliveryMethod,
    deleteDeliveryMethod
};