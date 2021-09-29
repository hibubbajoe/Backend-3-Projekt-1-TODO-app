const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    default: Date.now(),
    required: true
  },
  category: {
    type: String,
    default: "Allmänt",
    required: true
  }
  // author: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true
  // }
});

module.exports = mongoose.model("Todo", TodoSchema);
