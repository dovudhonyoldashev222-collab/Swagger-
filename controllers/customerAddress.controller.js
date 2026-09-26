const { CustomerAddress } = require("../model/customerAddressSchema");

// ---------------------------- create customer adress ----------------------------
const createAddress = async (req, res) => {
    try {
        const { 
            customer_id, 
            name, 
            country_id, 
            region_id, 
            district_id, 
            street, 
            house, 
            flat, 
            location, 
            post_index, 
            info 
        } = req.body;

        const existingAdress = await CustomerAddress.findOne({location})
        console.log(existingAdress);
           if(existingAdress){
                return res.status(400).json({
                    success: false, 
                    message: "Bu Manzil oldin ro'yxatdan o'tgan"
                });
            } else {    
                const newAddress = new CustomerAddress({ 
                customer_id, 
                name, 
                country_id, 
                region_id, 
                district_id, 
                street, 
                house, 
                flat, 
                location, 
                post_index, 
                info 
            });
            await newAddress.save();
            res.status(201).json({ 
                success: true, 
                message: "Manzil saqlandi", 
                address: newAddress 
            });
        }
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// --------------------------- get addresses -----------------------
const getAddresses = async (req, res) => {
    try {
        const addresses = await CustomerAddress.find().populate("customer_id");
        res.status(200).json({ 
            success: true, 
            addresses 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};


// ------------------------- get address by id ---------------------------
const getAddressBy = async (req, res) => {
    try {
        const address = await CustomerAddress.findById(req.params.id).populate("customer_id");
        if (!address) return res.status(404).json({ 
            success: false, 
            message: "Manzil topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            address 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// ---------------------- update addresses =---------------------------
const updateAddress = async (req, res) => {
    try {
        const { 
            name, country_id, 
            region_id, 
            district_id, 
            street, 
            house, 
            flat, 
            location, 
            post_index, 
            info 
        } = req.body;
        
        const updatedAddress = await CustomerAddress.findByIdAndUpdate(
            req.params.id,
            { name, 
                country_id, 
                region_id, 
                district_id, 
                street, 
                house, 
                flat, 
                location, 
                post_index, 
                info 
            },
            { new: true }
        );
        if (!updatedAddress) return res.status(404).json({ 
            success: false, 
            message: "Manzil topilmadi" 
        });
        res.status(200).json({ 
            success: true, 
            message: "Manzil yangilandi", 
            address: updatedAddress 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

// -------------------delete addresses ---------------------------------
const deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await CustomerAddress.findByIdAndDelete(req.params.id);
        if (!deletedAddress) return res.status(404).json({ 
            success: false, 
            message: "Manzil topilmadi" 
        });
        res.status(200).json({ 
            success: true,
            message: "Manzil o'chirildi" 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Server xatosi", 
            error: err.message 
        });
    }
};

const searchAddress = async (req, res) => {
    try {
        const { customerId } = req.query;
        if (!customerId) {
            return res.status(400).json({
                success: false,
                message: "customerId parametri ko'rsatilmagan"
            });
        }
        const addresses = await CustomerAddress.find({ customer_id: customerId }).populate("customer_id");
        res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            addresses
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
    createAddress, 
    getAddresses, 
    getAddressBy, 
    searchAddress,
    updateAddress, 
    deleteAddress 
};