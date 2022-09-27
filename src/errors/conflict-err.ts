import { CONFLICT_ERROR } from '../utils/constants';
import HttpServerError from '../utils/classes';

export default class ConflictError extends HttpServerError {
  constructor(
    message: string,
    statusCode = CONFLICT_ERROR,
  ) {
    super(message, statusCode);
  }
}
