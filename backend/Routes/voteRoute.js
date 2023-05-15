import express from "express";
const router = express.Router();

import {
    getAllVotes,
    getAllDecksOrder,
    getVoteById,
    getAllVotesByDeckId,
    createVote,
    editVote,
    deleteVote
  } from "../Controllers/voteController.js";

router.get('/', getAllVotes);
router.get('/order', getAllDecksOrder);
router.get('/:id', getVoteById);
router.get('/list/:id', getAllVotesByDeckId)
router.post('/:id', createVote);
router.put('/:id', editVote);
router.delete('/:id', deleteVote);


export default router;