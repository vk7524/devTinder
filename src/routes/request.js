const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequist", userAuth, async (req, res) => {
    try {
        const user = req.user;
        console.log("Sending Connection Request");
        res.send(user.firstName + " Sending Connection Request...!");
    } catch (err) {
        res.status(400)("ERROR " + err.message)
    }
});


module.exports = requestRouter;