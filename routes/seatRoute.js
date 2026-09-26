const { Router } = require("express");
const seat = Router();

const { 
    createSeat, 
    getSeats, 
    getSeatBy, 
    updateSeat, 
    deleteSeat 
} = require("../controllers/seat.controller");

const { 
    seatCreateValidation, 
    seatUpdateValidation 
} = require("../validation/seatValidation");

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
 *   name: Seats
 *   description: Joylardagi o'rindiqlar API boshqaruv tizimi
 */

/**
 * @swagger
 * /seat/addSeat:
 *   post:
 *     summary: Tizimga yangi o'rindiq joylashtirish
 *     tags: [Seats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: integer
 *                 example: 2
 *               row_number:
 *                 type: integer
 *                 example: 14
 *               number:
 *                 type: integer
 *                 example: 55
 *               venue_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259a1"
 *               seat_type_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259b3"
 *               location_in_schema:
 *                 type: string
 *                 example: "x:120, y:250"
 *     responses:
 *       "201":
 *         description: Muvaffaqiyatli saqlandi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
seat.post("/addSeat", validateBody(seatCreateValidation), createSeat);

/**
 * @swagger
 * /seat/getSeats:
 *   get:
 *     summary: Barcha o'rindiqlar ro'yxatini olish
 *     tags: [Seats]
 *     responses:
 *       "200":
 *         description: Ro'yxat olindi
 *       "500":
 *         description: Server xatosi
 */
seat.get("/getSeats", getSeats);

/**
 * @swagger
 * /seat/getSeat/{id}:
 *   get:
 *     summary: ID bo'yicha o'rindiqni olish
 *     tags: [Seats]
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
seat.get("/getSeat/:id", getSeatBy);

/**
 * @swagger
 * /seat/updateSeat/{id}:
 *   put:
 *     summary: O'rindiq ma'lumotlarini yangilash
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: integer
 *                 example: 3
 *               row_number:
 *                 type: integer
 *                 example: 15
 *               number:
 *                 type: integer
 *                 example: 56
 *               seat_type_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259b3"
 *     responses:
 *       "200":
 *         description: O'rindiq yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
seat.put("/updateSeat/:id", validateBody(seatUpdateValidation), updateSeat);

/**
 * @swagger
 * /seat/deleteSeat/{id}:
 *   delete:
 *     summary: O'rindiqni o'chirish
 *     tags: [Seats]
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
seat.delete("/deleteSeat/:id", deleteSeat);

module.exports = { seatRoute: seat };