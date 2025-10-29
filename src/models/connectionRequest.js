const mongoose = require("mongoose");

const connectionRequestScheme = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User", //this useed for take refrence from User collection model and polulate that where I want
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User", //this useed for take refrence from User collection model and polulate that where I want
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrected status type`
        }
    }
}, { timestamps: true, }
);
connectionRequestScheme.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ("Con not send connection request to yourself!");
    }
    next();
})

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestScheme
);

module.exports = ConnectionRequestModel;