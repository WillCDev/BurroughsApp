import fastify from 'fastify'
import payrollRoutes from './routes/payroll'

export const server = fastify({
  logger: {
    level: 'info',
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          headers: req.headers,
          body: req.body,
        }
      },
    },
  },
  ignoreTrailingSlash: true,
})

server.register(payrollRoutes, { prefix: '/payroll' })

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
