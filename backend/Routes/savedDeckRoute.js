import express from "express";
const router = express.Router();

import {
  getAllSaveds,
  getAllSavedDecksByUser,
  getSavedById,
  saveDeck,
  unSaveDeck,
  editSaved,
  deleteSaved
  } from "../Controllers/savedDeckController.js";

router.get('/', getAllSaveds);
router.get('/list/:id', getAllSavedDecksByUser);
router.get('/:id', getSavedById);
router.post('/save/:id', saveDeck);
router.post('/unsave/:id', unSaveDeck);
router.put('/:id', editSaved);
router.delete('/:id', deleteSaved);


export default router;