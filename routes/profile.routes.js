const express = require("express");
const router = express.Router()
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/user.model");


router.get("/", isLoggedIn, async function (req, res) {
    const user = await User.findById(req.user).select("-password");
    res.render("profile", { user });
})




module.exports = router;