const mongoose = require("mongoose");


const ArticalSchema = new mongoose.Schema({
     articalType: {
        type: String,
        required: [true, "Please provide an articalType"],
        unique: false,
      },
    
      creatorName: {
        type: String,
        required: [true, "Please provide a creatorName!"],
        unique: false,
      },
      date: {
        type: String,
        required: [true, "Please provide a date!"],
        unique: false,
      },
      title: {
        type: String,
        required: [true, "Please provide a title!"],
        unique: false,
      },
      content: {
        type: String,
        required: [true, "Please provide a content!"],
        unique: false,
      },
      tag1: {
        type: String,
        required: [true, "Please provide a tag2!"],
        unique: false,
      },
      tag2: {
        type: String,
        required: [true, "Please provide a tag2!"],
        unique: false,
      },
      imgUrl: {
        type: String,
        required: [true, "Please provide a url!"],
        unique: false,
      }
  })

module.exports = mongoose.model.Articals || mongoose.model("Articals", ArticalSchema);