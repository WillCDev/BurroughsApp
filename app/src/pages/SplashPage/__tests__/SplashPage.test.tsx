import { render } from '@testing-library/react'
import SplashPage from '../SplashPage'

describe('SplashPage', () => {
  it('should render the title page', () => {
    const { getByTestId } = render(<SplashPage />)
    expect(getByTestId('titleBanner')).toHaveTextContent(
      'WillCorpProductivity Tools'
    )
  })

  it('should render a button for viewing the payroll table', () => {
    const { getByText } = render(<SplashPage />)
    expect(getByText('Payroll Viewer')).toBeInTheDocument()
  })

  it('should render a button for downloading the payroll CSV', () => {
    const { getByText } = render(<SplashPage />)
    expect(getByText('Download Payroll as CSV')).toBeInTheDocument()
  })

  // TODO: Write tests for the buttons
})
