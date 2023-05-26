import Userfollower from "../Models/userfollowerModel.js";


export const getFollowingById = async (req, res) => {
  try {
      const userId = req.params.id
      const followers = await Userfollower.find({follower: userId})
      .populate("following", "username");
      res.status(200).json(followers);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const getFollowersById = async (req, res) => {
  try {
    const userId = req.params.id
    const following = await Userfollower.find({following: userId})
    .populate("follower", "username");
    res.status(200).json(following);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const getIsFollowingById = async (req, res) => {
  try {
    // const loggedInUserId = req.user._id; // get the ID of the logged-in user
    const userIdToCheck = req.params.userId; // get the ID of the user being followed

    // Check if the logged-in user is following the other user
    const isFollowing = await Userfollower.exists({following: userIdToCheck });

    // const isFollowing = await UserFollower.exists({ follower: loggedInUserId, following: userIdToCheck });

    res.json(isFollowing || false);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get follow status' });
  }
}



export const followUser = async (req, res) => {

  const followerId = req.body.follower   // the user performing the follow action
  const followingId = req.params.id; // the user being followed

  const existingFollow = await Userfollower.findOne({ follower: followerId, following: followingId });

  if (existingFollow) {
    return res.status(400).json({ error: 'User already followed' });
  }

  const newFollow = new Userfollower({ follower: followerId, following: followingId });

  try {
    await newFollow.save();
    res.json({ message: 'User followed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



export const unfollowUser = async (req, res) => {
  const followerId = req.body.follower; // the user performing the unfollow action
  const followingId = req.params.id; // the user being unfollowed
 try{
  const existingFollow = await Userfollower.findOneAndDelete({ follower: followerId, following: followingId });

  if (!existingFollow) {
    return res.status(400).json({ error: 'User not followed' });
  }

  res.json({ message: 'User unfollowed successfully' });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
}

};



// export const createVote = async (req, res) => {
//   try {
//       const newVote = new Vote ({
//         user_id: req.body.user_id,
//         deck_id: req.body.deck_id,
//         voteType: req.body.voteType,
//       });
//       await newVote.save();
//       res.status(201).json(newVote);
//       console.log(Vote)
//   } catch (error) {
//       if (error) {
//           return res.status(400).json({ message: error.message });
//       }
//       res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export const editVote = async (req, res) => {
//   try {
//       const id = req.params.id;
//       const updateFields = {};
      
//       if (req.body.user_id) updateFields.user_id = req.body.user_id;
//       if (req.body.deck_id) updateFields.deck_id = req.body.deck_id;
//       if (req.body.voteType) updateFields.voteType = req.body.voteType;


//       const voteDoc = await Vote.findByIdAndUpdate(id, {
//         $set: updateFields,
//       }, { new: true });
  
//       if (!voteDoc) return res.status(404).send("Document not found");
//       res.status(200).json("Document updated successfully.");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error updating document in the database");
//     }
// }

// export const deleteVote = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const vote = await Vote.findOne({ _id: id });
//     if (!vote) {
//       res.status(404).json({ message: "ID not found." });
//       return;
//     }
//     await Vote.deleteOne({ _id: id });
//     res.status(200).json({ message: "Document deleted successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error });
//   }
// };