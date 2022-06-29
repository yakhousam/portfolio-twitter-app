import { Router, Response, NextFunction } from "express";

import {
  searchByHashtag,
  SearchRequest,
} from "../controllers/twitter_search_controller";

const route = Router();

route.get(
  "/search/:hashtag",
  (req: SearchRequest, res: Response, next: NextFunction) => {
    searchByHashtag(req, res, next);
  }
);

export default route;
