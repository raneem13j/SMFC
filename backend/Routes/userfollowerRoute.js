import express from "express";
const router = express.Router();

import {
  followUser,
  unfollowUser,
  getIsFollowingById
  } from "../Controllers/userfollowerController.js";
  

  router.post('/follow/:id', followUser);
  router.post('/unfollow/:id', unfollowUser);  
// router.get('/', getAllVotes);
router.get('/:id', getIsFollowingById);
// router.post('/', createVote);
// router.put('/:id', editVote);
// router.delete('/:id', deleteVote);


export default router;