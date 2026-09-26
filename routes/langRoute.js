const { Router } = require("express");
const langRoute = Router();

const {
    createLang,
    getLangs,
    getLangById,
    searchLang,
    updateLang,
    deleteLang
} = require("../controllers/lang.controller");

const {
    createLangSchema,
    updateLangSchema
} = require("../validation/langValidation");

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
 *   name: Langs
 *   description: Tillar API tizimi
 */

/**
 * @swagger
 * /lang/addLang:
 *   post:
 *     summary: Yangi til qo'shish
 *     tags: [Langs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "O'zbekcha"
 *     responses:
 *       "201":
 *         description: Til muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
langRoute.post("/addLang", validationSchema(createLangSchema), createLang);

/**
 * @swagger
 * /lang/getLangs:
 *   get:
 *     summary: Barcha tillarni olish
 *     tags: [Langs]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
langRoute.get("/getLangs", getLangs);

/**
 * @swagger
 * /lang/getLang/{id}:
 *   get:
 *     summary: ID bo'yicha til ma'lumotlarini olish
 *     tags: [Langs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Til topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
langRoute.get("/getLang/:id", getLangById);

/**
 * @swagger
 * /lang/searchLang:
 *   get:
 *     summary: Nom bo'yicha tillarni qidirish
 *     tags: [Langs]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Til nomi
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
langRoute.get("/searchLang", searchLang);

/**
 * @swagger
 * /lang/updateLang/{id}:
 *   put:
 *     summary: Til ma'lumotlarini yangilash
 *     tags: [Langs]
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
 *                 example: "Ruscha"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
langRoute.put("/updateLang/:id", validationSchema(updateLangSchema), updateLang);

/**
 * @swagger
 * /lang/deleteLang/{id}:
 *   delete:
 *     summary: Tilni o'chirish
 *     tags: [Langs]
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
langRoute.delete("/deleteLang/:id", deleteLang);

module.exports = { langRoute };
