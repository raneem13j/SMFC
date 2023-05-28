import Deck from "../Models/deckModel.js";
import Vote from "../Models/voteModel.js";
import mongoose from 'mongoose';

export const getAllDecks = async (req, res) => {
  try {
      const decks = await Deck.find()
      .populate("topic_id", "topic")
      .populate("category_id", "category")
      .populate("subcategory_id", "subcategory")
      .populate("user_id", "username");
      res.status(200).json(decks);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const getDeckById = async (req, res) => {
  try {
      const id = req.params.id;
      console.log(id);
      const deck = await Deck.findById(id)
      .populate("topic_id", "topic")
      .populate("category_id", "category")
      .populate("subcategory_id", "subcategory");

      if (!deck) {
        return res.status(404).json({ message: "Id not found" });
      }
      
      res.status(200).json(deck);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
}

export const getDecksByUserId = async (req, res)=>{
   const userId = req.params.id;
   try{
    const deck = await Deck.find({
      user_id: userId
    }).populate("topic_id", "topic")
    .populate("category_id", "category")
    .populate("subcategory_id", "subcategory")
    .populate("user_id", "username");
     // Fetch vote information for each deck
     const decksWithVotes = await Promise.all(
      deck.map(async (deck) => {
        const vote = await Vote.findOne({
          user_id: userId,
          deck_id: deck._id,
        });

        // Add vote information to the deck object
        const deckWithVote = {
          ...deck._doc,
          voteType: vote ? vote.voteType : null,
        };

        return deckWithVote;
      })
    );

    res.status(200).json(decksWithVotes);
   }catch (error) {
    console.error(error);
    res.status(500).send(error);
}
}

export const getDecksByUserIdforProfil = async (req, res)=>{
  const userId = req.params.id;
  const user_id = req.query.user_id;
  try{
   const deck = await Deck.find({
     user_id: userId
   }).populate("topic_id", "topic")
   .populate("category_id", "category")
   .populate("subcategory_id", "subcategory")
   .populate("user_id", "username");
    // Fetch vote information for each deck
    const decksWithVotes = await Promise.all(
     deck.map(async (deck) => {
       const vote = await Vote.findOne({
         user_id: user_id,
         deck_id: deck._id,
       });

       // Add vote information to the deck object
       const deckWithVote = {
         ...deck._doc,
         voteType: vote ? vote.voteType : null,
       };

       return deckWithVote;
     })
   );

   res.status(200).json(decksWithVotes);
  }catch (error) {
   console.error(error);
   res.status(500).send(error);
}
}

export const getAllDecksByUserId = async (req, res) =>{
     const userId = req.params.id;
  try {
    const decks = await Deck.find()
    .populate("topic_id", "topic")
    .populate("category_id", "category")
    .populate("subcategory_id", "subcategory")
    .populate("user_id", "username");
      // Fetch vote information for each deck
      const decksWithVotes = await Promise.all(
        decks.map(async (deck) => {
          const vote = await Vote.findOne({
            user_id: userId,
            deck_id: deck._id,
          });
  
          // Add vote information to the deck object
          const deckWithVote = {
            ...deck._doc,
            voteType: vote ? vote.voteType : null,
          };
  
          return deckWithVote;
        })
      );
  
      res.status(200).json(decksWithVotes);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const getAllDeckslatest = async (req, res) =>{
  const userId = req.params.id;
try {
 const decks = await Deck.find()
 .populate("topic_id", "topic")
 .populate("category_id", "category")
 .populate("subcategory_id", "subcategory")
 .populate("user_id", "username")
 .sort({ createdAt: -1 }); // Sort by date in descending order
   // Fetch vote information for each deck
   const decksWithVotes = await Promise.all(
     decks.map(async (deck) => {
       const vote = await Vote.findOne({
         user_id: userId,
         deck_id: deck._id,
       });

       // Add vote information to the deck object
       const deckWithVote = {
         ...deck._doc,
         voteType: vote ? vote.voteType : null,
       };

       return deckWithVote;
     })
   );

   res.status(200).json(decksWithVotes);
} catch (err) {
 res.status(500).json({ error: err });
}
}

export const createDeck = async (req, res) => {
  try {
     const userId = req.params.id;
     console.log(userId);
      const newDeck = new Deck ({
        name: req.body.name,
        level: req.body.level,
        card_count: req.body.card_count,
        user_id: userId,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
        topic_id: req.body.topic_id,
      });
      await newDeck.save();
      res.status(201).json(newDeck);
      console.log(Deck)
  } catch (error) {
      if (error) {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
  }
}

export const editDeck = async (req, res) => {
  try {
      const id = req.params.id;
      const updateFields = {};
      
    
      if (req.body.name !== undefined) updateFields.name = req.body.name;
      if (req.body.level !== undefined) updateFields.level = req.body.level;
      if (req.body.card_count !== undefined) updateFields.card_count = req.body.card_count;
      if (req.body.category_id !== undefined) updateFields.category_id = req.body.category_id;
      if (req.body.subcategory_id !== undefined) updateFields.subcategory_id = req.body.subcategory_id;
      if (req.body.topic_id !== undefined) updateFields.topic_id = req.body.topic_id;
      if (req.body.user_id !== undefined) updateFields.user_id = req.body.user_id;
    
      const deckDoc = await Deck.findByIdAndUpdate(id, {
        $set: updateFields,
      }, { new: true });
  
      if (!deckDoc) return res.status(404).send("Document not found");
      res.status(200).json("Document updated successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating document in the database");
    }
}

export const deleteDeck = async (req, res) => {
  try {
    const id = req.params.id;
    const deck = await Deck.findOne({ _id: id });
    if (!deck) {
      res.status(404).json({ message: "ID not found." });
      return;
    }
    await Deck.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

