const express = require("express")
const userAuth = require("../middlewares/auth")
const userRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequest")
const User = require("../models/user")

userRouter.get("/user/requests/received", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId : loggedInUser._id,
            status :  "interested"
        // }).populate("fromUserId", ["firstName", "lastName", "age", "photoUrl", "about", "skills"]); 
        }).populate("fromUserId", "firstName lastName age photoUrl about skills"); //here We are showing User modele data in request list
        res.json({message : "Data fetched Successfully!", data : connectionRequest,})

    }catch(err){
        req.statusCode(400).send("ERROR" + err.message)
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                {toUserId : loggedInUser._id, status : "accepted"},
                {fromUserId: loggedInUser._id, status : "accepted"},
            ],
        }).populate("fromUserId", "firstName lastName age photoUrl about skills")
        .populate("toUserId", "firstName lastName age photoUrl about skills");
        const data = connectionRequest.map((row) =>{
            if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
                return row.toUserId 
            }
            return row.fromUserId;
        });
        res.json({message: "Connection List Fiched Successfully", data})
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

userRouter.get("/feed", userAuth, async (req, res) =>{
    try{
        const loggedInId = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skipFormula = (page-1)*limit;
        const connectionRequest = await ConnectionRequestModel.find({
            $or : [{fromUserId : loggedInId._id},{toUserId : loggedInId._id}]
        }).select("fromUserId toUserId")
        // .populate("fromUserId", "firstName")
        // .populate("toUserId", "firstName")

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) =>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })
        // console.log(hideUsersFromFeed);
        const users = await User.find({
            // $and this is and condition where all condition true
            $and: [ // $nin means "not in this array"
                {_id : {$nin : Array.from(hideUsersFromFeed)}}, //this give all users except hideUsersFromFeed user
                {_id : {$ne : loggedInId._id}} //this hide loggedIn user also
                //$ne means "not equal to"
            ]
        }).select("firstName lastName age photoUrl about skills").skip(skipFormula).limit(limit)
        res.send(users)
    }catch(err){
        res.status(400).send({message : err.message});
    }
})



module.exports = userRouter;