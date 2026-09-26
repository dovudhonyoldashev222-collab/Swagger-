const { Router } = require("express");
const cartRouter = Router();

const {
    createCart,
    getCarts,
    getCartBy,
    updateCart,
    deleteCart
} = require("../controllers/cart.controller");

const {
    cartCreateValidation,
    cartUpdateValidation
} = require("../validation/cartValidation");

const validateBody = (schema) => (req, res, next) => {
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details[0].message);
        }
        next();
    };


/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Savatchani boshqarish API tizimi
 */

/**
 * @swagger
 * /carts/addCart:
 *   post:
 *     summary: Yangi savatcha yaratish
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259c1"
 *               customer_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259b2"
 *               status_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       "201":
 *         description: Savatcha muvaffaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi
 */
cartRouter.post("/addCart", validateBody(cartCreateValidation), createCart);

/**
 * @swagger
 * /carts/getCarts:
 *   get:
 *     summary: Barcha savatchalarni olish
 *     tags: [Carts]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
cartRouter.get("/getCarts", getCarts);

/**
 * @swagger
 * /carts/getCart/{id}:
 *   get:
 *     summary: ID bo'yicha savatchani olish
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Savatcha topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: server xatosi
 */
cartRouter.get("/getCart/:id", getCartBy);

/**
 * @swagger
 * /carts/updateCart/{id}:
 *   put:
 *     summary: Savatchani yangilash
 *     tags: [Carts]
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
 *               status_id:
 *                 type: integer
 *               fineshedAt:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
cartRouter.put("/updateCart/:id", validateBody(cartUpdateValidation), updateCart);

/**
 * @swagger
 * /carts/deleteCart/{id}:
 *   delete:
 *     summary: Savatchani o'chirish
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Savatcha o'chirildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
cartRouter.delete("/deleteCart/:id", deleteCart);

module.exports = { cartRoute: cartRouter };