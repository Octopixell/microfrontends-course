import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'container'
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn])

  return <Router history={history}>
    <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              { !isSignedIn && <Redirect to={'/auth/signin'} /> }
              <DashboardApp />
            </Route>
            <Route path="/" component={MarketingApp} />
          </Switch>
        </Suspense>
      </div>
    </StylesProvider>
  </Router>
}