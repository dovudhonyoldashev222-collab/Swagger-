const { Router } = require("express");
const customer = Router();

const {
    createCustomer,
    getCustomers,
    getCustomerBy,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customer.controller");

const { customerCreateValidation, customerUpdateValidation } = require("../validation/customerValidation");

const validateBody = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            success: false, 
            message: "Validatsiya xatosi", 
            error: error.details[0].message 
        });
    }
    next();
};

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Mijozlarni boshqarish API tizimi
 */

/**
 * @swagger
 * /customer/addCustomer:
 *   post:
 *     summary: Yangi mijoz yaratish (Ro'yxatdan o'tish)
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Asilbek"
 *               last_name:
 *                 type: string
 *                 example: "Rustamov"
 *               phone:
 *                 type: string
 *                 example: "+998991234567"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *               email:
 *                 type: string
 *                 example: "asilbek@example.com"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "2000-05-15"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               lang_id:
 *                 type: string
 *                 example: "uz"
 *     responses:
 *       "201":
 *         description: Muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya yoki bandlik xatosi
 *       "500":
 *         description: Server xatosi
 */
customer.post("/addCustomer", validateBody(customerCreateValidation), createCustomer);

/**
 * @swagger
 * /customer/getCustomers:
 *   get:
 *     summary: Barcha mijozlar ro'yxatini olish
 *     tags: [Customers]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
customer.get("/getCustomers", getCustomers);

/**
 * @swagger
 * /customer/getCustomer/{id}:
 *   get:
 *     summary: ID bo'yicha mijozni olish
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Mijoz topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
customer.get("/getCustomer/:id", getCustomerBy);

/**
 * @swagger
 * /customer/updateCustomer/{id}:
 *   put:
 *     summary: Mijoz ma'lumotlarini yangilash
 *     tags: [Customers]
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
 *               first_name:
 *                 type: string
 *                 example: "Yangi Ism"
 *               phone:
 *                 type: string
 *                 example: "+998907777777"
 *     responses:
 *       "200":
 *         description: Yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
customer.put("/updateCustomer/:id", validateBody(customerUpdateValidation), updateCustomer);

/**
 * @swagger
 * /customer/deleteCustomer/{id}:
 *   delete:
 *     summary: Mijozni o'chirish
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: O'chirildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
customer.delete("/deleteCustomer/:id", deleteCustomer);

module.exports = { customerRoute: customer };