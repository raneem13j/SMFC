import express from "express";
const router = express.Router();
import { adminAuth } from "../Middlewares/auth.js";


import {
  getAllUsers,
  getUserById,
  logout,
  register,
  login,
  editUser,
  deleteUser,
  updateRole,
  // getUserByUserName
  } from "../Controllers/userController.js";

router.get('/', getAllUsers);
// router.get('/:username', getUserByUserName);

router.get('/:id', getUserById);
router.post('/logout',logout)
router.post('/login', login);
router.post('/register', register);
router.put('/edit/:id',editUser)
router.put('/update',adminAuth, updateRole);
router.delete('/:id',adminAuth, deleteUser)



export default router;