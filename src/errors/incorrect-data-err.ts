import { INCORRECT_DATA_ERROR } from '../utils/constants';
import { HttpServerError } from '../utils/classes';

export class IncorrectDataError extends HttpServerError {
  constructor(
    message: string,
    statusCode = INCORRECT_DATA_ERROR,
  ) {
    super(message, statusCode);
  }
}

module.exports = IncorrectDataError;
