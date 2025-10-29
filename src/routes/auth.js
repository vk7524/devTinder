const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user")
const bcrypt = require('bcrypt');
// const app = express();

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.send("User Added Successfully...")
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials!")
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            // const token = await jwt.sign({ _id: user._id }, "Dev@tinder123",{ expiresIn: '0d' })
            const token = await user.getJWT();
            res.cookie("token", token)
            res.send({message:"User Loggedin Successfully!", user})
        } else {
            throw new Error("Invalid Credentials!")
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
});

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now()),
    });
    res.send("Logout Successfull!!");
})

module.exports = authRouter;