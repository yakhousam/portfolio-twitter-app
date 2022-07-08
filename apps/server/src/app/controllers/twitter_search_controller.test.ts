/* eslint-disable no-underscore-dangle */
import { Response, NextFunction } from 'express';
import { searchByHashtag, SearchRequest } from './twitter_search_controller';
import {
  analyzeTweets,
  getTopUsersTweetIds,
  data as mockResult,
  getTopUsersIds,
} from '@yak-twitter-app/shared-lib';

let mockSearchApi = jest.fn().mockResolvedValue({
  ...mockResult,
  next() {
    this.rateLimit.remaining -= 1; // decrease the limit after each call
    return this;
  },
});

jest.mock('./twitter_client', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    v2: { search: mockSearchApi },
  })),
}));

let mockRequest: Partial<SearchRequest>;
let mockResponse: Partial<Response>;
let mockNext: NextFunction;

describe('twitter search controller', () => {
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    mockNext = jest.fn();
  });

  test('should call res.write once and call res.end when max_reslut less than 100', async () => {
    const hashtag = 'bitcoin';
    mockRequest = {
      params: {
        hashtag,
      },
      query: {
        maxResults: 10,
      },
      on: jest.fn(),
    };
    mockResponse = { write: jest.fn(), end: jest.fn() };
    mockNext = jest.fn();
    await searchByHashtag(
      mockRequest as SearchRequest,
      mockResponse as Response,
      mockNext
    );
    expect(mockSearchApi).toHaveBeenCalledWith(
      `#${hashtag}`,
      expect.anything()
    );

    expect(mockSearchApi).toHaveBeenCalledTimes(1);
    expect(mockResponse.write).toHaveBeenCalledWith(
      JSON.stringify({
        ...analyzeTweets(mockResult.tweets),
        rateLimit: {
          ...mockResult.rateLimit,
          remaining: mockResult.rateLimit.remaining,
        },

        topUsersTweetIds: getTopUsersTweetIds(
          getTopUsersIds(mockResult.includes.users),
          mockResult.tweets
        ),
      })
    );
    expect(mockResponse.write).toHaveBeenCalledTimes(1);
    expect(mockResponse.end).toHaveBeenCalledWith(/** nothing */);
    expect(mockResponse.end).toHaveBeenCalledTimes(1);
  });

  test('should return all the data until rate limit reached', async () => {
    const hashtag = 'bitcoin';
    const rateLimit = 10;
    mockRequest = {
      params: {
        hashtag,
      },
      query: {},
      on: jest.fn(),
    };
    mockResponse = { write: jest.fn(), end: jest.fn() };
    mockNext = jest.fn();
    mockResult._rateLimit.remaining = rateLimit;
    await searchByHashtag(
      mockRequest as SearchRequest,
      mockResponse as Response,
      mockNext
    );
    expect(mockResponse.write).toHaveBeenCalledTimes(rateLimit + 1);
    expect(mockResponse.end).toHaveBeenCalledTimes(1);
  });

  test('should call res.end when result.done is true', async () => {
    const hashtag = 'bitcoin';
    mockRequest = {
      params: {
        hashtag,
      },
      query: {},
      on: jest.fn(),
    };
    mockResponse = { write: jest.fn(), end: jest.fn() };
    mockNext = jest.fn();
    mockResult.done = true;
    await searchByHashtag(
      mockRequest as SearchRequest,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.end).toHaveBeenCalledTimes(1);
  });

  test('should call next when error occure', async () => {
    const errorMessage = 'something went wrong';
    mockSearchApi = jest.fn().mockRejectedValueOnce(errorMessage);
    const hashtag = 'bitcoin';
    mockRequest = {
      params: {
        hashtag,
      },
      query: {},
      on: jest.fn(),
    };
    mockResponse = { write: jest.fn(), end: jest.fn() };
    mockNext = jest.fn();

    await searchByHashtag(
      mockRequest as SearchRequest,
      mockResponse as Response,
      mockNext
    );
    expect(mockNext).toHaveBeenCalledWith(errorMessage);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
