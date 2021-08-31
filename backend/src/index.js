import server from './server';

const options = {
  port: process.env.HTTP_PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  uploads: {
    maxFieldSize: 8388608, // unit bytes // 2M x 4 (maxFiles)
    maxFileSize: 2097152, // unit bytes // size 2M
    maxFiles: 4
  }
}

server.start(options, ({ port }) => {
  console.log(`🚀 server is running on localhost:${port}`)
})
