const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const TodoUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

TodoUserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, + process.env.SALT_ROUNDS, (err, hash) => {
    if (err) {
      const error = new Error('Bcrypt');
      next(error);
    }
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("TodoUser", TodoUserSchema);
