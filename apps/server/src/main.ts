import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import errorMiddleware from './app/middlewares/error_middleware';
import twitterSearchRoute from './app/routes/twitter_search_route';

const app = express();

app.use('/api', twitterSearchRoute);

app.use(errorMiddleware);

const port = process.env.port || 3333;
export const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

//TODO: write get users last tweets endpoint
