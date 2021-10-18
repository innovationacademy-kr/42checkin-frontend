import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CheckInPage from "../pages/CheckInPage";
import EndPage from "../pages/EndPage";
import NotFoundPage from "../pages/NotFoundPage";
import CheckInLog from "../checkin-admin/views/CheckInLog";
import CheckInSetting from "../checkin-admin/views/CheckInSetting";

const AppRouter = () => {
  return (
    <Switch>
      <Route path='/' exact component={LandingPage} />
      <Route path='/checkin' exact component={CheckInPage} />
      <Route path='/end' exact component={EndPage} />
      <Route path='/admin/log' exact component={CheckInLog} />
      <Route path='/admin/setting' exact component={CheckInSetting} />
      <Redirect from='/submit' to='/checkin' />
      <Redirect from='/admin' to='/admin/log' />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default AppRouter;
