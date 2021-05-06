import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { auth } from "../../../firebase";
import { setCurUser } from '../../../store/auth';
import Login from '../Auth/Login';
import Dashboard from '../Dashboard';
import Donors from '../Donors';
import PrivateRoute from "../../containers/PrivateRoute"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      dispatch(setCurUser(user));
    })
    return unsubscribe;
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/donors" exact component={Donors} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
