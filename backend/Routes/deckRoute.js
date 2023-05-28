import express from "express";
const router = express.Router();

import {
    getAllDecks,
    getDeckById,
    getDecksByUserId,
    createDeck,
    editDeck,
    deleteDeck,
    getAllDecksByUserId,
    getDecksByUserIdforProfil,
    getAllDeckslatest
  } from "../Controllers/deckController.js";

router.get('/', getAllDecks);
router.get('/all/:id', getAllDecksByUserId);
router.get('/latest/:id', getAllDeckslatest);
router.get('/:id', getDeckById);
router.get('/byuser/:id', getDecksByUserId )
router.get('/byuser1/:id', getDecksByUserIdforProfil )
router.post('/:id', createDeck);
router.put('/:id', editDeck);
router.delete('/:id', deleteDeck);


export default router;