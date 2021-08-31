import Google from 'passport-google-oauth20'
import getClient from 'apollo';
import getConfig from 'next/config';
import { SOCIAL_LOGIN } from 'src/operations/user';

const { publicRuntimeConfig } = getConfig()

const client = getClient()

export const googleStrategy = new Google.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${publicRuntimeConfig.BASE_PATH}/api/auth/google/callback`,
},
function(accessToken, refreshToken, profile, cb) {
  // console.log('refreshToken: ', refreshToken, 'accessToken: ', accessToken, 'profile: ', profile);
  let variables = {
    name: profile.displayName,
    email: profile.emails[0].value,
    authProvider: profile.provider,
    authProviderId: profile.id,
    imageUrl: profile.photos[0].value
  }
  client.mutate({mutation: SOCIAL_LOGIN, variables })
    .then(({data, errors}) => {
      if(errors) return cb(errors)
      let user = {
        token: data.socialLogin.token
      }
      cb(null, user)
    })
    .catch((error) => cb(error))
});