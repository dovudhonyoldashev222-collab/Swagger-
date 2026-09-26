const { Router } = require("express");
const event = Router();

const {
    createEvent,
    getEvents,
    getEventBy,
    updateEvent,
    deleteEvent
} = require("../controllers/event.controller");

const {
    eventCreateValidation,
    eventUpdateValidation
} = require("../validation/eventValidation");

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
 *   name: Events
 *   description: Tadbirlarni boshqarish API tizimi
 */

/**
 * @swagger
 * /events/addEvent:
 *   post:
 *     summary: Yangi tadbir yaratish
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Konsert dasturi"
 *               photo:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               start_date:
 *                 type: string
 *                 example: "2026-08-20"
 *               start_time:
 *                 type: string
 *                 example: "19:00"
 *               finish_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-20"
 *               finish_time:
 *                 type: string
 *                 example: "22:00"
 *               info:
 *                 type: string
 *                 example: "Eng ajoyib yil konserti"
 *               event_type_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259a1"
 *               human_category_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259b2"
 *               venue_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259c3"
 *               lang_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       "201":
 *         description: Tadbir yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
event.post("/addEvent", validationSchema(eventCreateValidation), createEvent);

/**
 * @swagger
 * /events/getEvents:
 *   get:
 *     summary: Barcha tadbirlarni olish
 *     tags: [Events]
 *     responses:
 *       "200":
 *         description: Tadbirlar ro'xai olindii
 *       "500":
 *         description: Server xatosi
 */
event.get("/getEvents", getEvents);

/**
 * @swagger
 * /events/getEvent/{id}:
 *   get:
 *     summary: ID bo'yicha tadbirni olish
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Tadbir topildi
 *       "404":
 *         description: Tadbir Topilmadi
 *       "500":
 *         description: Server xatosi
 */
event.get("/getEvent/:id", getEventBy);

/**
 * @swagger
 * /events/updateEvent/{id}:
 *   put:
 *     summary: Tadbirni yangilash
 *     tags: [Events]
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
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *               start_time:
 *                 type: string
 *                 example: "19:00"
 *               finish_date:
 *                 type: string
 *                 format: date
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: integer
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description:  tadbir topilmadi
 *       "500":
 *         description: Server xatosi
 */
event.put("/updateEvent/:id", validationSchema(eventUpdateValidation), updateEvent);

/**
 * @swagger
 * /events/deleteEvent/{id}:
 *   delete:
 *     summary: Tadbirni o'chirish
 *     tags: [Events]
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
 *         description: Tadbir topilmadi
 *       "500":
 *         description: Server xatosi
 */
event.delete("/deleteEvent/:id", deleteEvent);

module.exports = { eventRoute: event };