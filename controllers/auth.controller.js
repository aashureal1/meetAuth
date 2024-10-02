const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models//user.model");

module.exports.signup = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set the JWT token in cookies
        res.cookie("token", token, { httpOnly: true });

        // Redirect to profile page
        res.redirect("/profile");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Server Error");
    }
};


module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Trim the input password before comparing
        password = password.trim();

        // Compare passwords (input vs hashed password in DB)
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set the JWT token in cookies
        res.cookie("token", token, { httpOnly: true });

        // Redirect to profile page
        res.redirect("/profile");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Server Error");
    }
};
