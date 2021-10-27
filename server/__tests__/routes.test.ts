import buildApp from '../app'

describe('Server Routing', () => {
  describe('/payroll', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1225191808598)
    })

    it('should return a 12 month payroll in JSON format if Content-Type is anything other than text/csv', async () => {
      const app = buildApp()
      const response = await app.inject({
        method: 'GET',
        url: '/payroll',
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.payload)).toEqual({
        'Oct 2008': { salary: 'Friday 31st' },
        'Nov 2008': { bonus: 'Wednesday 19th', salary: 'Friday 28th' },
        'Dec 2008': { bonus: 'Monday 15th', salary: 'Wednesday 31st' },
        'Jan 2009': { bonus: 'Thursday 15th', salary: 'Friday 30th' },
        'Feb 2009': { bonus: 'Wednesday 18th', salary: 'Friday 27th' },
        'Mar 2009': { bonus: 'Wednesday 18th', salary: 'Tuesday 31st' },
        'Apr 2009': { bonus: 'Wednesday 15th', salary: 'Thursday 30th' },
        'May 2009': { bonus: 'Friday 15th', salary: 'Friday 29th' },
        'Jun 2009': { bonus: 'Monday 15th', salary: 'Tuesday 30th' },
        'Jul 2009': { bonus: 'Wednesday 15th', salary: 'Friday 31st' },
        'Aug 2009': { bonus: 'Wednesday 19th', salary: 'Monday 31st' },
        'Sep 2009': { bonus: 'Tuesday 15th', salary: 'Wednesday 30th' },
        'Oct 2009': { bonus: 'Thursday 15th' },
      })
    })

    it('should return a 12 month payroll in CSV format if Content-Type is text/csv', async () => {
      const app = buildApp()
      const response = await app.inject({
        method: 'GET',
        url: '/payroll',
        headers: { 'content-type': 'text/csv' },
      })

      expect(response.statusCode).toBe(200)
      expect(typeof response.payload).toBe('string')
      expect(response.payload).toMatchSnapshot()
    })
  })
})
