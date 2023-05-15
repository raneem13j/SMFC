import express from "express";
const router = express.Router();

import {
  followTopic,
  unfollowTopic,
  getTopicsByUserId
  } from "../Controllers/topicfollowerController.js";
  

  router.post('/follow/:id', followTopic);
  router.post('/unfollow/:id', unfollowTopic);  
// router.get('/', getAllVotes);
   router.get('/:id', getTopicsByUserId);
// router.post('/', createVote);
// router.put('/:id', editVote);
// router.delete('/:id', deleteVote);


export default router;