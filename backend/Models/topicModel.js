import mongoose from "mongoose";
const { Schema, model } = mongoose;

const topicSchema = new Schema({
  topic: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Topic = model("Topic", topicSchema);
export default Topic;