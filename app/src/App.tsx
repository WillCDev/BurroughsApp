import { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import SplashPage from 'pages/SplashPage'

const App: FC = () => (
      <BrowserRouter>
      <Switch>
        <Route path="/" component={SplashPage} />
        <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
)

export default App
