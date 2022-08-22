import * as express from 'express';
import * as dotenv from 'dotenv';
import { searchHashtagRoute } from '@yak-twitter-app/routes/search/hashtag';
import { errorMiddleware } from '@yak-twitter-app/middlewares/error';

dotenv.config();
const app = express();

app.use('/api/search/hashtag', searchHashtagRoute);

app.use(errorMiddleware);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
