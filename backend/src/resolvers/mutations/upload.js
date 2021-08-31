import createError from '../../utils/createError'
import getUserId from '../../utils/getUserId'
import { createWriteStream, unlink } from 'fs'
import * as mkdirp from 'mkdirp'
import { nanoid } from 'nanoid'
import { uploadDir } from '../../utils'

const storeUpload = async ({ stream, filename }) => {
  const id = nanoid()
  const path = `${uploadDir}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  )
}

export function deleteAllFiles(files) {
  return new Promise((resolve, reject) => {
    var i = files.length;
    files.forEach(function(file){
      let filepath = `${uploadDir}/${file.id}-${file.filename}`
      unlink(filepath, function(err) {
        i--;
        if (err) {
          return reject(err);
        } else if (i <= 0) {
          return resolve(null);
        }
      });
    });
  })
}

export function deleteSingleFile(file) {
  return new Promise((resolve, reject) => {
    let filepath = `${uploadDir}/${file.id}-${file.filename}`
    unlink(filepath, function(err) {
      if (err) return reject(err);
      else return resolve(null);
    });
  })
}

export default {
  async uploadFile(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request, false)
      // Ensure upload directory exists
      mkdirp.sync(uploadDir)
      
      const recordFile = async data => {
        await prisma.file.create({ data })
        return data;
      }

      const processUpload = async upload => {
        const { createReadStream, filename, mimetype, encoding } = await upload
        const stream = createReadStream()
        const { id, path } = await storeUpload({ stream, filename })
        return recordFile({ id, filename, mimetype, encoding, path: path.substr(2) })
      }

      return processUpload(args.file)
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async uploadFiles(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request, false)
      // Ensure upload directory exists
      mkdirp.sync(uploadDir)

      const recordFile = async data => {
        await prisma.file.create({ data })
        return data;
      }

      const processUpload = async upload => {
        const { createReadStream, filename, mimetype, encoding } = await upload
        const stream = createReadStream()
        const { id, path } = await storeUpload({ stream, filename })
        return recordFile({ id, filename, mimetype, encoding, path: path.substr(2) })
      }

      return Promise.all(args.files.map(processUpload))
    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async deleteFile(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request, false)
      // Ensure upload directory exists
      mkdirp.sync(uploadDir)

      await deleteSingleFile(args.file);
      return prisma.file.delete({ where: { id: args.file.id } })

    } catch (error) {
      return createError.BadRequest(error)
    }
  },

  async deleteFiles(parent, args, { prisma, request }, info) {
    try {
      const userId = getUserId(request, false)
      // Ensure upload directory exists
      mkdirp.sync(uploadDir)

      await deleteAllFiles(args.files);
      let ids = args.files.map(file => file.id)
      let filenames = args.files.map(file => file.filename)
      
      return prisma.file.deleteMany({
        where: {
          AND: [
            {
              id: {
                in: ids
              }
            }, {
              filename: {
                in: filenames
              }
            }
          ]
        }
      })

    } catch (error) {
      return createError.BadRequest(error)
    }
  }

}