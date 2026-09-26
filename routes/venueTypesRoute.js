const { Router } = require("express");
const venueType = Router();

const {
    createVenueType,
    getVenueTypes,
    getVenueTypeBy,
    searchVenueType,
    updateVenueType,
    deleteVenueType
} = require("../controllers/venueType.controller");

const { venueTypeCreateValidation, venueTypeUpdateValidation } = require("../validation/venueTypeValidation");

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
 *   name: VenueTypes
 *   description: Joy turlari API tizimi
 */

/**
 * @swagger
 * /venueType/addVenueType:
 *   post:
 *     summary: Yangi joy turi yaratish
 *     tags: [VenueTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Stadion"
 *     responses:
 *       "201":
 *         description: Yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
venueType.post("/addVenueType", validateBody(venueTypeCreateValidation), createVenueType);

/**
 * @swagger
 * /venueType/getVenueTypes:
 *   get:
 *     summary: Barcha joy turlarini olish
 *     tags: [VenueTypes]
 *     responses:
 *       "200":
 *         description: Ro'yxat olindi
 *       "500":
 *         description: Server xatosi
 */
venueType.get("/getVenueTypes", getVenueTypes);

/**
 * @swagger
 * /venueType/getVenueType/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [VenueTypes]
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
venueType.get("/getVenueType/:id", getVenueTypeBy);

/**
 * @swagger
 * /venueType/searchVenueType:
 *   get:
 *     summary: Nom bo'yicha joy turlarini qidirish
 *     tags: [VenueTypes]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Joy turi nomi (qisman)
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
venueType.get("/searchVenueType", searchVenueType);

/**
 * @swagger
 * /venueType/updateVenueType/{id}:
 *   put:
 *     summary: Joy turini yangilash
 *     tags: [VenueTypes]
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
 *                 example: "Teatr Zali"
 *     responses:
 *       "200":
 *         description: Yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
venueType.put("/updateVenueType/:id", validateBody(venueTypeUpdateValidation), updateVenueType);

/**
 * @swagger
 * /venueType/deleteVenueType/{id}:
 *   delete:
 *     summary: Joy turini o'chirish
 *     tags: [VenueTypes]
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
venueType.delete("/deleteVenueType/:id", deleteVenueType);

module.exports = { venueTypesRoute: venueType };