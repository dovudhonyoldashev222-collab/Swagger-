const { Customer } = require("../model/customerSchema");
const bcrypt = require("bcrypt");

// ---------------------- create Customer ------------------
const createCustomer = async (req, res) => {
    try {
        const { 
            first_name, 
            last_name, 
            phone, 
            password, 
            email, 
            birth_date, 
            gender, 
            lang_id 
        } = req.body;

        const existingCustomer = await Customer.findOne({ $or: [{ email }, { phone }] });
        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Email yoki telefon raqami allaqachon ro'yxatdan o'tgan"
            });
        }

        const hashed_password = await bcrypt.hash(password, 10);

        const newCustomer = new Customer({
            first_name,
            last_name,
            phone,
            hashed_password,
            email,
            birth_date,
            gender,
            lang_id
        });

        await newCustomer.save();
        
        res.status(201).json({
            success: true,
            message: "Mijoz muvaffaqiyatli yaratildi",
            customer: newCustomer
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ----------------------- get customers -----------------------
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find()
        res.status(200).json({
            success: true,
            customers
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ------------------- get Customer By Id ------------------------
const getCustomerBy = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Mijoz topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            customer
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ---------------------- Update Customer -----------------------
const updateCustomer = async (req, res) => {
    try {
        const { 
            first_name, 
            last_name, 
            phone, 
            password, 
            email, 
            birth_date, 
            gender, 
            lang_id 
        } = req.body;

        const updateData = { 
            first_name, 
            last_name, 
            phone, 
            email, 
            birth_date, 
            gender, 
            lang_id 
        };

        if (password) {
            updateData.hashed_password = await bcrypt.hash(password, 10);
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        )

        if (!updatedCustomer) {
            return res.status(404).json({
                success: false,
                message: "Mijoz topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            message: "Mijoz ma'lumotlari yangilandi",
            customer: updatedCustomer
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message
        });
    }
};

// ---------------------------- delete Customer ----------------------------
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({
                success: false,
                message: "Mijoz topilmadi"
            });
        }
        res.status(200).json({
            success: true,
            message: "Mijoz tizimdan o'chirildi"
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
    createCustomer, 
    getCustomers, 
    getCustomerBy, 
    updateCustomer, 
    deleteCustomer 
};