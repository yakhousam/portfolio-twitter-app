import * as dotenv from 'dotenv';
dotenv.config();
import '@yak-twitter-app/server/db';
import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as passport from 'passport';
import '@yak-twitter-app/server/passport';
import * as MongoDBStore from 'connect-mongodb-session';
import * as session from 'express-session';
import { searchHashtagRoute } from '@yak-twitter-app/server-routes-search-hashtag';
import { authRoute } from '@yak-twitter-app/server/routes/auth';
import { errorMiddleware } from '@yak-twitter-app/server-middlewares-error';
import { IUser } from '@yak-twitter-app/types';
import helmet from 'helmet';

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self'", 'platform.twitter.com'],
      'frame-src': [
        "'self'",
        'platform.twitter.com',
        'syndication.twitter.com',
      ],
      'img-src': ["'self'", 'pbs.twimg.com', 'syndication.twitter.com'],
    },
  })
);

app.use(compression());

const mongoDbStore = MongoDBStore(session);

const store = new mongoDbStore({
  uri: process.env.DB_URI,
  collection: 'session',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
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

function isLoggedInMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  next();
}

app.use('/api/search/hashtag', isLoggedInMiddleware, searchHashtagRoute);

app.use(express.static(path.resolve(__dirname, 'assets', 'public')));
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.sendFile(path.resolve(__dirname, 'assets', 'index.html'));
});

app.get('/authorization-failed', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  res.sendFile(path.resolve(__dirname, 'assets', 'authorization-failed.html'));
});

app.use(express.static(path.resolve(__dirname, '..', 'dashboard')));

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  const user = req.user as IUser;
  res.cookie('user_avatar_url', user.profile?.photos?.[0].value);
  res.sendFile(path.resolve(__dirname, '..', 'dashboard', 'index.html'));
});

app.use(errorMiddleware);

const port = process.env.PORT || 3333;

const server = app.listen(port, () =>
  console.log(`server is running on http://localhost:${port}/api`)
);
server.on('error', console.error);
