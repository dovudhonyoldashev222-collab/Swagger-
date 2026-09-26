const { Router } = require("express");
const typesRoute = Router();

const {
    createTypes,
    getTypes,
    getTypeById,
    searchTypes,
    updateTypes,
    deleteTypes
} = require("../controllers/types.controller");

const {
    createTypesSchema,
    updateTypesSchema
} = require("../validation/typesValidation");

const validationSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            success: false,
            message: "Validatsiya xatosi",
            error: validationResult.error.details[0].message
        });
    }
    next();
};

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Turlar API tizimi
 */

/**
 * @swagger
 * /types/addTypes:
 *   post:
 *     summary: Yangi tur qo'shish
 *     tags: [Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Oddiy"
 *     responses:
 *       "201":
 *         description: Tur muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
typesRoute.post("/addTypes", validationSchema(createTypesSchema), createTypes);

/**
 * @swagger
 * /types/getTypes:
 *   get:
 *     summary: Barcha turlarni olish
 *     tags: [Types]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
typesRoute.get("/getTypes", getTypes);

/**
 * @swagger
 * /types/getType/{id}:
 *   get:
 *     summary: ID bo'yicha tur ma'lumotlarini olish
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Tur topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
typesRoute.get("/getType/:id", getTypeById);

/**
 * @swagger
 * /types/searchTypes:
 *   get:
 *     summary: Nom bo'yicha turlarni qidirish
 *     tags: [Types]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Tur nomi
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
typesRoute.get("/searchTypes", searchTypes);

/**
 * @swagger
 * /types/updateTypes/{id}:
 *   put:
 *     summary: Tur ma'lumotlarini yangilash
 *     tags: [Types]
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
 *                 example: "Premium"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
typesRoute.put("/updateTypes/:id", validationSchema(updateTypesSchema), updateTypes);

/**
 * @swagger
 * /types/deleteTypes/{id}:
 *   delete:
 *     summary: Turni o'chirish
 *     tags: [Types]
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
typesRoute.delete("/deleteTypes/:id", deleteTypes);

module.exports = { typesRoute };
