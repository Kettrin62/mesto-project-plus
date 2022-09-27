import { Router } from 'express';
import { userIdValidator, userBodyValidator } from '../middlewares/validators';
import {
  getMyProfile,
  getUserById,
  getUsers,
  updateAvatar,
  updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/:userId', userIdValidator, getUserById);

router.get('/me', getMyProfile);

router.patch('/me', userBodyValidator, updateProfile);

router.patch('/me/avatar', userBodyValidator, updateAvatar);

export default router;
