import Topicfollower from "../Models/topicfollowerModel.js";



export const followTopic = async (req, res) => {
  const followerId = req.params.id;
  const { topic_id } = req.body;
  try {
     // Check if the user is already following the topic
     const existingFollower = await Topicfollower.findOne({ follower_id: followerId, topic_id });
     if (existingFollower) {
       return res.status(400).json({ error: 'You are already following this topic.' });
     }

    const topicFollower = new Topicfollower({
      follower_id: followerId,
      topic_id
    });
    await topicFollower.save();
    res.status(200).json({ message: 'Topic followed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to follow topic.' });
  }
};


export const unfollowTopic = async (req, res) => {
  const followerId = req.params.id;
  const { topic_id } = req.body;
  try {
    const topicFollower = await Topicfollower.findOne({follower_id: followerId, topic_id });
    if (!topicFollower) {
      return res.status(404).json({ error: 'Topic follower not found.' });
    }
    
    await topicFollower.deleteOne();
    res.status(200).json({ message: 'Topic unfollowed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to unfollow topic.' });
  }
};


// export const getAllVotes = async (req, res) => {
//   try {
//       const votes = await Vote.find()
//       .populate("user_id", "username  email  password")
//       .populate("deck_id", "name");
//       res.status(200).json(votes);
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
// };

export const getTopicsByUserId = async (req, res) => {
  try {
      const userId = req.params.id;
     
      const topics = await Topicfollower.find({
        follower_id: userId
      }).populate('topic_id', "topic");
       
      if (!topics) {
        return res.status(404).json({ message: "no topics found" });
      }
      
      res.status(200).json(topics);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
}

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