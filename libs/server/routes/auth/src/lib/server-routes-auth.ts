import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/',
    successRedirect: '/',
  })
);

export default router;
