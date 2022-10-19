import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export function serverMiddlewaresAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.query.token as string;
  if (token === undefined) {
    return res.redirect('/authorization-failed');
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err) {
    if (err) {
      return res.redirect('/authorization-failed');
    }
    next();
  });
}
