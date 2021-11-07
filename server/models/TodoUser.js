const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const TodoUserSchema = new Schema(
  {
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

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
