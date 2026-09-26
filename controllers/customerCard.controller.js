const { CustomerCard } = require("../model/customerCardSchema");

// -------------------------- create customer card ----------------------
const createCustomerCard = async (req, res) => {
    try {
        const { 
            customer_id, 
            name, 
            phone, 
            number, 
            year, 
            month, 
            is_active, 
            is_main 
        } = req.body;

        const newCard = new CustomerCard({ 
            customer_id, 
            name, 
            phone, 
            number, 
            year, 
            month, 
            is_active, 
            is_main 
        });
        await newCard.save();
        res.status(201).json({ 
            success: true, 
            message: "Karta muvaffaqiyatli saqlandi", 
            customerCard: newCard 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message });
    }
};

// --------------------- get customer cards ---------------------
const getCustomerCards = async (req, res) => {
    try {
        const cards = await CustomerCard.find()
        .populate("customer_id");
        res.status(200).json({ 
            success: true, 
            customerCards: cards 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// --------------------------- get customer card by -----------
const getCustomerCardBy = async (req, res) => {
    try {
        const card = await CustomerCard.findById(req.params.id)
        .populate("customer_id");
        if (!card){
            return res.status(404).json({ 
                success: false, 
                message: "Karta topilmadi" 
            });
        }
        res.status(200).json({ 
            success: true, 
            customerCard: card });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// -------------------------- update customer card --------------------------
const updateCustomerCard = async (req, res) => {
    try {
        const { 
            name, 
            phone, 
            number, 
            year, 
            month, 
            is_active, 
            is_main 
        } = req.body;
        const updatedCard = await CustomerCard.findByIdAndUpdate(
            req.params.id,
            { 
                name, 
                phone, 
                number, 
                year, month, is_active, is_main },
            { new: true }
        );
        if (!updatedCard) return res.status(404).json({ 
            success: false,
            message: "Karta topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            message: "Karta muvaffaqiyatli yangilandi", 
            customerCard: updatedCard 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// ------------------------------ delete customer card ---------------------------
const deleteCustomerCard = async (req, res) => {
    try {
        const deletedCard = await CustomerCard.findByIdAndDelete(req.params.id);
        if (!deletedCard) return res.status(404).json({ 
            success: false, 
            message: "Karta topilmadi" 
        });
        res.status(200).json({ success: true, 
            message: "Karta tizimdan o'chirildi" 
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
    createCustomerCard, 
    getCustomerCards, 
    getCustomerCardBy, 
    updateCustomerCard, 
    deleteCustomerCard 
};