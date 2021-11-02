import { FastifyPluginCallback } from 'fastify'
import { getPayrollDates, buildPayrollCSV } from '../lib/payroll'

const initializeRoutes: FastifyPluginCallback = (instance, _opts, done) => {
  instance.get('/', (req, res) => {
    const payrollDates = getPayrollDates()
    res.status(200)

    if (req.headers['accept'] === 'text/csv') {
      res.type('text/csv')
      res.send(buildPayrollCSV(payrollDates))
    } else {
      res.send(payrollDates)
    }
  })

  done()
}

export default initializeRoutes
