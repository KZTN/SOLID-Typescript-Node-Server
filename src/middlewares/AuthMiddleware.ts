import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/Auth';

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
    throw new Error('Token now provided');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayloard;
    req.user = { id: sub };
    return next();
  } catch {
    throw new Error('Invalid token');
  }
}
