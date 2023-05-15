import express from "express";
const router = express.Router();

import {
    getAllTopics,
    getTopicById,
    createTopic,
    editTopic,
    deleteTopic
  } from "../Controllers/topicController.js";

router.get('/', getAllTopics);
router.get('/:id', getTopicById);
router.post('/', createTopic);
router.put('/:id', editTopic);
router.delete('/:id', deleteTopic);


export default router;