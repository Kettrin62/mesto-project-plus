import { Router } from 'express';
import { cardBodyValidator, cardIdValidator } from '../middlewares/validators';
import {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);

router.post('/', cardBodyValidator, createCard);

router.delete('/:cardId', cardIdValidator, deleteCardById);

router.put('/:cardId/likes', cardIdValidator, likeCard);

router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default router;
