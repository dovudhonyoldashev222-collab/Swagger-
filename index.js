const express = require("express");
const { connect } = require("mongoose"); 
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Har qanday eksport formatini avtomatik to'g'ri o'qiydigan yordamchi funksiya
const getRoute = (mod, routeName) => {
    if (typeof mod === "function") return mod;
    if (mod && typeof mod === "object") {
        for (const key of Object.keys(mod)) {
            if (typeof mod[key] === "function") return mod[key];
        }
    }
    console.error(`\x1b[31mXATOLIK: "${routeName}" faylidan router topilmadi yoki undefined!\x1b[0m`);
    return (req, res, next) => next();
};

// Routelarni import qilish
const adminRoute = getRoute(require("./routes/adminRoute"), "adminRoute");
const paymentMethodRoute = getRoute(require("./routes/paymentMethodRoute"), "paymentMethodRoute");
const deliveryMethodRoute = getRoute(require("./routes/deliveryMethodRoute"), "deliveryMethodRoute");
const regionRoute = getRoute(require("./routes/regionRoute"), "regionRoute");
const districtRoute = getRoute(require("./routes/districtRoute"), "districtRoute");
const langRoute = getRoute(require("./routes/langRoute"), "langRoute");
const humanCategoryRoute = getRoute(require("./routes/humanCategoryRoute"), "humanCategoryRoute");
const eventTypeRoute = getRoute(require("./routes/eventTypeRoute"), "eventTypeRoute");
const typesRoute = getRoute(require("./routes/typesRoute"), "typesRoute");
const venueRoute = getRoute(require("./routes/venueRoute"), "venueRoute");
const venueTypesRoute = getRoute(require("./routes/venueTypesRoute"), "venueTypesRoute");
const venuePhotoRoute = getRoute(require("./routes/venuePhotoRoute"), "venuePhotoRoute");
const seatTypeRoute = getRoute(require("./routes/seatTypeRoute"), "seatTypeRoute");
const seatRoute = getRoute(require("./routes/seatRoute"), "seatRoute");
const ticketStatusRoute = getRoute(require("./routes/ticketStatusRoute"), "ticketStatusRoute");
const customerRoute = getRoute(require("./routes/customerRoute"), "customerRoute");
const customerCardRoute = getRoute(require("./routes/customerCardRoute"), "customerCardRoute");
const customerAddressRoute = getRoute(require("./routes/customerAddressRoute"), "customerAddressRoute");
const eventRoute = getRoute(require("./routes/eventRoute"), "eventRoute");
const ticketRoute = getRoute(require("./routes/ticketRoute"), "ticketRoute");
const cartRoute = getRoute(require("./routes/cartRoute"), "cartRoute");
const cartItemRoute = getRoute(require("./routes/cartItemRoute"), "cartItemRoute");
const bookingRoute = getRoute(require("./routes/bookingRoute"), "bookingRoute");

// Routelarni ulash
// Routelarni ulash
app.use("/admin", adminRoute);
app.use("/payment_method", paymentMethodRoute);
app.use("/payment_methods", paymentMethodRoute); // Swagger /payment_methods ni ham topishi uchun qo'shildi
app.use("/delivery_method", deliveryMethodRoute);
app.use("/delivery_methods", deliveryMethodRoute); // ehtimoliy delivery xatolarining oldini olish uchun
app.use("/region", regionRoute);
app.use("/district", districtRoute);
app.use("/lang", langRoute);
app.use("/human_category", humanCategoryRoute);
app.use("/event_type", eventTypeRoute);
app.use("/types", typesRoute);
app.use("/venue", venueRoute);
app.use("/venueType", venueTypesRoute);
app.use("/venuePhoto", venuePhotoRoute);
app.use("/seatType", seatTypeRoute);
app.use("/seat", seatRoute);
app.use("/ticket_status", ticketStatusRoute);
app.use("/customer", customerRoute);
app.use("/customer_card", customerCardRoute);
app.use("/customer_address", customerAddressRoute);
app.use("/event", eventRoute);
app.use("/tickets", ticketRoute);
app.use("/cart", cartRoute);
app.use("/cart_item", cartItemRoute);
app.use("/booking", bookingRoute);
const PORT = Number(process.env.PORT) || 5000;

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Express Api with Swagger",
            version: "1.0.0",
            description: "API documention using Swagger"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],   
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
        defaultModelsExpandDepth: -1
    }
}));

// Database connection
async function connectToDB() {
    try {
        if (!process.env.MONGO_URL) {
            console.warn("MONGO_URL topilmadi!");
            return;
        }
        await connect(process.env.MONGO_URL);
        console.log("MongoDB is connected successfully!");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
    }
}
connectToDB();

function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.warn(`Port ${port} band, keyingi portga o'tilmoqda...`);
            startServer(port + 1);
        } else {
            console.error("Server xatosi:", err.message);
        }
    });
}

startServer(PORT);