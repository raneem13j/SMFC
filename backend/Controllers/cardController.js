import Card from "../Models/cardModel.js";

export const getAllCards = async (req, res) => {
  try {
      const cards = await Card.find().populate("deck_id", "name description level card_count");
      res.status(200).json(cards);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const getCardById = async (req, res) => {
  try {
      const id = req.params.id;
      console.log(id);
      const card = await Card.findById(id).populate("deck_id", "name description level card_count");

      if (!card) {
        return res.status(404).json({ message: "Id not found" });
      }
      
      res.status(200).json(card);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
}

export const getAllCardsByDeckId = async (req, res)=>{
     const deckId = req.params.id;
     try{
      const cards = await Card.find({
        deck_id: deckId
      }).populate("deck_id", "name description level card_count");
      res.status(200).json(cards);
     }catch (error) {
      console.error(error);
      res.status(500).send(error);
  }

}

export const createCard = async (req, res) => {
  try {
      const newCard = new Card ({
        deck_id: req.body.deck_id,
          front: req.body.front,
          back: req.body.back,
      });
      await newCard.save();
      res.status(201).json(newCard);
      console.log(Card)
  } catch (error) {
      if (error) {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
  }
}

export const editCard = async (req, res) => {
  try {
      const id = req.params.id;
      const updateFields = {};
      
      if (req.body.deck_id) updateFields.deck_id = req.body.deck_id;
      if (req.body.front) updateFields.front = req.body.front;
      if (req.body.back) updateFields.back = req.body.back;
    
      const cardDoc = await Card.findByIdAndUpdate(id, {
        $set: updateFields,
      }, { new: true });
  
      if (!cardDoc) return res.status(404).send("Document not found");
      res.status(200).json("Document updated successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating document in the database");
    }
}

export const deleteCard = async (req, res) => {
  try {
    const id = req.params.id;
    const card = await Card.findOne({ _id: id });
    if (!card) {
      res.status(404).json({ message: "ID not found." });
      return;
    }
    await Card.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};