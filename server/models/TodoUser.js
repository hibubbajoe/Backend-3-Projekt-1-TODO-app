const mongoose = require("mongoose");

const { Schema } = mongoose;
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
    }
  },
  {
    timestamps: true
  }
);

// TodoUserSchema.pre("validate", function(next) {
//   if (!this.isModified("email")) {
//     next();
//   } else {
//     this.constructor.findOne({ email: this.email })
//     .then(user => {
//       if(user) {
//         const error = new Error("User already exists.");
//         next(error);
//       }
//       next()
//     });
//   }
// });

TodoUserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, +process.env.SALT_ROUNDS, (err, hash) => {
    if (err) {
      const error = new Error("Bcrypt");
      next(error);
    }
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("TodoUser", TodoUserSchema);
