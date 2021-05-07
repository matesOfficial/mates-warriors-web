import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { AuthProvider } from '../../../store/AuthContext';
import PrivateRoute from "../../containers/PrivateRoute";
import PublicRoute from '../../containers/PublicRoute';
import Login from '../Auth/Login';
import Dashboard from '../Dashboard';
import Donors from '../Donors';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/donors" exact component={Donors} />
          <PublicRoute path="/login" exact component={Login} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
