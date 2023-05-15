import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userfollowerSchema = new Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "the user id is required"],
      
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "the user id is required"],
     
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  },
 
);

const Userfollower = model("Userfollower", userfollowerSchema);
export default Userfollower;
