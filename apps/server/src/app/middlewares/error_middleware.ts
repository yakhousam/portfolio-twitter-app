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
    // console.log('header sent error', error);
    return res.end(JSON.stringify({ error: 'something failed' }));
  }
  if (error instanceof ApiRequestError) {
    // console.log('api request error');
    // console.log(error.toJSON());
    return res.sendStatus(400);
  }

  if (error instanceof ApiResponseError) {
    // console.log('api response error');
    // console.log(error.data, error.code);
    return res.status(error.code).json(error.data);
  }

  return res.sendStatus(500);
}
