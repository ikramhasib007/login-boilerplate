import passport from 'passport'
import nextConnect from 'next-connect'
import { facebookStrategy } from 'libs/auth/facebook'

passport.use(facebookStrategy)

export default nextConnect()
  .use(passport.initialize())
  .get(passport.authenticate('facebook', { scope: ['email']}))