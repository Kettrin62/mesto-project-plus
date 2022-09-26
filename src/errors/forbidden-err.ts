import { FORBIDDEN_ERROR } from '../utils/constants';
import HttpServerError from '../utils/classes';

export default class ForbiddenError extends HttpServerError {
  constructor(
    message: string,
    statusCode = FORBIDDEN_ERROR,
  ) {
    super(message, statusCode);
  }
}
