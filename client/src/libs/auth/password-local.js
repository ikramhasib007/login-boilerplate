import Local from 'passport-local'
import getClient from "apollo"
import { LOGIN } from 'src/operations/user'

const client = getClient()

export const localStrategy = new Local.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (
  username,
  password,
  done
) {
  let variables = { email: username, password }
  client.mutate({mutation: LOGIN, variables})
    .then(({data, errors}) => {
      if(errors) return done(errors[0])
      let user = {
        token: data.login.token
      }
      done(null, user)
    })
    .catch((error) => done(error))
})