const { Router } = require("express");
const venue = Router();

const {
    createVenue,
    getVenues,
    getVenueById,
    updateVenue,
    deleteVenue
} = require("../controllers/venue.controller");

const {
    venueCreateValidation,
    venueUpdateValidation
} = require("../validation/venueValidation");


const validateBody = (schema) => {
    return (req, res, next) => {
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
};

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: O'tkazilish joylarini boshqarish API tizimi
 */

/**
 * @swagger
 * /venue/addVenue:
 *   post:
 *     summary: Yangi o'tkazilish joyini yaratish
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Humo Arena"
 *               address:
 *                 type: string
 *                 example: "Toshkent sh., Afrosiyob ko'chasi"
 *               location:
 *                 type: string
 *                 example: "41.3031, 69.2671"
 *               site:
 *                 type: string
 *                 example: "https://humoarena.uz"
 *               phone:
 *                 type: string
 *                 example: "+998712000000"
 *               venue_type_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259a1"
 *               schema:
 *                 type: string
 *                 example: "Polygon..."
 *               region_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       "201":
 *         description: Joy muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
venue.post("/addVenue", validateBody(venueCreateValidation), createVenue);

/**
 * @swagger
 * /venue/getVenues:
 *   get:
 *     summary: Barcha o'tkazilish joylarini olish
 *     tags: [Venues]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
venue.get("/getVenues", getVenues);

/**
 * @swagger
 * /venue/getVenue/{id}:
 *   get:
 *     summary: ID bo'yicha joyni olish
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Joy topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
venue.get("/getVenue/:id", getVenueById);

/**
 * @swagger
 * /venue/updateVenue/{id}:
 *   put:
 *     summary: Joy ma'lumotlarini yangilash
 *     tags: [Venues]
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
 *                 example: "Yangi Humo Arena nomi"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Joy topilmadi
 *       "500":
 *         description: Server xatosi
 */
venue.put("/updateVenue/:id", validateBody(venueUpdateValidation), updateVenue);

/**
 * @swagger
 * /venue/deleteVenue/{id}:
 *   delete:
 *     summary: Joyni o'chirish
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Joy muvaffaqiyatli o'chirildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
venue.delete("/deleteVenue/:id", deleteVenue);

module.exports = { venueRoute: venue };