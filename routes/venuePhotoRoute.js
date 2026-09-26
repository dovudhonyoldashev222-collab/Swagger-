const { Router } = require("express");
const venuePhoto = Router();

const {
    createVenuePhoto,
    getVenuePhotos,
    getVenuePhotoBy,
    searchVenuePhoto,
    updateVenuePhoto,
    deleteVenuePhoto
} = require("../controllers/venuePhoto.controller");

const { venuePhotoCreateValidation, venuePhotoUpdateValidation } = require("../validation/venuePhotoValidation");

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
 *   name: VenuePhotos
 *   description: Joy rasmlari API tizimi
 */

/**
 * @swagger
 * /venuePhoto/addVenuePhoto:
 *   post:
 *     summary: Joyga yangi rasm qo'shish
 *     tags: [VenuePhotos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venue_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259a1"
 *               url:
 *                 type: string
 *                 example: "https://www.afisha.uz/ru/places/humo-arena"
 *     responses:
 *       "201":
 *         description: Rasm qo'shildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server satosi
 */
venuePhoto.post("/addVenuePhoto", validateBody(venuePhotoCreateValidation), createVenuePhoto);

/**
 * @swagger
 * /venuePhoto/getVenuePhotos:
 *   get:
 *     summary: Barcha joy rasmlarini olish
 *     tags: [VenuePhotos]
 *     responses:
 *       "200":
 *         description: Ro'yxat olindi
 *       "500":
 *         description: Server xatosi
 */
venuePhoto.get("/getVenuePhotos", getVenuePhotos);

/**
 * @swagger
 * /venuePhoto/getVenuePhoto/{id}:
 *   get:
 *     summary: ID bo'yicha rasmni olish
 *     tags: [VenuePhotos]
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
venuePhoto.get("/getVenuePhoto/:id", getVenuePhotoBy);

/**
 * @swagger
 * /venuePhoto/searchVenuePhoto:
 *   get:
 *     summary: Joy ID si bo'yicha rasmlarni qidirish
 *     tags: [VenuePhotos]
 *     parameters:
 *       - in: query
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *         description: Joy ID si
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: venueId parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
venuePhoto.get("/searchVenuePhoto", searchVenuePhoto);

/**
 * @swagger
 * /venuePhoto/updateVenuePhoto/{id}:
 *   put:
 *     summary: Rasm ma'lumotlarini yangilash
 *     tags: [VenuePhotos]
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
 *               venue_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259a1"
 *               url:
 *                 type: string
 *                 example: "https://uzbekistan.travel/it/o/humo-arena/"
 *     responses:
 *       "200":
 *         description: Yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
venuePhoto.put("/updateVenuePhoto/:id", validateBody(venuePhotoUpdateValidation), updateVenuePhoto);

/**
 * @swagger
 * /venuePhoto/deleteVenuePhoto/{id}:
 *   delete:
 *     summary: Rasmni tizimdan o'chirish
 *     tags: [VenuePhotos]
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
venuePhoto.delete("/deleteVenuePhoto/:id", deleteVenuePhoto);

module.exports = { venuePhotoRoute: venuePhoto };