require("dotenv").config();
const express = require("express")
const app = express()

const connectToMongoDB = require("./config/mongodb")
connectToMongoDB(); //Connect to MongoDB


// Routes
const authRoutes = require("./routes/auth.routes")

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/auth", authRoutes);





app.listen(3000)

