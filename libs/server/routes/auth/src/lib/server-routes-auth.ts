import { serverMiddlewaresAuthorization as authorizationMiddleware } from '@yak-twitter-app/server/middlewares/authorization';
import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

router.get(
  '/auth/twitter',
  authorizationMiddleware,
  passport.authenticate('twitter')
);

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: '/',
  })
);

router.get('/auth/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default router;
