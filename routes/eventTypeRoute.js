const { Router } = require("express");
const eventType = Router();

const {
    createEventType,
    getEventTypes,
    getEventTypeBy,
    updateEventType,
    deleteEventType
} = require("../controllers/eventType.controller");

const {
    eventTypeCreateValidation,
    eventTypeUpdateValidation
} = require("../validation/eventTypeValidation");

const validationSchema = (schema) => (req,res,next) => {
    const validationResult = schema.validate(req.body)
    if(validationResult.error){
        return res.status(400).send(validationResult.error.details[0].message)
    }
    next()
}

/**
 * @swagger
 * tags:
 *   name: EventTypes
 *   description: Tadbir turlarini (Kategoriyalarni) boshqarish API tizimi
 */

/**
 * @swagger
 * /eventType/addEventType:
 *   post:
 *     summary: Yangi tadbir turi/kategoriyasi yaratish
 *     tags: [EventTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Futbol Uchrashuvlari"
 *               parent_event_type_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259a1"
 *     responses:
 *       "201":
 *         description: Muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
eventType.post("/addEventType", validationSchema(eventTypeCreateValidation), createEventType);

/**
 * @swagger
 * /eventType/getEventTypes:
 *   get:
 *     summary: Barcha tadbir turlarini olish
 *     tags: [EventTypes]
 *     responses:
 *       "200":
 *         description: Ro'yxat qaytarildi
 *       "500":
 *         description: Server xatosi
 */
eventType.get("/getEventTypes", getEventTypes);

/**
 * @swagger
 * /eventType/getEventType/{id}:
 *   get:
 *     summary: ID bo'yicha tadbir turini olish
 *     tags: [EventTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Ma'lumot topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
eventType.get("/getEventType/:id", getEventTypeBy);

/**
 * @swagger
 * /eventType/updateEventType/{id}:
 *   put:
 *     summary: Tadbir turini yangilash
 *     tags: [EventTypes]
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
 *                 example: "Yangi Kategoriya nomi"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: server Xatosi
 */
eventType.put("/updateEventType/:id", validationSchema(eventTypeUpdateValidation), updateEventType);

/**
 * @swagger
 * /eventType/deleteEventType/{id}:
 *   delete:
 *     summary: Tadbir turini o'chirish
 *     tags: [EventTypes]
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
eventType.delete("/deleteEventType/:id", deleteEventType);

module.exports = { eventTypeRoute: eventType };