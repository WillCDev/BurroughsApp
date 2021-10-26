import { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import SplashPage from 'pages/SplashPage'
import PayrollPage from 'pages/PayrollPage'

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SplashPage} />
      <Route path="/payroll" exact component={PayrollPage} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
)

export default App
