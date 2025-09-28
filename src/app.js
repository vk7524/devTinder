const express = require("express");

const app = express();

app.use("/getUserData", (req, res) =>{
    throw new Error("dweddewd");
    res.send("User Data Send");
});

app.use("/", (err, req, res, next) => {
    if (err){
        res.status(500).send("Something went wrong!")
    }
})
app.listen(3000, () => {
    console.log("Server Is Up");
});
