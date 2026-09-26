const { PaymentMethod } = require("../model/paymentMethodSchema");

// ---------------------- Create Payment Method ---------------
const createPaymentMethod = async (req, res) => {
    try {
        const { name } = req.body;

        const existingPaymentMethod = await PaymentMethod.findOne({ name });

        if (existingPaymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Bu to'lov usuli allaqachon mavjud"
            });
        } else {
            const newPaymentMethod = new PaymentMethod({
                name
            });

            await newPaymentMethod.save();
            return res.status(201).json({
                success: true,
                message: "To'lov usuli muvaffaqiyatli qo'shildi",
                data: newPaymentMethod,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi: To'lov usulini qo'shish jarayonida xato yuz berdi.",
        });
    }
};

// ---------------------- get payment methods --------------------------
const getPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find({});
        res.json({
            success: true,
            message: "Barcha to'lov usullari ro'yxati olingan.",
            innerData: paymentMethods,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi: To'lov usullarini olishda xato yuz berdi.",
        });
    }
};

// ----------------------- get paymentMethodById --------------------------
const getPaymentMethodById = async (req, res) => {
    try {
        const paymentMethodId = req.params.id;

        const paymentMethod = await PaymentMethod.findById(paymentMethodId);

        if (!paymentMethod) {
            return res.status(404).json({
                success: false,
                message: "To'lov usuli topilmadi"
            });
        }
        res.status(200).json({ message: "To'lov usuli topildi", paymentMethod });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server xatosi" });
    }
};

// ----------------------- search paymentMethod --------------------------
const searchPaymentMethod = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            return res.status(400).json({ message: "Invalid search query" });
        }

        const result = await PaymentMethod.find({
            name: { $regex: query,$options: "i" }
        });

        if (result.length === 0) {
            return res.json({ message: "To'lov usuli topilmadi" });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi"
        });
    }
};

// ----------------------- update paymentMethod -------------------------
const updatePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedPaymentMethod) {
            return res.status(404).json({
                success: false,
                message: "To'lov usuli topilmadi"
            });
        }

        res.json({
            success: true,
            message: "To'lov usuli muvaffaqiyatli yangilandi",
            paymentMethod: updatedPaymentMethod
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message,
        });
    }
};

// ----------------------- delete paymentMethod -------------------------
const deletePaymentMethod = async (req, res) => {
    try {
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id || req.body.id);

        if (!deletedPaymentMethod) {
            return res.status(404).json({
                success: false,
                message: "To'lov usuli topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "To'lov usuli muvaffaqiyatli o'chirildi",
            data: deletedPaymentMethod
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server Xatosi ${err.message}`
        });
    }
};

module.exports = {
    createPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    searchPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
};