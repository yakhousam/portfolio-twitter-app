import * as path from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import * as passport from 'passport';
import '@yak-twitter-app/server/passport';
import * as MongoDBStore from 'connect-mongodb-session';
import * as session from 'express-session';

import { searchHashtagRoute } from '@yak-twitter-app/server-routes-search-hashtag';
import { authRoute } from '@yak-twitter-app/server/routes/auth';
import { errorMiddleware } from '@yak-twitter-app/server-middlewares-error';

const app = express();

const mongoDbStore = MongoDBStore(session);

const store =
  process.env.NODE_ENV !== 'test'
    ? new mongoDbStore({
        uri: 'mongodb://localhost/twitterapp',
        collection: 'session',
      })
    : undefined;
app.use(
  session({
    secret: 'thisIsASecret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //one day
    },
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoute);
app.use('/api/search/hashtag', searchHashtagRoute);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.send("<a href='/auth/twitter'>login</a>");
});

app.use(express.static(path.resolve(__dirname, '..', 'dashboard')));

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.sendFile(path.resolve(__dirname, '..', 'dashboard', 'index.html'));
});

app.use(errorMiddleware);

export { app };
