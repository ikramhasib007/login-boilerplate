import passport from 'passport'
import nextConnect from 'next-connect'
import { googleStrategy } from 'libs/auth/google'
import { setLoginSession } from 'libs/auth'

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(googleStrategy)

export default nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      const user = await authenticate('google', req, res)
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user }

      await setLoginSession(res, session)

      // res.status(200).send({ done: true })
      res.redirect('/');
    } catch (error) {
      // console.error(error)
      res.redirect('/auth/signin?error=true')
    }
  })