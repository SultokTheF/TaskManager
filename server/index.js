const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Router = require("./Router");


const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/v1/", Router); // final url is http://localhost:8080/api/v1/endpoint

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://zarina:JvMCJBGXFHDfBLfZ@test.vkiuorm.mongodb.net/") // All the records appears on 'test' DB 
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();