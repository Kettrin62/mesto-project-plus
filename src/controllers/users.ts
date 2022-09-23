import {
  Request,
  Response,
  NextFunction
} from 'express';
import User from '../models/user';

const NotFoundError = require('../errors/not-found-err');

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar
  })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getUserById = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  const { userId } = req.params;

  User.findById(userId)
    .then(user => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден')
      }
      res.send(user)
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};
