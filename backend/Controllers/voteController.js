import Vote from "../Models/voteModel.js";
import mongoose from 'mongoose';

export const getAllVotes = async (req, res) => {
  try {
      const votes = await Vote.find()
      .populate("deck_id", "name");
      res.status(200).json(votes);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const getVoteById = async (req, res) => {
  try {
      const id = req.params.id;
     
      console.log(id);
      const vote = await Vote.findById(id)
      .populate("user_id", "username  email  password")
      .populate("deck_id", "name");
       
      if (!vote) {
        return res.status(404).json({ message: "Id not found" });
      }
      
      res.status(200).json(vote);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
}

export const getAllVotesByDeckId = async (req, res)=>{
  const deckId = req.params.id;
  try{
   const votes = await Vote.find({
     deck_id: deckId
   }).populate("deck_id", "name description level card_count");
   res.status(200).json(votes);
  }catch (error) {
   console.error(error);
   res.status(500).send(error);
}

}

export const createVote = async (req, res) => {
      const userId = req.params.id
  try {
      const newVote = new Vote ({
        user_id: userId,
        deck_id: req.body.deck_id,
        voteType: req.body.voteType,
      });
      await newVote.save();
      res.status(201).json(newVote);
      console.log(Vote)
  } catch (error) {
      if (error) {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
  }
}

export const editVote = async (req, res) => {
  try {
      const id = req.params.id;
      const updateFields = {};
      
      if (req.body.user_id) updateFields.user_id = req.body.user_id;
      if (req.body.deck_id) updateFields.deck_id = req.body.deck_id;
      if (req.body.voteType) updateFields.voteType = req.body.voteType;


      const voteDoc = await Vote.findByIdAndUpdate(id, {
        $set: updateFields,
      }, { new: true });
  
      if (!voteDoc) return res.status(404).send("Document not found");
      res.status(200).json("Document updated successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating document in the database");
    }
}

export const deleteVote = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deckId = req.params.deckId;
    const vote = await Vote.findOne({ user_id: userId, deck_id: deckId });
    if (!vote) {
      res.status(404).json({ message: "ID not found." });
      return;
    }
    await Vote.deleteOne({ user_id: userId, deck_id: deckId });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// export const getAllDecksOrder = async (req, res) => {
//   Vote.aggregate([
//     {
//       $match: { voteType: "up" }
//     },
//     {
//       $group: {
//         _id: "$deck_id",
//         totalUps: { $sum: { $cond: [ { $eq: [ "$voteType", "up" ] }, 1, 0 ] } }
//       }
//     },
//     {
//       $sort: { totalUps: -1 }
//     }
//   ]).then(result => {
//     // result contains the list of decks sorted by the number of "up" votes
//     res.status(201).json(result);
//     console.log(result);
//   }).catch(err => {
//     // handle errors
//     console.error(error);
//     res.status(500).json({ error });
//   });

// }


// export const getAllDecksOrder = async (req, res) => {
//   try {
//     const result = await Vote.aggregate([
//       {
//         $match: { voteType: "up" }
//       },
//       {
//         $group: {
//           _id: "$deck_id",
//           totalUps: { $sum: { $cond: [ { $eq: [ "$voteType", "up" ] }, 1, 0 ] } },
//           deck: { $first: "$deck_id" } // add deck_id field for $lookup
//         }
//       },
//       {
//         $lookup: {
//           from: "decks",
//           localField: "deck",
//           foreignField: "_id",
//           as: "deck"
//         }
//       },
//       {
//         $unwind: "$deck"
//       },
//       {
//         $sort: { totalUps: -1 }
//       }
//     ]);

//     // result contains the list of decks sorted by the number of "up" votes
//     res.status(200).json(result);
//     console.log(result);
//   } catch (error) {
//     // handle errors
//     console.error(error);
//     res.status(500).json({ error });
//   }
// };

export const getAllDecksOrder = async (req, res) => {
  try {
    const result = await Vote.aggregate([
      {
        $match: { voteType: "up" }
      },
      {
        $group: {
          _id: "$deck_id",
          totalUps: { $sum: { $cond: [ { $eq: [ "$voteType", "up" ] }, 1, 0 ] } },
          deck: { $first: "$deck_id" } // add deck_id field for $lookup
        }
      },
      {
        $lookup: {
          from: "decks",
          localField: "deck",
          foreignField: "_id",
          as: "deck"
        }
      },
      {
        $unwind: "$deck"
      },
      {
        $sort: { totalUps: -1 }
      }
    ]);

    // Fetch vote information for each deck
    const decksWithVotes = await Promise.all(
      result.map(async (item) => {
        const vote = await Vote.findOne({
          deck_id: item._id
        });

        // Add vote information to the deck object
        const deckWithVote = {
          ...item.deck,
          voteType: vote ? vote.voteType : null,
          totalUps: item.totalUps
        };

        return deckWithVote;
      })
    );

    res.status(200).json(decksWithVotes);
    console.log(decksWithVotes);
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ error });
  }
};
