// Modelni xavfsiz yuklash (destrukturizatsiya bo'lsa ham, to'g'ridan-to'g'ri bo'lsa ham ishlaydi)
const cartItemImport = require("../model/cartItemSchema");
const CartItem = cartItemImport.CartItem || cartItemImport;

// ---------------------- Create CartItem ---------------
const createCartItem = async (req, res) => {
    try {
        const { ticket_id, cart_id } = req.body;

        // Model mavjudligini tekshirish
        if (!CartItem) {
            return res.status(500).json({
                success: false,
                message: "CartItem modeli fayldan to'g'ri yuklanmadi (undefined)!"
            });
        }

        // Majburiy maydonlar tekshiruvi
        if (!ticket_id || !cart_id) {
            return res.status(400).json({
                success: false,
                message: "ticket_id va cart_id kiritilishi shart!"
            });
        }

        const existingCartItem = await CartItem.findOne({ ticket_id, cart_id });

        if (existingCartItem) {
            return res.status(400).json({
                success: false,
                message: "Bu chipta savatchaga allaqachon qo'shilgan"
            });
        }

        const newCartItem = new CartItem({
            ticket_id,
            cart_id
        });

        await newCartItem.save();
        return res.status(201).json({
            success: true,
            message: "Chipta savatchaga muvaffaqiyatli qo'shildi",
            data: newCartItem,
        });
    } catch (err) {
        console.error("CartItem xatosi:", err);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Savatchaga chipta qo'shish jarayonida xato yuz berdi.",
            aniq_sababi: err.message
        });
    }
};

// ---------------------- get cartItems --------------------------
const getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find({})
            .populate("ticket_id")
            .populate("cart_id");

        res.json({
            success: true,
            message: "Barcha savat elementlari ro'yxati olingan.",
            innerData: cartItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server xatosi: Savat elementlarini olishda xato yuz berdi.",
            aniq_sababi: error.message
        });
    }
};

// ----------------------- get cartItemById --------------------------
const getCartItemById = async (req, res) => {
    try {
        const cartItemId = req.params.id;

        const cartItem = await CartItem.findById(cartItemId)
            .populate("ticket_id")
            .populate("cart_id");

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Savat elementi topilmadi"
            });
        }
        res.status(200).json({ message: "Savat elementi topildi", cartItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Server xatosi", 
            aniq_sababi: err.message 
        });
    }
};

// ----------------------- search cartItem (by cart_id) --------------------------
const searchCartItem = async (req, res) => {
    try {
        const { cartId } = req.query;

        if (!cartId) {
            return res.status(400).json({ message: "Savat ID si (cartId) ko'rsatilishi shart" });
        }

        const result = await CartItem.find({ cart_id: cartId })
            .populate("ticket_id")
            .populate("cart_id");

        if (result.length === 0) {
            return res.json({ message: "Ushbu savatda elementlar topilmadi" });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            aniq_sababi: err.message
        });
    }
};

// ----------------------- update cartItem -------------------------
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { ticket_id, cart_id } = req.body;

        const updatedCartItem = await CartItem.findByIdAndUpdate(
            id,
            { ticket_id, cart_id },
            { new: true }
        );

        if (!updatedCartItem) {
            return res.status(404).json({
                success: false,
                message: "Savat elementi topilmadi"
            });
        }

        res.json({
            success: true,
            message: "Savat elementi muvaffaqiyatli yangilandi",
            cartItem: updatedCartItem
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            aniq_sababi: err.message,
        });
    }
};

// ----------------------- delete cartItem -------------------------
const deleteCartItem = async (req, res) => {
    try {
        const deletedCartItem = await CartItem.findByIdAndDelete(req.params.id || req.body.id);

        if (!deletedCartItem) {
            return res.status(404).json({
                success: false,
                message: "Savat elementi topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Savat elementi muvaffaqiyatli o'chirildi",
            data: deletedCartItem
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server Xatosi: ${err.message}`
        });
    }
};

module.exports = {
    createCartItem,
    getCartItems,
    getCartItemById,
    searchCartItem,
    updateCartItem,
    deleteCartItem
};