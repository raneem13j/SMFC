import express from "express";
const router = express.Router();

import {
    getAllDecks,
    getDeckById,
    getAllDeckByUserId,
    createDeck,
    editDeck,
    deleteDeck,
  } from "../Controllers/deckController.js";

router.get('/', getAllDecks);
router.get('/:id', getDeckById);
router.get('/byuser/:id', getAllDeckByUserId )
router.post('/:id', createDeck);
router.put('/:id', editDeck);
router.delete('/:id', deleteDeck);


export default router;