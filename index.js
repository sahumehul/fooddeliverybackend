const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const MongoDB = require("./db");



// Apply CORS middleware before defining routes
app.use(cors({ origin: 'https://66d70efde19000374f60ed9c--ephemeral-kleicha-36aae5.netlify.app' }));
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
    res.setHeader("Access-Control-Allow-Origin", "https://66d70efde19000374f60ed9c--ephemeral-kleicha-36aae5.netlify.app");
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
