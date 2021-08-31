import User from './user'
import Token from './token'
import Category from './category'
import Notification from './notification'
import Upload from './upload'

const Mutation = {
  ...User,
  ...Token,
  ...Category,
  ...Notification,
  ...Upload,

}

export default Mutation