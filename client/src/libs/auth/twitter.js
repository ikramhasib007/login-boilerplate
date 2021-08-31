import Twitter from 'passport-twitter'
import getClient from 'apollo';
import getConfig from 'next/config';
import { SOCIAL_LOGIN } from 'src/operations/user';

const { publicRuntimeConfig } = getConfig()

const client = getClient()

export const twitterStrategy = new Twitter.Strategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: `${publicRuntimeConfig.BASE_PATH}/api/auth/twitter/callback`,
},
function(token, tokenSecret, profile, cb) {
  console.log('token: ', token, 'tokenSecret: ', tokenSecret, 'profile: ', profile);
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
        token: data.login.token
      }
      cb(null, user)
    })
    .catch((error) => cb(error))
});