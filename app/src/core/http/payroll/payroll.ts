import fileDownload from 'core/utils/fileDownload'
import fetch from '../base'

// TODO: Add error handling
// TODO: Add better naming to the csv file -> do this in the server?
export const downloadPayroll = (): Promise<void> => {
  return fetch
    .get('/payroll', { headers: { 'Content-Type': 'text/csv' } })
    .then((response) => response.text())
    .then((content) => fileDownload(content, 'payroll.csv', 'text/csv'))
}

export type PayrollJson = Record<string, { bonus?: string; salary?: string }>

// TODO: Add error handling
export const getPayroll = (): Promise<PayrollJson> => {
  return fetch.get('/payroll').then((response) => response.json())
}
