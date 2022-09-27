import {
  Request,
  Response,
  NextFunction,
} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized-err';
import { errorMessages } from '../utils/data';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

const handleAuthError = () => {
  throw new UnauthorizedError(errorMessages.unauthorized);
};

const extractBearerToken = (
  token: string,
) => token.replace('Bearer ', '');

export default (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError();
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError();
  }

  req.user = payload;

  next();

  return null;
};
