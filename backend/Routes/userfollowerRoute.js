import express from "express";
const router = express.Router();

import {
  followUser,
  unfollowUser,
  getIsFollowingById,
  getFollowersById,
  getFollowingById
  } from "../Controllers/userfollowerController.js";
  

  router.get('/:id', getIsFollowingById);
  router.get('/following/:id', getFollowingById);
  router.get('/followers/:id', getFollowersById);
  router.post('/follow/:id', followUser);
  router.post('/unfollow/:id', unfollowUser);  
// router.get('/', getAllVotes);
// router.post('/', createVote);
// router.put('/:id', editVote);
// router.delete('/:id', deleteVote);


export default router;