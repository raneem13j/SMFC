import express from "express";
const router = express.Router();

import {
    getAllCategories,
    getCategoryById,
    createCategory,
    editCategory,
    deleteCategory
  } from "../Controllers/categoryController.js";

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', editCategory);
router.delete('/:id', deleteCategory);


export default router;