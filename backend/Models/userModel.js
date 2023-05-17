import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    deck_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Deck",
        // required: [true, "Please include the deck id"],
      },
    ],
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please include the email"],
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
  );
  
  userSchema.virtual('follower', {
    ref: 'Userfollower',
    localField: '_id',
    foreignField: 'following',
    justOne: false,
  });
  
  userSchema.virtual('following', {
    ref: 'Userfollower',
    localField: '_id',
    foreignField: 'follower',
    justOne: false,
  });


const User = model("User", userSchema);
export default User;
