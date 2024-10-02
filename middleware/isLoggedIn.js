const jwt = require("jsonwebtoken")

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) { // Check if token exists
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}


module.exports = isLoggedIn;