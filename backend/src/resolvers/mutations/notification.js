import createError from '../../utils/createError';
import getUserId from '../../utils/getUserId';
import { PrismaSelect } from '@paljs/plugins'

export default {
  async notificationRead(parent, { ids = [] }, { prisma, request }, info) {
    try {
      const userId = getUserId(request)
      const readCount = await prisma.notification.updateMany({
        where: {
          AND: [
            {
              OR: [
                {
                  id: {
                    in: ids
                  }
                },
                {
                  author: {
                    id: userId
                  }
                }
              ]
            },
            {
              read: {
                not: true
              }
            }
          ]
        },
        data: {
          read: true
        }
      })
      return readCount.count;
    } catch (error) {
      return createError.BadRequest(error)
    }
  }
}