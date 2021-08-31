import { PrismaClient } from '@prisma/client';

const prismaConfig = {
  rejectOnNotFound: {
    findUnique: {
      User: err => new Error('User error'),
      Category: err => new Error('Category error!'),
      Type: err => new Error('Type error!'),
      Sourcing: err => new Error('Sourcing error!'),
      Product: err => new Error('Product error!'),
      Measurement: err => new Error('Measurement error!'),
      SizeChart: err => new Error('SizeChart error!'),
      PointOfMeasure: err => new Error('PointOfMeasure error!'),
      Token: err => new Error('Token error!'),
    },
    findFirst: {
      User: err => new Error('User error'),
      Category: err => new Error('Category error!'),
      Type: err => new Error('Type error!'),
      Sourcing: err => new Error('Sourcing error!'),
      Product: err => new Error('Product error!'),
      Measurement: err => new Error('Measurement error!'),
      SizeChart: err => new Error('SizeChart error!'),
      PointOfMeasure: err => new Error('PointOfMeasure error!'),
      Token: err => new Error('Token error!'),
    },
  }
}

let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(prismaConfig)
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(prismaConfig)
  }
  prisma = global.prisma
}

export default prisma

// const prisma = global.prisma || new PrismaClient(prismaConfig)
// if(process.env.NODE_ENV === 'development') global.prisma = prisma