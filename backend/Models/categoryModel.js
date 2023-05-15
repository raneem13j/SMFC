import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  category: {
    type: String,
    required: true
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: [true, "Please include the user id"],
  }
}, { timestamps: true });

const Category = model("Category", categorySchema);
export default Category;