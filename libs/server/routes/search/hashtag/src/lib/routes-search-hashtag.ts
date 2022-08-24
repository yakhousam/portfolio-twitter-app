import { Router, Response, NextFunction } from 'express';

import {
  searchByHashtag,
  SearchRequest,
} from '@yak-twitter-app/server-controllers-twitter-search';

const route = Router();

route.get(
  '/:hashtag',
  (req: SearchRequest, res: Response, next: NextFunction) => {
    searchByHashtag(req, res, next);
  }
);

export default route;
