import { Router } from 'express';
import {
  getMyProfile,
  getUserById,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.get('/me', getMyProfile);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

export default router;
