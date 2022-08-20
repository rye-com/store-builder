import { AppHeader } from 'components';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated ? (
    <div className="d-flex flex-column">
      <AppHeader />
      <Component />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
