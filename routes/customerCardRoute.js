const { Router } = require("express");
const customerCard = Router();

const { 
    createCustomerCard, 
    getCustomerCards, 
    getCustomerCardBy, 
    updateCustomerCard, 
    deleteCustomerCard 
} = require("../controllers/customerCard.controller");

const { 
    customerCardCreateValidation, 
    customerCardUpdateValidation 
} = require("../validation/customerCardValidation");

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
 *   name: CustomerCards
 *   description: Mijoz plastik kartalarini boshqarish API tizimi
 */

/**
 * @swagger
 * /customerCard/addCard:
 *   post:
 *     summary: Tizimga yangi plastik karta qo'shish
 *     tags: [CustomerCards]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer_id:
 *                   type: string
 *                   example: "64ac8f23d7c9b6aa695259a1"
 *                 name:
 *                   type: string
 *                   example: "Uzcard Asaka"
 *                 phone:
 *                   type: string
 *                   example: "+998901234567"
 *                 number:
 *                   type: string
 *                   example: "8600140025003600"
 *                 year:
 *                   type: string
 *                   example: "29"
 *                 month:
 *                   type: string
 *                   example: "08"
 *                 is_active:
 *                   type: boolean
 *                   example: true
 *                 is_main:
 *                   type: boolean
 *                   example: false
 *     responses:
 *       "201":
 *         description: Karta muvaffaqiyatli saqlandi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
customerCard.post("/addCard", validateBody(customerCardCreateValidation), createCustomerCard);

/**
 * @swagger
 * /customerCard/getCards:
 *   get:
 *     summary: Barcha mijoz kartalari ro'yxatini olish
 *     tags: [CustomerCards]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
customerCard.get("/getCards", getCustomerCards);

/**
 * @swagger
 * /customerCard/getCard/{id}:
 *   get:
 *     summary: ID bo'yicha ma'lum bir kartani olish
 *     tags: [CustomerCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Karta topildi
 *       "404":
 *         description: Karta topilmadi
 *       "500":
 *         description: Server xatosi
 */
customerCard.get("/getCard/:id", getCustomerCardBy);

/**
 * @swagger
 * /customerCard/updateCard/{id}:
 *   put:
 *     summary: Karta ma'lumotlarini yangilash
 *     tags: [CustomerCards]
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
 *                 example: "Yangi Humo Karta nomi"
 *               is_active:
 *                 type: boolean
 *                 example: false
 *               is_main:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       "200":
 *         description: Karta muvaffaqiyatli yangilandi
 *       "404":
 *         description: Karta topilmadi
 *       "500":
 *         description: Server xatosi
 */
customerCard.put("/updateCard/:id", validateBody(customerCardUpdateValidation), updateCustomerCard);

/**
 * @swagger
 * /customerCard/deleteCard/{id}:
 *   delete:
 *     summary: Kartani tizimdan o'chirish
 *     tags: [CustomerCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Karta muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Karta topilmadi
 *       "500":
 *         description: Server xatosi
 */
customerCard.delete("/deleteCard/:id", deleteCustomerCard);

module.exports = { customerCardRoute: customerCard };