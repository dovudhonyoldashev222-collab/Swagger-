const { Router } = require("express");
const ticketStatusRoute = Router();

const {
    createTicketStatus,
    getTicketStatuses,
    getTicketStatusById,
    searchTicketStatus,
    updateTicketStatus,
    deleteTicketStatus
} = require("../controllers/ticket_status.controller");

const {
    createTicketStatusSchema,
    updateTicketStatusSchema
} = require("../validation/ticketStatusValidation");

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
 *   name: TicketStatuses
 *   description: Chipta holatlari API tizimi
 */

/**
 * @swagger
 * /ticket_status/addTicketStatus:
 *   post:
 *     summary: Yangi chipta holati qo'shish
 *     tags: [TicketStatuses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yangi"
 *     responses:
 *       "201":
 *         description: Holat muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
ticketStatusRoute.post("/addTicketStatus", validationSchema(createTicketStatusSchema), createTicketStatus);

/**
 * @swagger
 * /ticket_status/getTicketStatuses:
 *   get:
 *     summary: Barcha chipta holatlarini olish
 *     tags: [TicketStatuses]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
ticketStatusRoute.get("/getTicketStatuses", getTicketStatuses);

/**
 * @swagger
 * /ticket_status/getTicketStatus/{id}:
 *   get:
 *     summary: ID bo'yicha chipta holatini olish
 *     tags: [TicketStatuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Holat topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
ticketStatusRoute.get("/getTicketStatus/:id", getTicketStatusById);

/**
 * @swagger
 * /ticket_status/searchTicketStatus:
 *   get:
 *     summary: Nom bo'yicha chipta holatlarini qidirish
 *     tags: [TicketStatuses]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Holat nomi
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
ticketStatusRoute.get("/searchTicketStatus", searchTicketStatus);

/**
 * @swagger
 * /ticket_status/updateTicketStatus/{id}:
 *   put:
 *     summary: Chipta holatini yangilash
 *     tags: [TicketStatuses]
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
 *                 example: "Sotilgan"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
ticketStatusRoute.put("/updateTicketStatus/:id", validationSchema(updateTicketStatusSchema), updateTicketStatus);

/**
 * @swagger
 * /ticket_status/deleteTicketStatus/{id}:
 *   delete:
 *     summary: Chipta holatini o'chirish
 *     tags: [TicketStatuses]
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
ticketStatusRoute.delete("/deleteTicketStatus/:id", deleteTicketStatus);

module.exports = { ticketStatusRoute };
