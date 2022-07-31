import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as path from 'path';
import errorMiddleware from './app/middlewares/error_middleware';
import twitterSearchRoute from './app/routes/twitter_search_route';

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api', twitterSearchRoute);

app.use(errorMiddleware);

const dashboardPath = path.join(__dirname, '../../../dist/apps/dashboard');

app.use(express.static(dashboardPath));
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(dashboardPath, 'index.html'));
});

let port = process.env.port || 3333;
if (process.env.NODE_ENV === 'test') {
  port = 3334;
}
export const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

//TODO: write get users last tweets endpoint
