const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    // Read the roken fron req cookies
    // Validate the toekn
    // Find the user

    try {
        const { token } = req.cookies;
        if(!token){
            throw new Error("Token Is Not Valid!")
        }

        const decodedObj = await jwt.verify(token, "Dev@tinder123")
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User Not Found!");
        }
        
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }

}
module.exports =  userAuth;