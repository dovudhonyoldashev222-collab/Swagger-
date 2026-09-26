const { Cart } = require("../model/cartSchema");

// ---------------------- create cart -----------------------
const createCart = async (req, res) => {
    try {
        const { 
            ticket_id, 
            customer_id, 
            fineshedAt, 
            status_id 
        } = req.body;

        const newCart = new Cart({
            ticket_id,
            customer_id,
            fineshedAt,
            status_id
        });

        await newCart.save();
        res.status(201).json({
            success: true,
            message: "Savatcha muvaffaqiyatli yaratildi",
            cart: newCart
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
};

// ----------------------- get carts ----------------------
const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate("ticket_id")
            .populate("customer_id");
        res.status(200).json({ 
            success: true, 
            carts 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// ------------------------- get CartById --------------------
const getCartBy = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
            .populate("ticket_id")
            .populate("customer_id");
        if (!cart) {
            return res.status(404).json({ 
                success: false, 
                message: "Savatcha topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, cart 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Server xatosi",
            error: err.message 
        });
    }
};

// -------------------------- update cart ------------------------
const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).json({ 
                success: false, 
                message: "Savatcha topilmadi" 
            });
        }
        res.status(200).json({
            success: true,
            message: "Savatcha muvaffaqiyatli yangilandi",
            cart: updatedCart
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
};

// ------------------------------ delete cart -----------------------------
const deleteCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedCart) {
            return res.status(404).json({ 
                success: false, 
                message: "Savatcha topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: "Savatcha o'chirildi" 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
};

module.exports = {
    createCart,
    getCarts,
    getCartBy,
    updateCart,
    deleteCart
};