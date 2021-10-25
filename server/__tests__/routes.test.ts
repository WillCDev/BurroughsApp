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
        'Oct 2008': { salary: '2008-10-31T00:00:00.000Z' },
        'Nov 2008': {
          bonus: '2008-11-19T00:00:00.000Z',
          salary: '2008-11-28T00:00:00.000Z',
        },
        'Dec 2008': {
          bonus: '2008-12-15T00:00:00.000Z',
          salary: '2008-12-31T00:00:00.000Z',
        },
        'Jan 2009': {
          bonus: '2009-01-15T00:00:00.000Z',
          salary: '2009-01-30T00:00:00.000Z',
        },
        'Feb 2009': {
          bonus: '2009-02-18T00:00:00.000Z',
          salary: '2009-02-27T00:00:00.000Z',
        },
        'Mar 2009': {
          bonus: '2009-03-18T00:00:00.000Z',
          salary: '2009-03-31T00:00:00.000Z',
        },
        'Apr 2009': {
          bonus: '2009-04-15T00:00:00.000Z',
          salary: '2009-04-30T00:00:00.000Z',
        },
        'May 2009': {
          bonus: '2009-05-15T00:00:00.000Z',
          salary: '2009-05-29T00:00:00.000Z',
        },
        'Jun 2009': {
          bonus: '2009-06-15T00:00:00.000Z',
          salary: '2009-06-30T00:00:00.000Z',
        },
        'Jul 2009': {
          bonus: '2009-07-15T00:00:00.000Z',
          salary: '2009-07-31T00:00:00.000Z',
        },
        'Aug 2009': {
          bonus: '2009-08-19T00:00:00.000Z',
          salary: '2009-08-31T00:00:00.000Z',
        },
        'Sep 2009': {
          bonus: '2009-09-15T00:00:00.000Z',
          salary: '2009-09-30T00:00:00.000Z',
        },
        'Oct 2009': { bonus: '2009-10-15T00:00:00.000Z' },
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
