const {Router} = require("express")
const booking = Router()

const {addBooking, getBookings, getBookingBy, updateBooking, deleteBooking} = require("../controllers/booking.controller")

const validationSchema = (schema) => (req,res,next) => {
    const validationResult = schema.validate(req.body)
    if(validationResult.error){
        return res.status(400).send(validationResult.error.details[0].message)
    }
    next()
}

const {
    bookingCreateValidation,
    bookingUpdateValidation
} = require("../validation/bookingValidation")

/**
 * @swagger
 * tags: 
 *   name: Booking
 *   description: Buyurtmalarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /booking/addBooking:
 *   post: 
 *     summary: Yangi buyurtmani yuborish
 *     tags: [Booking]
 *     description: Yangi buyurtmani yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *                 description: cart id
 *               payment_method_id:
 *                 type: number
 *                 description:  payment id
 *               delivery_method_id:
 *                 type: number
 *                 description: delivery id
 *               discount_coupon_id:
 *                 type: number
 *                 description: coupon id 
 *               status_id:
 *                 type: number
 *                 description: status id 
 *     responses:
 *       "201":
 *         description: Buyurtma muvaffaqaqiyatli yaratildi
 *       "400":
 *         description: Validatsiya xatosi 
 *       "500":
 *         description: Ichki server xatosi 
*/
booking.post("/addBooking", validationSchema(bookingCreateValidation), addBooking)

/**
 * @swagger 
 * /booking/getBookings:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Booking]
 *     description: Barcha buyurtmalar ro'yxatini olish
 *     responses:
 *       "200":
 *         description: Buyurtmalar ro'yxati muvaffaqiyatli qaytarildi
 *       "500":
 *         description: Ichki server xatosi
 */
booking.get("/getBookings", getBookings)

/**
 * @swagger
 * /booking/getBookingBy/{id}:
 *   get: 
 *     summary: Buyurtmani ID bo'yicha olish
 *     tags: [Booking]
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         required: true 
 *         schema:  
 *           type: string  
 *     responses: 
 *       "200":  
 *         description: Buyurtma muvaffaqiyatli olindi   
 *       "404":  
 *         description: Buyurtma topilmadi   
 *       "500":   
 *         description: Server xatosi   
 */
booking.get("/getBookingBy/:id", getBookingBy)

/**
 * @swagger
 * /booking/updateBooking/{id}:
 *   put:
 *     summary: Buyurtmani yangilash
 *     tags: [Booking] 
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
 *               cart_id:  
 *                 type: string  
 *               payment_method_id:  
 *                 type: number  
 *               delivery_method_id:  
 *                 type: number  
 *               discount_coupon_id:  
 *                 type: number  
 *               status_id:  
 *                 type: number  
 *     responses:  
 *       "200":
 *         description: Buyurtma muvaffaqaqiyatli yangilandi
 *       "404":
 *         description: Buyurtma topilmadi
 *       "500":
 *         description: Server xatosi
*/
booking.put("/updateBooking/:id", validationSchema(bookingUpdateValidation), updateBooking)

/**
 * @swagger
 * /booking/deleteBooking/{id}:
 *   delete:
 *     summary: Buyurtmani o'chirish
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       "200":
 *         description: Buyurtma muvaffaqiyatli o'chirildi  
 *       "404":
 *         description: Buyurtma topilmadi  
 *       "500":
 *         description: Server xatosi  
 */
booking.delete("/deleteBooking/:id", deleteBooking)

module.exports = { bookingRoute: booking }