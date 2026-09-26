const { Router } = require("express");
const seatType = Router();

const { 
    createSeatType, 
    getSeatTypes, 
    getSeatTypeById, 
    searchSeatType,
    updateSeatType, 
    deleteSeatType 
} = require("../controllers/seatType.controller");

const {
    seatTypeCreateValidation,
    seatTypeUpdateValidation
} = require("../validation/seatTypeValidation");

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
 *   name: SeatTypes
 *   description: O'rindiq turlarini boshqarish API tizimi
 */

/**
 * @swagger
 * /seatType/addType:
 *   post:
 *     summary: Yangi o'rindiq turi qo'shish
 *     tags: [SeatTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "VIP"
 *     responses:
 *       "201":
 *         description: Yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
seatType.post("/addType", validateBody(seatTypeCreateValidation), createSeatType);

/**
 * @swagger
 * /seatType/getTypes:
 *   get:
 *     summary: Barcha o'rindiq turlari ro'yxatini olish
 *     tags: [SeatTypes]
 *     responses:
 *       "200":
 *         description: Ro'yxat qaytarildi
 *       "500":
 *         description: Server xatosi
 */
seatType.get("/getTypes", getSeatTypes);

/**
 * @swagger
 * /seatType/getType/{id}:
 *   get:
 *     summary: ID bo'yicha ma'lum bir o'rindiq turini olish
 *     tags: [SeatTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
seatType.get("/getType/:id", getSeatTypeById);

/**
 * @swagger
 * /seatType/searchSeatType:
 *   get:
 *     summary: Nom bo'yicha o'rindiq turlarini qidirish
 *     tags: [SeatTypes]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: O'rindiq turi nomi
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
seatType.get("/searchSeatType", searchSeatType);

/**
 * @swagger
 * /seatType/updateType/{id}:
 *   put:
 *     summary: O'rindiq turi nomini yangilash
 *     tags: [SeatTypes]
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
 *                 example: "Premium VIP"
 *     responses:
 *       "200":
 *         description: Yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
seatType.put("/updateType/:id", validateBody(seatTypeUpdateValidation), updateSeatType);

/**
 * @swagger
 * /seatType/deleteType/{id}:
 *   delete:
 *     summary: O'rindiq turini o'chirish
 *     tags: [SeatTypes]
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
seatType.delete("/deleteType/:id", deleteSeatType);

module.exports = { seatTypeRoute: seatType };