import Subcategory from "../Models/subcategoryModel.js";

export const getAllSubcategories = async (req, res) => {
  try {
      const subcategories = await Subcategory.find()
      .populate("topic_id", "topic")
      .populate("category_id", "category");
      res.status(200).json(subcategories);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const getSubcategoryById = async (req, res) => {
  try {
      const id = req.params.id;
     
      console.log(id);
      const subcategory = await Subcategory.findById(id)
      .populate("topic_id", "topic")
      .populate("category_id", "category");
       
      if (!subcategory) {
        return res.status(404).json({ message: "Id not found" });
      }
      
      res.status(200).json(subcategory);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
}

export const createSubcategory = async (req, res) => {
  try {
      const newSubcategory = new Subcategory ({
          subcategory: req.body.subcategory,
          category_id: req.body.category_id,
          topic_id: req.body.topic_id
      });
      await newSubcategory.save();
      res.status(201).json(newSubcategory);
      console.log(Subcategory)
  } catch (error) {
      if (error) {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
  }
}

export const editSubcategory = async (req, res) => {
  try {
      const id = req.params.id;
      const updateFields = {};
      
      if (req.body.subcategory) updateFields.subcategory = req.body.subcategory;
      if (req.body.category_id) updateFields.category_id = req.body.category_id;
      if (req.body.topic_id) updateFields.topic_id = req.body.topic_id;
    
      const subcategoryDoc = await Subcategory.findByIdAndUpdate(id, {
        $set: updateFields,
      }, { new: true });
  
      if (!subcategoryDoc) return res.status(404).send("Document not found");
      res.status(200).json("Document updated successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating document in the database");
    }
}

export const deleteSubcategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subcategory = await Subcategory.findOne({ _id: id });
    if (!subcategory) {
      res.status(404).json({ message: "ID not found." });
      return;
    }
    await Subcategory.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};