import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from '../resolvers';
import prisma from '../prisma';
import express from 'express';
import path from 'path'
import pubsub from './pubsub'

pubsub.subscribe("error", console.error);

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      request,
      prisma,
      pubsub,
    }
  },
})

/**
 * In development, you can use below route system to serve the files through your express app.
 * In production, it's generally recommended to use a different web server, like NGINX, to server static content
 * Please check out links: https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/
 */

const pathDir = path.join(__dirname, `../../uploads`);
server.express.use('/uploads', express.static(pathDir))

export default server