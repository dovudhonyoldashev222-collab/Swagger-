const { Router } = require("express");
const customerAddressRoute = Router();

const {
    createAddress,
    getAddresses,
    getAddressBy,
    searchAddress,
    updateAddress,
    deleteAddress
} = require("../controllers/customerAddress.controller");

const {
    addressCreateValidation,
    addressUpdateValidation
} = require("../validation/customerAddressValidation");

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
 *   name: CustomerAddresses
 *   description: Mijoz manzillari API tizimi
 */

/**
 * @swagger
 * /customer_address/addAddress:
 *   post:
 *     summary: Mijozga yangi manzil qo'shish
 *     tags: [CustomerAddresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: "6ab2bcbda4224cff0ab3c0f5"
 *               name:
 *                 type: string
 *                 example: "Uy manzili"
 *               country_id:
 *                 type: number
 *                 example: 1
 *               region_id:
 *                 type: number
 *                 example: 1
 *               district_id:
 *                 type: number
 *                 example: 5
 *               street:
 *                 type: string
 *                 example: "Afrosiyob ko'chasi"
 *               house:
 *                 type: string
 *                 example: "12A"
 *               flat:
 *                 type: number
 *                 example: 45
 *               location:
 *                 type: string
 *                 example: "41.3031, 69.2671"
 *               post_index:
 *                 type: string
 *                 example: "100000"
 *               info:
 *                 type: string
 *                 example: "3-qavat"
 *     responses:
 *       "201":
 *         description: Manzil muvaffaqiyatli qo'shildi
 *       "400":
 *         description: Validatsiya xatosi yoki manzil allaqachon mavjud
 *       "500":
 *         description: Server xatosi
 */
customerAddressRoute.post("/addAddress", validationSchema(addressCreateValidation), createAddress);

/**
 * @swagger
 * /customer_address/getAddresses:
 *   get:
 *     summary: Barcha mijoz manzillarini olish
 *     tags: [CustomerAddresses]
 *     responses:
 *       "200":
 *         description: Ro'yxat muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Server xatosi
 */
customerAddressRoute.get("/getAddresses", getAddresses);

/**
 * @swagger
 * /customer_address/getAddress/{id}:
 *   get:
 *     summary: ID bo'yicha manzil ma'lumotlarini olish
 *     tags: [CustomerAddresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Manzil topildi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
customerAddressRoute.get("/getAddress/:id", getAddressBy);

/**
 * @swagger
 * /customer_address/searchAddress:
 *   get:
 *     summary: Mijoz ID si bo'yicha manzillarni qidirish
 *     tags: [CustomerAddresses]
 *     parameters:
 *       - in: query
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Mijoz ID si
 *     responses:
 *       "200":
 *         description: Qidiruv natijalari
 *       "400":
 *         description: customerId parametri ko'rsatilmagan
 *       "500":
 *         description: Server xatosi
 */
customerAddressRoute.get("/searchAddress", searchAddress);

/**
 * @swagger
 * /customer_address/updateAddress/{id}:
 *   put:
 *     summary: Manzil ma'lumotlarini yangilash
 *     tags: [CustomerAddresses]
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
 *                 example: "Ish manzili"
 *               country_id:
 *                 type: number
 *                 example: 1
 *               region_id:
 *                 type: number
 *                 example: 2
 *               district_id:
 *                 type: number
 *                 example: 3
 *               street:
 *                 type: string
 *                 example: "Amir Temur ko'chasi"
 *               house:
 *                 type: string
 *                 example: "1"
 *               flat:
 *                 type: number
 *                 example: 10
 *               location:
 *                 type: string
 *                 example: "41.3100, 69.2800"
 *               post_index:
 *                 type: string
 *                 example: "100001"
 *               info:
 *                 type: string
 *                 example: "Ofis"
 *     responses:
 *       "200":
 *         description: Muvaffaqiyatli yangilandi
 *       "404":
 *         description: Topilmadi
 *       "500":
 *         description: Server xatosi
 */
customerAddressRoute.put("/updateAddress/:id", validationSchema(addressUpdateValidation), updateAddress);

/**
 * @swagger
 * /customer_address/deleteAddress/{id}:
 *   delete:
 *     summary: Manzilni o'chirish
 *     tags: [CustomerAddresses]
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
customerAddressRoute.delete("/deleteAddress/:id", deleteAddress);

module.exports = { customerAddressRoute };
