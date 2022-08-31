import * as passport from 'passport';
import * as TwitterStrategy from 'passport-twitter-oauth2';
import { User } from '@yak-twitter-app/server/models/user';

// const User = require("./models/user");

const dev = process.env.NODE_ENV !== 'production';

// twitter strategy
passport.use(
  new TwitterStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: dev
        ? 'http://localhost:3333/auth/twitter/callback'
        : 'https://twitter-app-yakhousam.herokuapp.com/auth/twitter/callback',
    },
    function (token, tokenSecret, profile, cb) {
      // console.log('twitter profile =', profile)
      console.log('token *=', token);
      console.log('secret =', tokenSecret);
      const update = {
        twitterId: profile.id,
        profile,
        token,
        tokenSecret,
      };
      User.findOneAndUpdate(
        { twitterId: profile.id },
        update,
        { upsert: true, new: true, useFindAndModify: false },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
export default function () {
  passport.serializeUser((user, done) => {
    done(null, user.twitterId);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ twitterId: id }, (err, user) => {
      if (err) return done(err);
      done(null, user);
    });
  });
}
