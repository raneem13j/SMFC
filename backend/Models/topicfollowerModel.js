import mongoose from "mongoose";
const { Schema, model } = mongoose;

const topicfollowerSchema = new Schema(
  {
    follower_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please include the user id"],
    },
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: [true, "Please include the user id"],
    },
  },
  { timestamps: true }
);

const Topicfollower = model("Topicfollower", topicfollowerSchema);
export default Topicfollower;
