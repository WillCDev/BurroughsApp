import { FastifyPluginCallback } from 'fastify'

const initializeRoutes: FastifyPluginCallback = (instance, _opts, done) => {
  instance.get('/', (_req, reply) => {
    reply.status(200)
    reply.send('Wohooo')
  })

  done()
}

export default initializeRoutes
