const express = require("express");
const { adminAuth } = require("./middlewares/auth")
const { userAuth } = require("./middlewares/auth")
const app = express();

app.use("/admin", adminAuth)
app.use("/user", userAuth)
app.use("/admin/getAllData",
    (req, res) => {
        res.send("Get AllData");
    })
app.use("/user/getAllUserData", (req, res) =>{
    res.send("Fetched User Data");
})

app.listen(3000, () => {
    console.log("Server Is Up");
});
