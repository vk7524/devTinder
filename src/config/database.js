// c onst mongoose = require("mangoose");
const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://new-user:HBgf29MyLgdddqoc@nodelearning.xv8yv.mongodb.net/devTinder")
};



module.exports = connectDB; 






// const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://new-user:HBgf29MyLgdddqoc@nodelearning.xv8yv.mongodb.net/");
//         console.log("✅ Database connected successfully...");
//     } catch (err) {
//         console.error("❌ Database connection failed!", err);
//         process.exit(1);
//     }

// };
// module.exports = connectDB; 

