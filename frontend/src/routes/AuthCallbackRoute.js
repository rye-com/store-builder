import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { useAuthContext } from 'context/AuthContext';

const AuthCallbackRoute = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated, login } = useAuthContext();

  useEffect(() => {
    const token = searchParams.get('token');
    login(token);
  }, [login, searchParams]);

  if (isAuthenticated) {
    return <Navigate to="/edit" />;
  }

  return null;
};

export default AuthCallbackRoute;
