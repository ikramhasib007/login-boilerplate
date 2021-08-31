import bcrypt from 'bcryptjs';
import createError from '../../utils/createError';
import generateToken from '../../utils/generateToken';
import getUserId from '../../utils/getUserId';
import hashPassword from '../../utils/hashPassword';
import { PrismaSelect } from '@paljs/plugins'
import notificationTemplate from '../../utils/notificationTemplate';

export default {
  async createUser(parent, args, { prisma }, info) {
    const { name, email, password, authProvider, authProviderId } = args.data;
    try {
      let data = {
        name, email,
        authProvider: {
          create: {
            provider: authProvider.toUpperCase()
          }
        }
      };
      if(password) {
        data.password = await hashPassword(password);
      } else if(authProviderId) {
        data.authProvider.create = {
          ...data.authProvider.create,
          providerId: authProviderId
        }
      }
      
      const user = await prisma.user.create({ data });

      return {
        user,
        token: generateToken(user.id)
      }
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async login(parent, args, { prisma }, info) {
    const { email, password } = args.data;
    try {
      let query = {
        where: { email }
      }
      const user = await prisma.user.findFirst(query);
  
      if(password) {
        if(!user.password) throw new Error('User exist with different sign in method')
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) throw new Error('Unable to login')
      }

      await prisma.user.update({where: query.where, data: {
        lastLogin: new Date()
      }})
  
      return {
        user,
        token: generateToken(user.id)
      }
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async socialLogin(parent, args, { prisma }, info) {
    const { name, email, authProvider, authProviderId, imageUrl } = args.data;
    try {
      let query = {
        where: { email }
      }

      // UPDATE "name","imageUrl","lastLogin"
      let update = { lastLogin: new Date() }
      if(name) update.name = name;
      if(imageUrl) update.imageUrl = imageUrl;

      // CREATE
      let create = {
        email, ...update,
        authProvider: {
          create: {
            provider: authProvider.toUpperCase()
          }
        }
      }
      if(authProviderId) {
        create.authProvider.create.providerId = authProviderId;
      }

      const user = await prisma.user.upsert({ ...query, update, create })
  
      if(authProviderId) {
        let opsQuery = {
          where: {
            providerId: {
              contains: authProviderId
            }
          }
        }
        let isMatch = await prisma.authProvider.findFirst(opsQuery)
        if(!isMatch) throw new Error('User exist with different sign in method')
      }
  
      return {
        user,
        token: generateToken(user.id)
      }
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async updateUser(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request)
      if(typeof args.data.password === 'string') {
        args.data.password = await hashPassword(args.data.password)
      }
      return prisma.user.update({
        where: {
          id: userId
        },
        data: args.data
      }, info)
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async resetPassword(parent, args, { prisma }, info) {
    try {
      await prisma.token.findFirst({ where: {
        id: args.token
      }})
      if(typeof args.data.password === 'string') {
        args.data.password = await hashPassword(args.data.password)
      }
      return prisma.user.update({
        where: {
          id: args.id
        },
        data: {
          password: args.data.password
        },
        select: {
          name: true,
          email: true
        }
      }, info)
    } catch (error) {
      return createError.BadRequest(error)
    }
  },
  async emailVerify(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request);
      return prisma.user.update({
        where: {
          id: userId
        },
        data: {
          verified: true
        }
      })
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request);
      return prisma.user.delete({
        where: {
          id: userId
        }
      });
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

}