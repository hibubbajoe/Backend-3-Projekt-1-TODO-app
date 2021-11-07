const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoCategorySchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            unique: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "TodoUser",
            required: true
        },
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("TodoCategory", TodoCategorySchema);
