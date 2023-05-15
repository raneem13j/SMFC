import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subcategorySchema = new Schema({
  subcategory: {
    type: String,
    required: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please include the user id"],
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: [true, "Please include the user id"],
  }
}, { timestamps: true });

const Subcategory = model("Subcategory", subcategorySchema);
export default Subcategory;