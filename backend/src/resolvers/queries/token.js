import createError from "../../utils/createError";

export default {
  async opsToken(parent, args, { prisma }, info) {
    try {
      return prisma.token.findFirst({
        where: {
          id: args.id,
          type: args.type
        }
      })
    } catch (error) {
      return createError.BadRequest(error)
    }
  }
}