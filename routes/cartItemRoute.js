const { Router } = require("express");
const cartItemRoute = Router();

const {
    createCartItem,
    getCartItems,
    getCartItemById,
    searchCartItem,
    updateCartItem,
    deleteCartItem
} = require("../controllers/cart._item.controller");

const {
    createCartItemSchema,
    updateCartItemSchema
} = require("../validation/cartItemValidation");

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
 *   name: CartItems
 *   description: Savatdagi elementlar API
 */

/**
 * @swagger
 * /cart_item/addCartItem:
 *   post:
 *     summary: Savatga yangi element qo'shish
 *     tags: [CartItems]
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
 *               cart_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259b2"
 *     responses:
 *       "201":
 *         description: Element savatga muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi yoki element allaqachon mavjud
 *       "500":
 *         description: Server xatosi
 */
cartItemRoute.post("/addCartItem", validationSchema(createCartItemSchema), createCartItem);

/**
 * @swagger
 * /cart_item/getCartItems:
 *   get:
 *     summary: Barcha savat elementlarini olish
 *     tags: [CartItems]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
cartItemRoute.get("/getCartItems", getCartItems);

/**
 * @swagger
 * /cart_item/getCartItem/{id}:
 *   get:
 *     summary: ID bo'yicha savat elementini olish
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Savat elementi topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
cartItemRoute.get("/getCartItem/:id", getCartItemById);

/**
 * @swagger
 * /cart_item/searchCartItem:
 *   get:
 *     summary: Savat ID si bo'yicha elementlarni qidirish
 *     tags: [CartItems]
 *     parameters:
 *       - in: query
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: Savat ID si
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: cartId parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
cartItemRoute.get("/searchCartItem", searchCartItem);

/**
 * @swagger
 * /cart_item/updateCartItem/{id}:
 *   put:
 *     summary: Savat elementini yangilash
 *     tags: [CartItems]
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
 *               ticket_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259c1"
 *               cart_id:
 *                 type: string
 *                 example: "64ac8f23d7c9b6aa695259b2"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
cartItemRoute.put("/updateCartItem/:id", validationSchema(updateCartItemSchema), updateCartItem);

/**
 * @swagger
 * /cart_item/deleteCartItem/{id}:
 *   delete:
 *     summary: Savat elementini o'chirish
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Element o'chirildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
cartItemRoute.delete("/deleteCartItem/:id", deleteCartItem);

module.exports = { cartItemRoute };
