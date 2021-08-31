import Facebook from 'passport-facebook'
import getClient from "apollo"
import getConfig from 'next/config';
import { SOCIAL_LOGIN } from 'src/operations/user';

const { publicRuntimeConfig } = getConfig()

const client = getClient()

export const facebookStrategy = new Facebook.Strategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${publicRuntimeConfig.BASE_PATH}/api/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'name', 'email', 'profileUrl']
},
function(accessToken, refreshToken, profile, cb) {
  // console.log('refreshToken: ', refreshToken, 'accessToken: ', accessToken, 'profile: ', profile);
  let variables = {
    name: profile.displayName,
    email: profile.emails[0].value,
    authProvider: profile.provider,
    authProviderId: profile.id,
    imageUrl: profile.profileUrl
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