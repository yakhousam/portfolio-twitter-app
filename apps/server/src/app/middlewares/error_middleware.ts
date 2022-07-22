import { Request, Response, NextFunction } from 'express';
import { ApiResponseError, ApiRequestError } from 'twitter-api-v2';

export default function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (res.headersSent) {
    return res.end(JSON.stringify({ error: 'something failed' }));
  }
  if (error instanceof ApiRequestError) {
    return res.sendStatus(400);
  }

  if (error instanceof ApiResponseError) {
    return res
      .status(error.code || 400)
      .json(error.data || { error: 'something failed' });
  }

  return res.sendStatus(500);
}
