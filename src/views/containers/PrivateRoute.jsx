import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../../store/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {

  const { curUser } = useAuth();

  console.log(curUser);

  return (
    <Route {...rest}
      render={props => (!!curUser ?
        <Component {...props} />
        :
        <Redirect to="/login" />
      )}
    />
  )
}
