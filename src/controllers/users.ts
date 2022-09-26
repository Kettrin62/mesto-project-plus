import {
  Request,
  Response,
  NextFunction,
} from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import errorMessages from '../utils/data';

const NotFoundError = require('../errors/not-found-err');
const IncorrectDataError = require('../errors/incorrect-data-err');

export const getUsers = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash: string) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const error = new IncorrectDataError(errorMessages.userIncorrectData);
          next(error);
        } else {
          next(err);
        }
      }));
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new IncorrectDataError(errorMessages.userIncorrectData);
        next(error);
      } else {
        next(err);
      }
    });
};

export const updateProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user!._id;
  const { name, about } = req.body;

  User.findOneAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError(errorMessages.userNotFound);
        next(error);
      } else if (err.name === 'ValidationError') {
        const error = new IncorrectDataError(errorMessages.userIncorrectData);
        next(error);
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user!._id;
  const { avatar } = req.body;

  User.findOneAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError(errorMessages.userNotFound);
        next(error);
      } else if (err.name === 'ValidationError') {
        const error = new IncorrectDataError(errorMessages.userIncorrectData);
        next(error);
      } else {
        next(err);
      }
    });
};
