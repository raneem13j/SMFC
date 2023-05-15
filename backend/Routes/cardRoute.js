import express from "express";
const router = express.Router();

import {
    getAllCards,
    getCardById,
    getAllCardsByDeckId,
    createCard,
    editCard,
    deleteCard
  } from "../Controllers/cardController.js";

router.get('/', getAllCards);
router.get('/:id', getCardById);
router.get('/list/:id', getAllCardsByDeckId);
router.post('/', createCard);
router.put('/:id', editCard);
router.delete('/:id', deleteCard);


export default router;