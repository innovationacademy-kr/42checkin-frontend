import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getCookieValue, getTime } from './utils/utils';
import { login, logout } from './redux/modules/user';
import { setConfig } from './redux/modules/config';
import { setHeadCount } from './redux/modules/status';
import { getMaxCapacity, getUsingCard } from './api/api';

import LandingPage from './pages/LandingPage';
import CheckInPage from './pages/CheckInPage';
import EndPage from './pages/EndPage';
import NotFoundPage from './pages/NotFoundPage';
import CheckInLog from './checkin-admin/views/CheckInLog';
import CheckInSetting from './checkin-admin/views/CheckInSetting';

import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const styles = {
  info: {
    background: 'rgba(0, 0, 0, 0.5)',
    '& span': {
      fontSize: '0.6rem'
    }
  },
  title: {
    fontSize: '1rem',
    fontWeight: '800',
    fontFamily: 'D2Coding'
  }
};

const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { beginAt, endAt } = useSelector(state => ({
    beginAt: state.config.beginAt,
    endAt: state.config.endAt
  }));

  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  const getConfig = useCallback(async () => {
    try {
      const today = new Date();
      const response = await getMaxCapacity(today.toISOString().slice(0, 10));
      dispatch(
        setConfig({
          beginAt: getTime(response.data.begin_at),
          endAt: getTime(response.data.end_at),
          seocho: response.data.seocho,
          gaepo: response.data.gaepo
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const getHeadCount = useCallback(async () => {
    try {
      const response = await getUsingCard();
      dispatch(setHeadCount(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    const token = getCookieValue(process.env.REACT_APP_AUTH_KEY);
    if (!token) {
      dispatch(logout());
      getHeadCount();
    } else {
      dispatch(login());
    }
    getConfig();
  }, [dispatch, getConfig, getHeadCount]);

  return (
    <>
      <BrowserRouter>
        <div id='page-wrapper'>
          {window.location.pathname.split('/')[1] !== 'admin' && (
            <Alert severity='info' variant='filled' className={classes.info}>
              <AlertTitle className={classes.title}>
                운영 시간: {beginAt} ~ {endAt}
              </AlertTitle>
              <span>※ 사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
            </Alert>
          )}
          <Switch>
            <Route path='/' exact={true} component={LandingPage} />
            <Route path='/checkin' exact component={CheckInPage} />
            <Route path='/end' exact component={EndPage} />
            <Route path='/admin/log' exact component={CheckInLog} />
            <Route path='/admin/setting' exact component={CheckInSetting} />
            <Redirect from='/submit' to='/checkin' />
            <Redirect from='/admin' to='/admin/log' />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
      <footer id='version'>v{process.env.REACT_APP_VERSION}</footer>
    </>
  );
}

export default App;
