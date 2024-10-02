const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const router = express.Router()


//Render Signup Page
router.get("/signup", (req, res) => {
    res.render("signup");
})

// Handle Login
router.post("/signup", signup)



//Render Login Page
router.get("/login", (req, res) => {
    res.render("login");
})

// Handle Login
router.post("/login", login)



// Handle Logout
router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
})


module.exports = router;