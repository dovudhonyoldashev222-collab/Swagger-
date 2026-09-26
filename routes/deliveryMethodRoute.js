const { Router } = require("express");
const deliveryMethodRoute = Router();

const {
    createDeliveryMethod,
    getDeliveryMethods,
    getDeliveryMethodById,
    searchDeliveryMethod,
    updateDeliveryMethod,
    deleteDeliveryMethod
} = require("../controllers/delivery_method.controller");

const {
    createDeliveryMethodSchema,
    updateDeliveryMethodSchema
} = require("../validation/deliveryMethodValidation");

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
 *   name: DeliveryMethods
 *   description: Yetkazib berish usullari API tizimi
 */

/**
 * @swagger
 * /delivery_methods/addDeliveryMethod:
 *   post:
 *     summary: Yangi yetkazib berish usuli qo'shish
 *     tags: [DeliveryMethods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Kuryer orqali"
 *     responses:
 *       "201":
 *         description: Usul muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi
 *       "500":
 *         description: Server xatosi
 */
deliveryMethodRoute.post("/addDeliveryMethod", validationSchema(createDeliveryMethodSchema), createDeliveryMethod);

/**
 * @swagger
 * /delivery_methods/getDeliveryMethods:
 *   get:
 *     summary: Barcha yetkazib berish usullarini olish
 *     tags: [DeliveryMethods]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
deliveryMethodRoute.get("/getDeliveryMethods", getDeliveryMethods);

/**
 * @swagger
 * /delivery_methods/getDeliveryMethod/{id}:
 *   get:
 *     summary: ID bo'yicha usul ma'lumotlarini olish
 *     tags: [DeliveryMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Usul topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
deliveryMethodRoute.get("/getDeliveryMethod/:id", getDeliveryMethodById);

/**
 * @swagger
 * /delivery_methods/searchDeliveryMethod:
 *   get:
 *     summary: Nom bo'yicha usullarni qidirish
 *     tags: [DeliveryMethods]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Usul nomi
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: name parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
deliveryMethodRoute.get("/searchDeliveryMethod", searchDeliveryMethod);

/**
 * @swagger
 * /delivery_methods/updateDeliveryMethod/{id}:
 *   put:
 *     summary: Yetkazib berish usulini yangilash
 *     tags: [DeliveryMethods]
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
 *                 example: "Olib ketish"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
deliveryMethodRoute.put("/updateDeliveryMethod/:id", validationSchema(updateDeliveryMethodSchema), updateDeliveryMethod);

/**
 * @swagger
 * /delivery_methods/deleteDeliveryMethod/{id}:
 *   delete:
 *     summary: Usulni o'chirish
 *     tags: [DeliveryMethods]
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
deliveryMethodRoute.delete("/deleteDeliveryMethod/:id", deleteDeliveryMethod);

module.exports = { deliveryMethodRoute };
