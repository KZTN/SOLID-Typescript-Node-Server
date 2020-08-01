import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/Auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayloard {
  iat: number;
  exp: number;
  sub: string;
}
export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token now provided', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayloard;
    req.user = { id: sub };
    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
