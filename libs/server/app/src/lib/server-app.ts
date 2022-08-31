import * as express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import * as passport from 'passport';
import '@yak-twitter-app/server/db';
import '@yak-twitter-app/server/passport';
import * as MongoDBStore from 'connect-mongodb-session';
import * as session from 'express-session';

import { searchHashtagRoute } from '@yak-twitter-app/server-routes-search-hashtag';
import { errorMiddleware } from '@yak-twitter-app/server-middlewares-error';

const app = express();

const dev = process.env.NODE_ENV !== 'production';

const mongoDbStore = MongoDBStore(session);

const store = new mongoDbStore({
  uri: dev ? 'mongodb://localhost/twitterapp' : process.env.URI,
  collection: 'session',
});
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

app.use('/api/search/hashtag', searchHashtagRoute);

app.use(errorMiddleware);

export { app };
