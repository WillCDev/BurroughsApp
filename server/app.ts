import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import payrollRoutes from './routes/payroll'

export default (opts: FastifyServerOptions = {}): FastifyInstance => {
  const app = fastify(opts)

  app.register(payrollRoutes, { prefix: '/payroll' })

  return app
}
