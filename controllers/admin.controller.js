const {Admin} = require("../model/adminSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// ----------------------Register Admin ---------------
const register = async (req, res) => {
    try{
        const {
            name,
            login,
            password,
            is_active,
            is_creator,
            
        } = req.body

        const existingAdmin = await Admin.findOne({login})

        console.log(existingAdmin);
        
        if(existingAdmin){
            return res.status(400).json({
                success: false,
                message: "Bu login bilan ro'yxatdan o'tgan Admin mavjud"
            })
        }else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newAdmin = new Admin({
                name,
                login,
                password: hashedPassword,
                is_active: is_active !== undefined ? is_active : true, 
                is_creator: is_creator !== undefined ? is_creator : false, 
            })

            await newAdmin.save()
            return res.status(201).json({
                success: true,
                message: "Ro'yxatdan o'tish mevaffaqqiyatli yakunlandi",
                data: newAdmin,
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi.",
        });   
    }
}

// --------------------- login ------------------------
const adminLogin = async (req, res) => {
    try{
        const {login, password} = req.body

        const admin = await Admin.findOne({login})
        console.log(admin);
        if(!admin) {
            return res.status(400).json({
                success:false,
                message: "login or password id valid"
            })
        }

        const token = jwt.sign({login: admin.login}, "secret")
        return res.json({
            message: "login successfully",
            token: token,
        })
    }catch(err){
        console.error("Xato:", err);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi.",
        });
    }
}

// ---------------------- get admins --------------------------
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({})
    res.json({
      success: true,
      message: "Barcha adminlar ro'yxati olingan.",
      innerData: admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server xatosi: Adminlarni olishda xato yuz berdi.",
    });
  }
}

// ----------------------- get adminById--------------------------
const getAdminBy = async (req, res)  => {
    try{
        const adminId = req.params.id
        
        const admin = await Admin.findById(adminId)

        if(!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin topilmadi"
            })
        }
        res.status(200).json({message: "Admin topildi", admin})
    } catch(err){
        console.error(err);
        res.status(500).json({message: "Server xatosi"})
    }
}

// ----------------------- search admin --------------------------
const searchAdmin = async (req, res) => {
    try{
        const {query} = req.query

        if (!query || typeof query !== "string") {
            return res.status(400).json({message: "Invalid search query"})
        }

        const result = await Admin.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { login: { $regex: query, $options: "i" } },
                { password: { $regex: query, $options: "i" } },
            ],
        })

        if (result.length === 0) {
            return res.json({message: "Admin topilmadi"})
        }

        res.json(result)
    } catch(err){
        res.status(500).json({ 
            success: false,
            message: "Server xatosi" 
        });
    }
}

// ----------------------- update admins -------------------------
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, 
            login, 
            password, 
            is_active, 
            is_creator 
        } = req.body;

        const updateFields = { 
            name, 
            login, 
            is_active, 
            is_creator 
        };
        
        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id, 
            updateFields, 
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({
                success: false,
                message: "Admin topilmadi"
            });
        }
        
        const adminResponse = updatedAdmin.toObject();
        delete adminResponse.password;

        res.json({
            success: true,
            message: "Admin muvaffaqiyatli yangilandi",
            admin: adminResponse 
        });

    } catch (err) {
         res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: err.message,
        });
    }
};

// ----------------------- delete admin -------------------------
const deleteAdmin = async (req,res) => {
    try{
        const deleteAdmin = await Admin.findByIdAndDelete(req.params.id || req.body.id)

        if(!deleteAdmin) {
            return res.status(404).json({
                success: false,
                message: "Admin topilmadi"
            })
        }

        return res.status(200).json({
            success: false,
            message: "Admin muvaffaqiyatli o'chirildi",
            data: deleteAdmin
        })
    }catch(err){
        return res.status(500).json({ 
            success: false, 
            message: `Server Xatosi ${err.message}` 
        });
    }
}

module.exports = {register, adminLogin, getAdmins, getAdminBy, searchAdmin, updateAdmin, deleteAdmin}