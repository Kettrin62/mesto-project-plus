import { NOT_FOUND_ERROR } from '../utils/constants';
import { HttpServerError } from '../utils/classes';

export class NotFoundError extends HttpServerError {
  constructor(
    message: string,
    statusCode = NOT_FOUND_ERROR,
  ) {
    super(message, statusCode);
  }
}

module.exports = NotFoundError;
