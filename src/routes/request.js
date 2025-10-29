const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const { Connection } = require("mongoose");
const User = require("../models/user")


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // Only need to allowed "ignored" & "interested" in api
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type : " + status })
        }

        // If user not present in db
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found", })
        }

        // Check existing connection (in both directions)
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if (existingConnectionRequest) {
            return res.status(400).send({ message: "Connection request already exists!!" })
        }
        // check if fromUser & toUser same
        // if(fromUserId == toUserId){
        //     return res.status(400).send({message : "You can not send requiest yourself"})
        // }


        // Create new connection request
        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });
        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + `${status == "ignored" ? " " : " in "}` + toUser.firstName,
            data,
        })
    } catch (err) {
        res.status(400).json("ERROR " + err.message)
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        //  validate the status
        // akshay => vivek (akshay sending request to vivek)

        // status should be alwyas interested through sender side if ignored then vivek can not accpeted or rejected.

        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"]
        if (!allowedStatus.includes(status)) {
            return res.status(404).json({
                message: "Invalid status type" + status
            })
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId, // requestId should be valid
            toUserId: loggedInUser._id, // loggedInId(vivek) == toUserId
            status: "interested",  //only interested status can perform review request
        })
        if(!connectionRequest) {
            res.status(404).json({message : "Connection request not found"})
        }

        connectionRequest.status = status; 
        const data = await connectionRequest.save();
        res.json({message : "Connection request " + status, data})
    } catch (err) {
        res.status(400).json("ERROR " + err.message)
    }
})


module.exports = requestRouter;