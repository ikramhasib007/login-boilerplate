import passport from 'passport'
import nextConnect from 'next-connect'
import { twitterStrategy } from 'libs/auth/twitter'

passport.use(twitterStrategy)

export default nextConnect()
  .use(passport.initialize())
  .get(passport.authenticate('twitter'))