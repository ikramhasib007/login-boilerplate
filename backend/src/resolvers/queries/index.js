import User from './user'
import Notification from './notification'
import Token from './token'

const Query = {
  ...User,
  ...Token,
  ...Notification,
  
}

export default Query