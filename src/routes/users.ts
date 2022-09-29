import { Router } from 'express';
import {
  userIdValidator,
  userProfileValidator,
  userAvatarValidator,
} from '../middlewares/validators';
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

router.patch('/me', userProfileValidator, updateProfile);

router.patch('/me/avatar', userAvatarValidator, updateAvatar);

export default router;
