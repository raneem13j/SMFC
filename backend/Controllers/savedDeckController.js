import Saved from "../Models/savedDeckModel.js";
import Vote from "../Models/voteModel.js";

export const getAllSaveds = async (req, res) => {
  try {
      const saved = await Saved.find()
      .populate("user_id", "username  email  password")
      .populate("deck_id", "name");
      res.status(200).json(votes);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};



export const getAllSavedDecksByUser = async (req, res) => {
  try{
    const userId = req.params.id;

    const savedDecks = await Saved.find({ user_id: userId })
    .populate({
      path: 'deck_id',
      select: 'name level card_count user_id',
      populate: {
        path: 'user_id',
        select: 'username',
      },
    });


    const decksWithVotes = await Promise.all(
      savedDecks.map(async (savedDeck) => {
        const vote = await Vote.findOne({
          user_id: userId,
          deck_id: savedDeck.deck_id._id,
        });

        // Add vote information to the deck object
        const deckWithVote = {
          ...savedDeck.deck_id._doc,
          voteType: vote ? vote.voteType : null,
        };

        return deckWithVote;
      })
    );

    res.status(200).json(decksWithVotes);

  } catch (err) {
    res.status(500).json({ error: err });
  }
};



export const getSavedById = async (req, res) => {
  try {
      const id = req.params.id;
     
      console.log(id);
      const saved = await Saved.findById(id)
      .populate("user_id", "username  email  password")
      .populate("deck_id", "name");
       
      if (!saved) {
        return res.status(404).json({ message: "Id not found" });
      }
      
      res.status(200).json(vote);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
}

export const saveDeck = async (req, res) => {
  try {
    const userId = req.params.id
      const newSaved = new Saved ({
        user_id: userId,
        deck_id: req.body.deck_id,
       });
      await newSaved.save();
      res.status(201).json({ message: 'deck saved successfully!' });
      console.log(Saved)
  } catch (error) {
      if (error) {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
  }
}


export const unSaveDeck = async (req, res)=>{
     const userId = req.params.id
     const { deck_id } = req.body;
   try{
    const deckSaved = await Saved.findOne({user_id: userId, deck_id});
     if (!deckSaved) {
       return res.status(404).json({error: 'deck saved not found.'})
     }
     await deckSaved.deleteOne();
     res.status(200).json({ message: 'Deck unsaved successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to unsave deck.' });
    } 
};





export const editSaved = async (req, res) => {
  try {
      const id = req.params.id;
      const updateFields = {};
      
      if (req.body.user_id) updateFields.user_id = req.body.user_id;
      if (req.body.deck_id) updateFields.deck_id = req.body.deck_id;
      
    const savedDoc = await Saved.findByIdAndUpdate(id, {
        $set: updateFields,
      }, { new: true });
  
      if (!savedDoc) return res.status(404).send("Document not found");
      res.status(200).json("Document updated successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating document in the database");
    }
}

export const deleteSaved = async (req, res) => {
  try {
    const id = req.params.id;
    const saved = await Saved.findOne({ _id: id });
    if (!saved) {
      res.status(404).json({ message: "ID not found." });
      return;
    }
    await Saved.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};