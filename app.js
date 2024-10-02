require("dotenv").config();
const express = require("express")
const app = express()

const connectToMongoDB = require("./config/mongodb")
connectToMongoDB(); //Connect to MongoDB


// Routes
const authRoutes = require("./routes/auth.routes")
const indexRoutes = require("./routes/index.routes")
const profileRoute = require("./routes/profile.routes");
const cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoute);





app.listen(3000)

