const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const {validateProfileEditData} = require("../utils/validation")
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const loggedinUser = req.user;

        res.send(loggedinUser);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
});
profileRouter.patch("/profile/edit", userAuth, async(req, res) =>{
    try{
        if(!validateProfileEditData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        // console.log(loggedInUser);
        
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        // console.log(loggedInUser);
        // res.send(`${loggedInUser.firstName}, your profile updated successfuly`);
        res.json({
            message : `${loggedInUser.firstName}, your profile updated successfuly`,
            data : loggedInUser,
        })
        
    }catch(err){
        res.status(400).send("ERROR :" + err.message)
    }
});
profileRouter.patch("/profile/forgetpassword", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            throw new Error("Both old and new passwords are required!");
        }

        // Compare old password with stored hash
        const isPasswordValid = await bcrypt.compare(oldPassword, loggedInUser.password);
        if (!isPasswordValid) {
            throw new Error("Old password is incorrect!");
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = newPasswordHash;

        await loggedInUser.save();

        res.json({
            message: "Password changed successfully!",
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter