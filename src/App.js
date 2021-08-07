import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CheckInPage from './pages/CheckInPage';
import EndPage from './pages/EndPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <div id='page-wrapper'>
          <Switch>
            <Route path='/' exact={true} component={LandingPage} />
            <Route path='/checkin' component={CheckInPage} />
            <Route path='/end' component={EndPage} />
            <Route path='/admin' component={AdminPage} />
            <Redirect from='/submit' to='/checkin' />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
      <footer id='version'>v{process.env.REACT_APP_VERSION}</footer>
    </>
  );
}

export default App;
