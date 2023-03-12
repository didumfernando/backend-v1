const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      rating: {
        type: String,
        required: [true, "Please provide a rating!"],
        unique: false,
      },
  })

module.exports = mongoose.model.Rating || mongoose.model("Rating", UserSchema);