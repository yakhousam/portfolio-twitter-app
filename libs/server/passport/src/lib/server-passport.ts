import * as passport from 'passport';
import * as TwitterStrategy from 'passport-twitter';
import { User } from '@yak-twitter-app/server/models/user';
import { IUser } from '@yak-twitter-app/types';

// twitter strategy
passport.use(
  new TwitterStrategy.Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    },
    function (token, tokenSecret, profile, cb) {
      // console.log('twitter profile =', profile)
      // console.log('token *=', token);
      // console.log('secret =', tokenSecret);
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
// export default function () {
passport.serializeUser((user: IUser, done) => {
  done(null, user.twitterId);
});
passport.deserializeUser((id, done) => {
  User.findOne({ twitterId: id }, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
});
// }
