const express = require("express");
const foodRouter = express.Router();


foodRouter.get("/getdata",async (req,res)=>{
    try{
        
        // console.log(global.food_items,global.food_category);
        res.send([global.food_items,global.food_category]);
    }catch(err){
        console.error(err);
        res.send("Server Error")
    }
})

module.exports = foodRouter;