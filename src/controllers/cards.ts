import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
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
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const deleteCardById = (req: Request, res: Response) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(card => {
      if (!card) {
        res.status(500).send({ message: 'Такой карточки не существует' })
      }
      res.send(card)
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user!._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(card => {
      if (!card) {
        res.status(500).send({ message: 'Такой карточки не существует' })
      }
      res.send(card)
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user!._id;

  Card.findByIdAndUpdate(
    cardId,
    {  $pull: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(card => {
      if (!card) {
        res.status(500).send({ message: 'Такой карточки не существует' })
      }
      res.send(card)
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};