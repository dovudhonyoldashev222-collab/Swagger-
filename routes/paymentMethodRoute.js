const { Router } = require("express");
const paymentMethodRoute = Router();

const {
    createPaymentMethod,
    getPaymentMethods,
    getPaymentMethodById,
    searchPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
} = require("../controllers/payment_method.controller");

const {
    createPaymentMethodSchema,
    updatePaymentMethodSchema
} = require("../validation/paymentMethodValidation");

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
 *   name: PaymentMethods
 *   description: To'lov usullarini boshqarish API
 */

/**
 * @swagger
 * /payment_methods/addPaymentMethod:
 *   post:
 *     summary: Yangi to'lov usuli qo'shish
 *     tags: [PaymentMethods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Naqd pul"
 *     responses:
 *       201:
 *         description: To'lov usuli qo'shildi
 *       400:
 *         description: Validatsiya xatosi
 */
paymentMethodRoute.post("/addPaymentMethod", validationSchema(createPaymentMethodSchema), createPaymentMethod);

/**
 * @swagger
 * /payment_methods/getPaymentMethods:
 *   get:
 *     summary: Barcha to'lov usullarini olish
 *     tags: [PaymentMethods]
 *     responses:
 *       200:
 *         description: To'lov usullari ro'yxati
 */
paymentMethodRoute.get("/getPaymentMethods", getPaymentMethods);

/**
 * @swagger
 * /payment_methods/getPaymentMethod/{id}:
 *   get:
 *     summary: ID bo'yicha to'lov usulini olish
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: To'lov usuli topildi
 *       404:
 *         description: Topilmadi
 */
paymentMethodRoute.get("/getPaymentMethod/:id", getPaymentMethodById);

/**
 * @swagger
 * /payment_methods/searchPaymentMethod:
 *   get:
 *     summary: To'lov usulini qidirish
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
paymentMethodRoute.get("/searchPaymentMethod", searchPaymentMethod);

/**
 * @swagger
 * /payment_methods/updatePaymentMethod/{id}:
 *   put:
 *     summary: To'lov usulini yangilash
 *     tags: [PaymentMethods]
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
 *     responses:
 *       200:
 *         description: Yangilandi
 *       404:
 *         description: Topilmadi
 */
paymentMethodRoute.put("/updatePaymentMethod/:id", validationSchema(updatePaymentMethodSchema), updatePaymentMethod);

/**
 * @swagger
 * /payment_methods/deletePaymentMethod/{id}:
 *   delete:
 *     summary: To'lov usulini o'chirish
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: O'chirildi
 *       404:
 *         description: Topilmadi
 */
paymentMethodRoute.delete("/deletePaymentMethod/:id", deletePaymentMethod);

module.exports = { paymentMethodRoute };
