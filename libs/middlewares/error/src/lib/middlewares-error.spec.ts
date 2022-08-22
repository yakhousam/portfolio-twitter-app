import { Request, Response, NextFunction } from 'express';

import errorMiddleware from './middlewares-error';

jest.mock('twitter-api-v2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const twitterApi = require('twitter-api-v2');

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let mockeNext: NextFunction;
let mockError: Error;
describe('error middelware', () => {
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    mockeNext = jest.fn();
    mockError = new Error();
  });

  test('call res.end if headerSent is true', () => {
    mockResponse = {
      headersSent: true,
      end: jest.fn(),
    };

    errorMiddleware(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      mockeNext
    );
    expect(mockResponse.end).toHaveBeenCalledWith(
      expect.stringMatching(/failed/)
    );
    expect(mockResponse.end).toHaveBeenCalledTimes(1);
  });

  test('return status code 400 if ApiRequestError', () => {
    twitterApi.ApiRequestError = jest.fn();
    mockError = new twitterApi.ApiRequestError();
    mockResponse = {
      sendStatus: jest.fn(),
    };
    errorMiddleware(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      mockeNext
    );
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
    expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);
  });

  test('return status code ApiResponseError code and error data', () => {
    twitterApi.ApiResponseError = jest.fn();
    mockError = new twitterApi.ApiResponseError();
    mockResponse = {
      status: jest.fn(function status() {
        return this;
      }),
      json: jest.fn(),
    };
    errorMiddleware(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      mockeNext
    );
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });

  test('should return status code 500 if server error', () => {
    mockError = new Error('server error');
    mockResponse = {
      sendStatus: jest.fn(),
    };
    errorMiddleware(
      mockError,
      mockRequest as Request,
      mockResponse as Response,
      mockeNext
    );
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(500);
    expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);
  });
});
