const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      minLength: (4)
   },
   lastName: {
      type: String
   },
   emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error("Invailed Email Entered." + value)
         }
      }
   },
   password: {
      type: String,
      required: true,
      validate(value) {
         if (!validator.isStrongPassword(value)) {
            throw new Error("Please Enter Strong Password" + value)
         }
      }
   },
   age: {
      type: Number,
      min: 18,
   },
   gender: {
      type: String,
      validate(value) {
         if (!["male", "female", "other"].includes(value)) {
            throw new Error("Gender Is Not Vaild." + value)
         }
      }
   },
   photoUrl: {
      type: String,
      default: "data:image/jpeg;base64,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",
      validate(value) {
         if (!validator.isURL(value)) {
            throw new Error("Photo Url Is Not Valiad." + value)
         }
      }
   },
   about: {
      type: String,
      default: "This is default value of user."
   },
   skills: {
      type: [String]
   }
},
   { timestamps: true },);

module.exports = mongoose.model("User", userSchema);