import getUserId from "../utils/getUserId";
import { withFilter } from 'graphql-subscriptions'

const Subscription = {
  user: {
    subscribe: withFilter(
      (parent, args, { pubsub }, info) => pubsub.asyncIterator('user'),
      (payload, args, { request }, info) => {
        const userId = getUserId(request)
        let user = payload.user.data;
        return userId === user.id
    })
  },
}

export default Subscription