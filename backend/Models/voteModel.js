import mongoose from "mongoose";
const { Schema, model } = mongoose;

const voteSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please include the user id"],
    },
    deck_id: {
      type: Schema.Types.ObjectId,
      ref: "Deck",
      required: [true, "Please include the card"],
    },
    voteType: { 
      type: String, 
      enum: ["up", "down"] 
    },
  },
  { timestamps: true }
);

const Vote = model("Vote", voteSchema);
export default Vote;
