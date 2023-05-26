import mongoose from "mongoose";
const { Schema, model } = mongoose;

const savedSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please include the user id"],
    },
    deck_id:
      {
        type: Schema.Types.ObjectId,
        ref: "Deck",
        required: [true, "Please include the deck id"],
      },
    saved_date: {
      type: Date,
      default: Date.now
    }
  },
 
);

const Saved = model("Saved", savedSchema);
export default Saved;
