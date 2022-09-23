import {
  Request,
  Response,
  NextFunction
} from 'express';
import Card from '../models/card';

const NotFoundError = require('../errors/not-found-err');
const DefaultError = require('../errors/default-err');

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const userId = req.user!._id;

  Card.create({
    name,
    link,
    owner: userId
  })
    .then(card => res.send(card))
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};

export const deleteCardById = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(card => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует')
      }
      res.send(card)
    })
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user!._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then(card => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует')
      }
      res.send(card)
    })
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};

export const dislikeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user!._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then(card => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует')
      }
      res.send(card)
    })
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};