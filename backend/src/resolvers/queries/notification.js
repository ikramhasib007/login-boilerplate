import createError from "../../utils/createError";
import getUserId from "../../utils/getUserId"
import { PrismaSelect } from '@paljs/plugins'

export default {
  notifications(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    try {
      const { take, skip } = args;
      const select  = new PrismaSelect(info).value
      const opArgs = {
        take, skip,
        where: {
          author: {
            id: userId
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        ...select
      }
      if(typeof args.cursor === 'string') {
        opArgs.cursor = {
          id: args.cursor
        }
      }
      return prisma.notification.findMany(opArgs)
    } catch (error) {
      return createError.BadRequest(error)
    }
  }
}