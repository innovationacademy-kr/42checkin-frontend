import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CheckInPage from "../pages/CheckInPage";
import EndPage from "../pages/EndPage";
import NotFoundPage from "../pages/NotFoundPage";
import CheckInLog from "../checkin-admin/views/CheckInLog";
import CheckInSetting from "../checkin-admin/views/CheckInSetting";
import AuthRoute from "./hoc/Auth";

const AppRouter = () => {
  return (
    <Switch>
      <Route path='/' exact component={LandingPage} />
      <AuthRoute path='/checkin' exact component={CheckInPage} />
      <AuthRoute path='/end' exact component={EndPage} />
      <Route path='/admin/log' exact component={CheckInLog} />
      <Route path='/admin/setting' exact component={CheckInSetting} />
      <Redirect from='/submit' to='/checkin' />
      <Redirect from='/admin' to='/admin/log' />
      <AuthRoute component={NotFoundPage} />
    </Switch>
  );
};

export default AppRouter;
