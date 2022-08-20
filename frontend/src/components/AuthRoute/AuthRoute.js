import { Navigate } from 'react-router-dom';

const AuthRoute = ({ component: Component, redirectTo = '/edit', isAuthenticated }) =>
  isAuthenticated ? <Navigate to={redirectTo} /> : <Component />;

export default AuthRoute;
