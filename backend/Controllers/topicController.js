import Topic from "../Models/topicModel.js";

export const getAllTopics = async (req, res) => {
  try {
      const topics = await Topic.find();
      res.status(200).json(topics);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const getTopicById = async (req, res) => {
  try {
      const id = req.params.id;
      console.log(id);
      const topic = await Topic.findById(id);

      if (!topic) {
        return res.status(404).json({ message: "Id not found" });
      }
      
      res.status(200).json(topic);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
}

export const createTopic = async (req, res) => {
  try {
      const newTopic = new Topic ({
          topic: req.body.topic,
      });
      await newTopic.save();
      res.status(201).json(newTopic);
      console.log(Topic)
  } catch (error) {
      if (error) {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
  }
}

export const editTopic = async (req, res) => {
  try {
      const id = req.params.id;
      const updateFields = {};
      
      if (req.body.topic) updateFields.topic = req.body.topic;
    
      const topicDoc = await Topic.findByIdAndUpdate(id, {
        $set: updateFields,
      }, { new: true });
  
      if (!topicDoc) return res.status(404).send("Document not found");
      res.status(200).json("Document updated successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating document in the database");
    }
}

export const deleteTopic = async (req, res) => {
  try {
    const id = req.params.id;
    const topic = await Topic.findOne({ _id: id });
    if (!topic) {
      res.status(404).json({ message: "ID not found." });
      return;
    }
    await Topic.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};