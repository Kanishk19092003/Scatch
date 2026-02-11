require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const productModel = require("./models/product-model");
const indexRouter = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");


const db = require('./config/mongoose-connection');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.SESSION_SECRET,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

if (process.env.NODE_ENV === "development") {
    (async function seedDB() {
        try {
            const productCount = await productModel.countDocuments();
            if (productCount > 0) {
                return;
            }

            console.log('No products found. Seeding the database with sample data...');

            const productsData = [
                { name: "Classic Leather Tote", price: 150, discount: 10, bgcolor: "#F2E6D8", panelcolor: "#D8BFAC", textcolor: "#5C3D2E" },
                { name: "Modern Canvas Backpack", price: 80, discount: 0, bgcolor: "#E0E0E0", panelcolor: "#A0A0A0", textcolor: "#333333" },
                { name: "Elegant Evening Clutch", price: 120, discount: 15, bgcolor: "#333333", panelcolor: "#555555", textcolor: "#FFFFFF" },
                { name: "Vintage Suede Satchel", price: 200, discount: 20, bgcolor: "#6D4C41", panelcolor: "#4E342E", textcolor: "#FFFFFF" },
                { name: "Sporty Nylon Crossbody", price: 60, discount: 5, bgcolor: "#2196F3", panelcolor: "#1976D2", textcolor: "#FFFFFF" },
                { name: "Bohemian Fringed Bag", price: 95, discount: 0, bgcolor: "#FFC107", panelcolor: "#FFA000", textcolor: "#424242" },
                { name: "Minimalist Messenger Bag", price: 110, discount: 0, bgcolor: "#FAFAFA", panelcolor: "#F5F5F5", textcolor: "#212121" },
                { name: "Luxury Quilted Handbag", price: 350, discount: 25, bgcolor: "#FCE4EC", panelcolor: "#F8BBD0", textcolor: "#880E4F" }
            ];

            // A 1x1 transparent GIF to act as a placeholder
            const placeholderImage = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

            const products = productsData.map(p => ({ ...p, image: placeholderImage }));

            await productModel.create(products);
            console.log('Database seeded with 8 products.');

        } catch (error) {
            console.error('Error seeding database:', error);
        }
    })();
}

app.use("/",indexRouter);
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);

app.listen(3000);