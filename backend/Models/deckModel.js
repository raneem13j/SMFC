import mongoose from "mongoose";
const { Schema, model } = mongoose;

const deckSchema = new Schema({
  name:{
    type: String,
    required: [true, "Please include the deck"],
  },
  level: {
    type: String,
    required: [true, "Please include the product level"],
  },
  card_count:{
    type:Number,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please include the user id"],
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please include the product category"],
  },
  subcategory_id: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
    required: [true, "Please include the product subcategory"],
  },
  topic_id: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: [true, "Please include the product topic"],
  },
 
}, { timestamps: true });

const Deck = model("Deck", deckSchema);
export default Deck;