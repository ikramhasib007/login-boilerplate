import createError from '../../utils/createError';
import getUserId from '../../utils/getUserId';

export default {
  async createToken(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request, false)
      const data = {
        creatorId: userId || args.data.creatorId,
        type: args.data.type,
        expireAt: args.data.expireAt
      }
      return prisma.token.create({ data })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },
  
  async deleteToken(parent, args, { prisma }, info) {
    try {
      return prisma.token.delete({
        where: {
          id: args.id
        }
      })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

}