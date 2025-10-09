const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added Successfully...")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
})

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        if (users == 0) {
            res.status(404).send("User Not Found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("something went wrong")
    }

});

app.get("/feeds", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong")
    }
});

app.delete("/userDelete", async (req, res) => {
    const userId = req.body.userId;
    try {
        // await User.findByIdAndDelete({_id:userId});
        await User.findByIdAndDelete({ _id: userId });
        res.send("user deleted successfully");
    } catch (err) {
        res.send("user Not deleted")
    }
})

app.patch("/updateUser/:userId", async (req, res) => {
    const getUserId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = [ "photoUrl", "about", "gender", "age", "skills", "password"]
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("More than 10 skills are not allowed.")
        }
        await User.findByIdAndUpdate({ _id: getUserId }, data, {
            runValidators: true
        });
        res.send("User Updated Successfully");
    } catch (err) {
        res.status(400).send("Update Failed " + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("Database Connected Successfully...");
        app.listen(3000, () => {
            console.log("Server Is Up");
        });
    }).catch((err) => {
        console.error("Database can't be connected...")
    });