const express = require("express");
const connectDB = require("./config/database");
var cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
    .then(() => {
        console.log("Database Connected Successfully...");
        app.listen(3000, () => {
            console.log("Server Is Up");
        });
    }).catch((err) => {
        console.error("Database can't be connected...")
    });