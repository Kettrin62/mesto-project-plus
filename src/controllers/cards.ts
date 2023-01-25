import {
  Request,
  Response,
  NextFunction,
} from 'express';
import Card from '../models/card';
import { errorMessages } from '../utils/data';

const NotFoundError = require('../errors/not-found-err');
const IncorrectDataError = require('../errors/incorrect-data-err');
const ForbiddenError = require('../errors/forbidden-err');

export const getCards = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const userId = req.user!._id;

  Card.create({
    name,
    link,
    owner: userId,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new IncorrectDataError(errorMessages.cardIncorrectData);
        next(error);
      } else {
        next(err);
      }
    });
};

export const deleteCardById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user!._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessages.cardNotFound);
      }
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError(errorMessages.fordbiddenCardDelete);
      }
      Card.deleteOne({ _id: cardId })
        .then((cardDelete) => res.send(cardDelete))
        .catch((err) => {
          if (err.name === 'CastError') {
            const error = new IncorrectDataError(errorMessages.cardIncorrectData);
            next(error);
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new IncorrectDataError(errorMessages.cardIncorrectData);
        next(error);
      } else {
        next(err);
      }
    });
};

export const likeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user!._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessages.cardNotFound);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError(errorMessages.cardNotFound);
        next(error);
      } else if (err.name === 'ValidationError') {
        const error = new IncorrectDataError(errorMessages.cardIncorrectData);
        next(error);
      } else {
        next(err);
      }
    });
};

export const dislikeCard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { cardId } = req.params;
  const userId = req.user!._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessages.cardNotFound);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError(errorMessages.cardNotFound);
        next(error);
      } else if (err.name === 'ValidationError') {
        const error = new IncorrectDataError(errorMessages.cardIncorrectData);
        next(error);
      } else {
        next(err);
      }
    });
};
