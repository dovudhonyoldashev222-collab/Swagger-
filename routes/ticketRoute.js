const { Router } = require("express");
const ticket = Router();

const {
    createTicket,
    getTickets,
    getTicketBy,
    updateTicket,
    deleteTicket
} = require("../controllers/ticket.controller");

const {
    ticketCreateValidation,
    ticketUpdateValidation
} = require("../validation/ticketValidation");

const validationSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }
    next();
};

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Chiptalarni boshqarish API tizimi
 */

/**
 * @swagger
 * /tickets/addTicket:
 *   post:
 *     summary: Yangi chipta yaratish
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *                 example: "6ab76977388a369ff38527f5"
 *               seat_id:
 *                 type: string
 *                 example: "6ab76b9e388a369ff38527f6"
 *               price:
 *                 type: number
 *                 example: 150000
 *               service_fee:
 *                 type: number
 *                 example: 5000
 *               status_id:
 *                 type: string
 *                 example: "6ab76ca5388a369ff38527f7"
 *               ticket_type:
 *                 type: string
 *                 example: "6ab76ca5388a369ff38527f7"
 *     responses:
 *       "201":
 *         description: Chipta muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
ticket.post("/addTicket", validationSchema(ticketCreateValidation), createTicket);

/**
 * @swagger
 * /tickets/getTickets:
 *   get:
 *     summary: Barcha chiptalarni olish
 *     tags: [Tickets]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
ticket.get("/getTickets", getTickets);

/**
 * @swagger
 * /tickets/getTicket/{id}:
 *   get:
 *     summary: ID bo'yicha chiptani olish
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Chipta topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
ticket.get("/getTicket/:id", getTicketBy);

/**
 * @swagger
 * /tickets/updateTicket/{id}:
 *   put:
 *     summary: Chiptani yangilash
 *     tags: [Tickets]
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
 *               price:
 *                 type: number
 *                 example: 180000
 *               service_fee:
 *                 type: number
 *                 example: 7000
 *               status_id:
 *                 type: string
 *                 example: "6ab76ca5388a369ff38527f7"
 *               ticket_type:
 *                 type: string
 *                 example: "6ab76ca5388a369ff38527f7"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
ticket.put("/updateTicket/:id", validationSchema(ticketUpdateValidation), updateTicket);

/**
 * @swagger
 * /tickets/deleteTicket/{id}:
 *   delete:
 *     summary: Chiptani o'chirish
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Chipta o'chirildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
ticket.delete("/deleteTicket/:id", deleteTicket);

module.exports = { ticketRoute: ticket };