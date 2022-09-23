import { DEFAULT_ERROR } from '../utils/constants';
import { HttpServerError } from '../utils/classes';

class DefaultError extends HttpServerError {
  constructor(
    message: string,
    statusCode = DEFAULT_ERROR
  ) {
    super(message, statusCode);
  }
}

module.exports = DefaultError;