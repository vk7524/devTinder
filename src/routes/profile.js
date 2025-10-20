const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const {validateProfileEditData} = require("../utils/validation")


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
})

module.exports = profileRouter