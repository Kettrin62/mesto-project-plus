import { Router } from 'express';
import {
  createCard,
  getCards,
  deleteCardById
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCardById);

export default router;