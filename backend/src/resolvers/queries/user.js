import createError from "../../utils/createError";
import getUserId from "../../utils/getUserId";
import { PrismaSelect } from '@paljs/plugins'

export default {
  users(parent, args, { prisma, request }, info) {
    try {
      const select = new PrismaSelect(info).value
      const opArgs = {
        take: args.take,
        skip: args.skip,
        ...select
      };
      if(typeof args.cursor === 'string') {
        opArgs.cursor = {
          id: args.cursor
        }
      }
      if(args.query) {
        opArgs.where = {
          OR: [{
            name: {
              contains: args.query
            }
          }]
        }
      }
      return prisma.user.findMany(opArgs)
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  me(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request);
      const select = new PrismaSelect(info).value
      return prisma.user.findUnique({
        where: {
          id: userId
        },
        ...select
      })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async user(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    try {
      const select = new PrismaSelect(info).value
      const { email } = args;
      const opArgs = { ...select };
      if(email) opArgs.where = { email }
      return prisma.user.findFirst(opArgs)
    } catch (error) {
      return createError.BadRequest(error)
    }
  }

}