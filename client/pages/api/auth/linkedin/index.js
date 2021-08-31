import passport from 'passport'
import nextConnect from 'next-connect'
import { linkedinStrategy } from 'libs/auth/linkedin'

passport.use(linkedinStrategy)

export default nextConnect()
  .use(passport.initialize())
  .get(passport.authenticate('linkedin'))