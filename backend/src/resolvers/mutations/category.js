import createError from '../../utils/createError';
import getUserId from '../../utils/getUserId';
import { PrismaSelect } from '@paljs/plugins'

export default {
  async createCategory(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request)
      const select = new PrismaSelect(info).value;
      const { name, allowance, wastage } = args.data
      const data = { name, allowance, wastage }
      return prisma.category.create({ data, ...select })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async updateCategory(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request)
      const select = new PrismaSelect(info).value;
      const { name, allowance, wastage } = args.data
      const data = { name, allowance, wastage }
      return prisma.category.update({
        where: {
          id: args.id
        },
        data,
        ...select
      })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },
  
  async deleteCategory(parent, args, { prisma }, info) {
    try {
      const userId = getUserId(request)
      const select = new PrismaSelect(info).value;
      return prisma.category.delete({
        where: { id: args.id },
        ...select
      })
    } catch (error) {
      return createError.BadRequest(error)
    }
  }

}