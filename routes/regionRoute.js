const { Router } = require("express");
const regionRoute = Router();

const {
    createRegion,
    getRegions,
    getRegionById,
    searchRegion,
    updateRegion,
    deleteRegion
} = require("../controllers/region.controller");

const {
    createRegionSchema,
    updateRegionSchema
} = require("../validation/regionValidation");

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
 *   name: Regions
 *   description: Viloyatlar API tizimi
 */

/**
 * @swagger
 * /region/addRegion:
 *   post:
 *     summary: Yangi viloyat qo'shish
 *     tags: [Regions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Toshkent viloyati"
 *     responses:
 *       "201":
 *         description: Viloyat muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
regionRoute.post("/addRegion", validationSchema(createRegionSchema), createRegion);

/**
 * @swagger
 * /region/getRegions:
 *   get:
 *     summary: Barcha viloyatlarni olish
 *     tags: [Regions]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
regionRoute.get("/getRegions", getRegions);

/**
 * @swagger
 * /region/getRegion/{id}:
 *   get:
 *     summary: ID bo'yicha viloyat ma'lumotlarini olish
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Viloyat topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
regionRoute.get("/getRegion/:id", getRegionById);

/**
 * @swagger
 * /region/searchRegion:
 *   get:
 *     summary: Nom bo'yicha viloyatlarni qidirish
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Viloyat nomi
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
regionRoute.get("/searchRegion", searchRegion);

/**
 * @swagger
 * /region/updateRegion/{id}:
 *   put:
 *     summary: Viloyat ma'lumotlarini yangilash
 *     tags: [Regions]
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
 *                 example: "Qo'shviloyat"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
regionRoute.put("/updateRegion/:id", validationSchema(updateRegionSchema), updateRegion);

/**
 * @swagger
 * /region/deleteRegion/{id}:
 *   delete:
 *     summary: Viloyatni o'chirish
 *     tags: [Regions]
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
regionRoute.delete("/deleteRegion/:id", deleteRegion);

module.exports = { regionRoute };
