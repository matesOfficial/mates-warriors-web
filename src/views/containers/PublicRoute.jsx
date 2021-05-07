import { Redirect, Route } from 'react-router';
import { useAuth } from '../../store/AuthContext';

export default function PublicRoute({ component: Component, ...rest }) {

  const { curUser } = useAuth();

  return (
    <Route {...rest}
      render={props =>
      (!curUser ?
        <Component {...props} />
        :
        <Redirect to="/" />
      )}
    />
  )
}