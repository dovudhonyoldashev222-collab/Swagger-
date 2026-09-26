const { Router } = require("express");
const humanCategoryRoute = Router();

const {
    createHumanCategory,
    getHumanCategories,
    getHumanCategoryById,
    searchHumanCategory,
    updateHumanCategory,
    deleteHumanCategory
} = require("../controllers/human_category.controller");

const {
    createHumanCategorySchema,
    updateHumanCategorySchema
} = require("../validation/humanCategoryValidation");

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
 *   name: HumanCategories
 *   description: Yosh / Inson toifalari API tizimi
 */

/**
 * @swagger
 * /human_category/addHumanCategory:
 *   post:
 *     summary: Yangi inson toifasini qo'shish
 *     tags: [HumanCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bolalar"
 *               start_age:
 *                 type: number
 *                 example: 0
 *               finish_age:
 *                 type: number
 *                 example: 12
 *               gender:
 *                 type: string
 *                 example: "male"
 *     responses:
 *       "201":
 *         description: Toifa muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
humanCategoryRoute.post("/addHumanCategory", validationSchema(createHumanCategorySchema), createHumanCategory);

/**
 * @swagger
 * /human_category/getHumanCategories:
 *   get:
 *     summary: Barcha inson toifalarini olish
 *     tags: [HumanCategories]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
humanCategoryRoute.get("/getHumanCategories", getHumanCategories);

/**
 * @swagger
 * /human_category/getHumanCategory/{id}:
 *   get:
 *     summary: ID bo'yicha toifa ma'lumotlarini olish
 *     tags: [HumanCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Toifa topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
humanCategoryRoute.get("/getHumanCategory/:id", getHumanCategoryById);

/**
 * @swagger
 * /human_category/searchHumanCategory:
 *   get:
 *     summary: Nom bo'yicha toifalarni qidirish
 *     tags: [HumanCategories]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Toifa nomi
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
humanCategoryRoute.get("/searchHumanCategory", searchHumanCategory);

/**
 * @swagger
 * /human_category/updateHumanCategory/{id}:
 *   put:
 *     summary: Inson toifasini yangilash
 *     tags: [HumanCategories]
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
 *                 example: "Katta yoshdagi bolalar"
 *               start_age:
 *                 type: number
 *                 example: 7
 *               finish_age:
 *                 type: number
 *                 example: 18
 *               gender:
 *                 type: string
 *                 example: "female"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
humanCategoryRoute.put("/updateHumanCategory/:id", validationSchema(updateHumanCategorySchema), updateHumanCategory);

/**
 * @swagger
 * /human_category/deleteHumanCategory/{id}:
 *   delete:
 *     summary: Toifani o'chirish
 *     tags: [HumanCategories]
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
humanCategoryRoute.delete("/deleteHumanCategory/:id", deleteHumanCategory);

module.exports = { humanCategoryRoute };
