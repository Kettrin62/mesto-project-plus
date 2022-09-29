import IncorrectDataError from '../errors/incorrect-data-err';
import { errorMessages, regexAuth, regexId } from '../utils/data';

const { celebrate, Joi } = require('celebrate');

const methodValidateId = (id: string) => {
  if (regexId.test(id)) return id;
  return new IncorrectDataError(errorMessages.invalidId);
};

const methodValidateToken = (token: string) => {
  if (regexAuth.test(token)) return token;
  return new IncorrectDataError(errorMessages.invalidToken);
};

export const userBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

export const userProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

export const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
});

export const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(methodValidateId, 'custom validation'),
  }),
});

export const cardBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
});

export const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(methodValidateId, 'custom validation'),
  }),
});

export const authValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().custom(methodValidateToken, 'custom validation'),
  }),
});
