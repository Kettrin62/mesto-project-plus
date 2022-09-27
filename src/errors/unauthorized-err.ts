import { UNAUTHORIZED_ERROR } from '../utils/constants';
import HttpServerError from '../utils/classes';

export default class UnauthorizedError extends HttpServerError {
  constructor(
    message: string,
    statusCode = UNAUTHORIZED_ERROR,
  ) {
    super(message, statusCode);
  }
}
