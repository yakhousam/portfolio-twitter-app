import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import { searchHashtagRoute } from '@yak-twitter-app/server-routes-search-hashtag';
import { errorMiddleware } from '@yak-twitter-app/server-middlewares-error';
import { server as mockTwitterApi } from '@yak-twitter-app/mocks/server';

const app = express();

app.use('/api/search/hashtag', searchHashtagRoute);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to mock server!' });
});

app.use(errorMiddleware);

const port = process.env.port || 3334;

mockTwitterApi.listen();

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
