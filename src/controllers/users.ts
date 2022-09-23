import {
  Request,
  Response,
  NextFunction
} from 'express';
import User from '../models/user';

const NotFoundError = require('../errors/not-found-err');
const DefaultError = require('../errors/default-err');

export const getUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar
  })
    .then(user => res.send(user))
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
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
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user!._id;
  const { name, about } = req.body;

  User.findOneAndUpdate(
    userId,
    { name, about },
    { new: true },
  )
    .then(user => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден')
      }
      res.send(user)
    })
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user!._id;
  const { avatar } = req.body;

  User.findOneAndUpdate(
    userId,
    { avatar },
    { new: true },
  )
    .then(user => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден')
      }
      res.send(user)
    })
    .catch(err => {
      throw new DefaultError('Произошла ошибка')
    });
};
