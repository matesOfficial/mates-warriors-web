import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import { useAuth } from '../../store/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {

  const { curUser } = useAuth();

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
