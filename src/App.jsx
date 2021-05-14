import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';

import PrivateRoute from './views/containers/PrivateRoute';
import PublicRoute from './views/containers/PublicRoute';
import Login from './views/pages/Auth/Login';
import Home from './views/pages/Home';
import Profile from './views/pages/Profile';
import Donors from './views/pages/Donors';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <PrivateRoute path="/donors" exact component={Donors} />
          <PublicRoute path="/login" exact component={Login} />
          <Route path="*">
            <div>PAGE NOT FOUND</div>
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
