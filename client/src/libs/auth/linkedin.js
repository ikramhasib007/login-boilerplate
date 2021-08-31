import Linkedin from 'passport-linkedin-oauth2'
import getClient from 'apollo';
import getConfig from 'next/config';
import { SOCIAL_LOGIN } from 'src/operations/user';

const { publicRuntimeConfig } = getConfig()

const client = getClient()

export const linkedinStrategy = new Linkedin.Strategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: `${publicRuntimeConfig.BASE_PATH}/api/auth/linkedin/callback`,
  scope: ['r_emailaddress', 'r_liteprofile'],
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
      process.nextTick(function () {
        if(errors) return cb(errors)
        let user = { token: data.socialLogin.token }
        return cb(null, user)
      });
    })
    .catch((error) => cb(error))
});