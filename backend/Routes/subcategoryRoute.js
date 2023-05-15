import express from "express";
const router = express.Router();

import {
    getAllSubcategories,
    getSubcategoryById,
    createSubcategory,
    editSubcategory,
    deleteSubcategory
  } from "../Controllers/subcategoryController.js";

router.get('/', getAllSubcategories);
router.get('/:id', getSubcategoryById);
router.post('/', createSubcategory);
router.put('/:id', editSubcategory);
router.delete('/:id', deleteSubcategory);


export default router;