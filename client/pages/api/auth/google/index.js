import passport from 'passport'
import nextConnect from 'next-connect'
import { googleStrategy } from 'libs/auth/google'

passport.use(googleStrategy)

export default nextConnect()
  .use(passport.initialize())
  .get(passport.authenticate('google', { scope: ['profile', 'email']}))