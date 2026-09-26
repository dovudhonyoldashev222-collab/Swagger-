const { Router } = require("express");
const districtRoute = Router();

const {
    createDistrict,
    getDistricts,
    getDistrictById,
    searchDistrict,
    updateDistrict,
    deleteDistrict
} = require("../controllers/district.controller");

const {
    createDistrictSchema,
    updateDistrictSchema
} = require("../validation/districtValidation");

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
 *   name: Districts
 *   description: Tumanlar API tizimi
 */

/**
 * @swagger
 * /district/addDistrict:
 *   post:
 *     summary: Yangi tuman qo'shish
 *     tags: [Districts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Yunusobod tumani"
 *               regionId:
 *                 type: string
 *                 example: "6ab2b809384add457f77ba70"
 *     responses:
 *       "201":
 *         description: Tuman muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
districtRoute.post("/addDistrict", validationSchema(createDistrictSchema), createDistrict);

/**
 * @swagger
 * /district/getDistricts:
 *   get:
 *     summary: Barcha tumanlarni olish
 *     tags: [Districts]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
districtRoute.get("/getDistricts", getDistricts);

/**
 * @swagger
 * /district/getDistrict/{id}:
 *   get:
 *     summary: ID bo'yicha tuman ma'lumotlarini olish
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Tuman topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
districtRoute.get("/getDistrict/:id", getDistrictById);

/**
 * @swagger
 * /district/searchDistrict:
 *   get:
 *     summary: Nom bo'yicha tumanlarni qidirish
 *     tags: [Districts]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Tuman nomi
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
districtRoute.get("/searchDistrict", searchDistrict);

/**
 * @swagger
 * /district/updateDistrict/{id}:
 *   put:
 *     summary: Tuman ma'lumotlarini yangilash
 *     tags: [Districts]
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
 *                 example: "Mirzo Ulug'bek tumani"
 *               regionId:
 *                 type: string
 *                 example: "6ab2b809384add457f77ba70"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
districtRoute.put("/updateDistrict/:id", validationSchema(updateDistrictSchema), updateDistrict);

/**
 * @swagger
 * /district/deleteDistrict/{id}:
 *   delete:
 *     summary: Tumanni o'chirish
 *     tags: [Districts]
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
districtRoute.delete("/deleteDistrict/:id", deleteDistrict);

module.exports = { districtRoute };
