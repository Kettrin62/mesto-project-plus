import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const id = req.user!._id;

  Card.create({
    name,
    link,
    owner: id
  })
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}