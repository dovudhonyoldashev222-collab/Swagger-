const {Router} = require("express")
const admins = Router()

const { register, getAdmins, getAdminBy, searchAdmin, updateAdmin, deleteAdmin, adminLogin} = require("../controllers/admin.controller")

const validationSchema = (schema) => (req,res,next) => {
    const validationResult = schema.validate(req.body)
    if(validationResult.error){
        return res.status(400).send(validationResult.error.details[0].message)
    }
    next()
}

const {
    adminRegisterValidationSchema,
    updateAdminValidationSchema
} = require("../validation/adminValidation")
/**
 * @swagger
 * tags: 
 *   name: Admins
 *   description: Adminlarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /admins/register:
 *   post: 
 *     summary: Yangi adminni ro'yxatdan o'tkazish
 *     tags: [Admins]
 *     description: Yangi adminni yaratish
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               name:
 *                 type: string
 *                 description: Foydalanuvchi uchun yagona username 
 *               password:
 *                 type: string 
 *                 description:  Admin uchun parol 
 *               login:
 *                 type: string 
 *                 description:  Admin uchun login 
 *               is_active:
 *                 type: boolean 
 *                 description: faolligi 
 *               is_creator:
 *                 type: boolean 
 *                 description: yaratuvchi
 *     responses:
 *       "201":
 *         description: Ro'yxatdan o'tish muvaffaqaqiyatli yakunlandi
 *       "400":
 *         description: Validatsiya xatosi yoki bunday username mavjud
 *       "500":
 *         description: Ichki server xatosi
 */
admins.post("/register", validationSchema(adminRegisterValidationSchema), register)

/**
 * @swagger 
 * /admins/adminLogin:
 *   post:
 *     summary: Adminni tizimga kirishi
 *     tags: [Admins] 
 *     description: adminni tizimga kiritish
 *     requestBody: 
 *       required: true 
 *       content:  
 *         application/json:  
 *           schema:  
 *             type: object   
 *             properties:  
 *               login:  
 *                 type: string  
 *                 description: Adminni logini 
 *               password:  
 *                 type: string  
 *                 description: Admin paroli
 *     responses: 
 *       "200":
 *         description: Muvaffaqiyatli login qilindi  
 *       "400":
 *         description: Noto'g'ri ma'lumotlar  
 *       "500":
 *         description: Server xatosi  
 *     
 */
admins.post("/adminLogin", adminLogin)

/**
 * @swagger
 * /admins/getAdmins:
 *   get:
 *     summary: Barcha adminlarni olish
 *     tags: [Admins]
 *     description: Barcha adminlar ro'yxatini olihs
 *     responses:
 *       "200":
 *         description: Adminlar muvaffaqiyatli olindi 
 *       "500":
 *         description: Server xatosi
 */
admins.get("/getAdmins", getAdmins)

/**
 * @swagger 
 * /admins/getAdminBy/{id}:
 *   get:
 *     summary: Adminni ID bo'yicha olish
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       "200":  
 *         description: Admin muvaffaqiyatli olindi   
 *       "400":  
 *         description: Admin topilmadi   
 *       "500":   
 *         description: Server xatosi   
 */
admins.get("/getAdminBy/:id", getAdminBy)

/**
 * @swagger
 * /admins/searchAdmin:
 *   get:
 *     summary: Adminlarni qidirish
 *     tags: [Admins]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema: 
 *           type: string 
 *     responses:
 *       "200":
 *         description: Foydalanuvchii topildi
 *       "400":
 *         description: Foydalanuvchi topilmadi
 *       "500":
 *         description: Server xatosi
 */
admins.get("/searchAdmin", searchAdmin)

/**
 * @swagger 
 * /admins/updateAdmin/{id}:
 *   put:
 *     summary: Adminlarni yangilash
 *     tags: [Admins]
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string  
 *               login: 
 *                 type: string  
 *               password: 
 *                 type: string  
 *               is_active: 
 *                 type: boolean  
 *               is_creator: 
 *                 type: boolean 
 *     responses:  
 *       "200":
 *         description: muvaffaqaqiyatli yangilandi
 *       "400":
 *         description: validation xatosi
 *       "404":
 *         description: Admin topilmadi
 *       "500":
 *         description: Server xatosi
 */
admins.put("/updateAdmin/:id", validationSchema(updateAdminValidationSchema), updateAdmin)

/**
 * @swagger 
 * /admins/deleteAdmin/{id}:
 *   delete:
 *     summary: Adminni o'chirish
 *     tags: [Admins]
 *     parameters:
 *       - in: path 
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *     responses: 
 *       "200": 
 *         description: Admin o'chirildi
 *       "404": 
 *         description: Admin topilmadi
 *       "500": 
 *         description: server xatosi
 */
admins.delete("/deleteAdmin/:id", deleteAdmin)
module.exports = { adminRoute: admins }