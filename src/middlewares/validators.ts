import { regexAuth } from '../utils/data';

const { celebrate, Joi } = require('celebrate');

export const userBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

export const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
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
    cardId: Joi.string().alphanum().length(24),
  }),
});

export const authValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(regexAuth).length(36),
  }),
});
