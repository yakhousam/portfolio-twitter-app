import * as express from 'express';
import * as dotenv from 'dotenv';
import { searchHashtagRoute } from '@yak-twitter-app/server-routes-search-hashtag';
import { errorMiddleware } from '@yak-twitter-app/server-middlewares-error';

dotenv.config();
const app = express();

app.use('/api/search/hashtag', searchHashtagRoute);

app.use(errorMiddleware);

export { app };
