const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const MongoDB = require("./db");



// Apply CORS middleware before defining routes
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

MongoDB();

const userRouter = require("./routes/user");
const foodRouter = require("./routes/FoodData")
const orderRouter = require("./routes/OrderData")
app.use("/api/v1", userRouter);
app.use("/api/v1", foodRouter);
app.use("/api/v1", orderRouter);

// CORS Headers for all routes
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(process.env.PORT, () => {
    console.log(`App is running on ${process.env.PORT}`);
});
