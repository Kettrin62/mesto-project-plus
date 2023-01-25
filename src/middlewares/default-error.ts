import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { DEFAULT_ERROR } from '../utils/constants';
import HttpServerError from '../utils/classes';
import { errorMessages } from '../utils/data';

export default (
  err: HttpServerError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = DEFAULT_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === DEFAULT_ERROR
        ? errorMessages.default
        : message,
    });
};
