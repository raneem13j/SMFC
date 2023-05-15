import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cardSchema = new Schema(
  {
    deck_id: {
      type: Schema.Types.ObjectId,
      ref: "Deck",
      required: [true, "Please include the deck id"],
    },
    front: {
      type: String,
      required: [true, "Please include the front"],
    },
    back: {
      type: String,
      required: [true, "Please include the back"],
    },
  },
  { timestamps: true }
);

const Card = model("Card", cardSchema);
export default Card;
