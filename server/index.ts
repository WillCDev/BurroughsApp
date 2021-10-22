import fastify from 'fastify'
import routes from './routes'

const PORT = 8080

export const server = fastify({
  logger: {
    level: 'info',
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          headers: req.headers,
          hostname: (req as unknown as { hostname: string }).hostname,
          remoteAddress: (req as unknown as { ip: string }).ip,
          remotePort: req.socket.remotePort,
        }
      },
    },
  },
  disableRequestLogging: false,
  ignoreTrailingSlash: true,
})

server.register(routes)

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
