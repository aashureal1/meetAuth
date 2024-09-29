const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

module.exports.signup = async (req, res) => {

    let { name, email, password } = req.body; // Fixed variable name

    const user = await User.findOne({ email })

    if (user) {
        return res.send("User Already Exist")
    }

    // Hash Password
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);


    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.send(newUser)

}