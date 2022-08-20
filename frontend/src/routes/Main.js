import React, { lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

import AuthRoute from 'components/AuthRoute';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/Login';
import Edit from 'pages/Edit';
import View from 'pages/View';
import AuthCallbackRoute from './AuthCallbackRoute';
import { isSubDomain } from 'utils/helpers';
import { useAuthContext } from 'context/AuthContext';
import { AuthShopperCallbackRoute } from './AuthShopperCallbackRoute';
import { TermsOfServicePage } from 'pages/TermsOfService';
import { PrivacyPolicyPage } from 'pages/PrivacyPolicy';
import { AffiliateDisclosure } from 'pages/AffiliateDisclosure';
import { OperatorSpinner } from 'components';

const WalletLazy = lazy(() => import('pages/Wallet/WalletPage'));
const Wallet = () => {
  return (
    <React.Suspense fallback={<OperatorSpinner />}>
      <WalletLazy />
    </React.Suspense>
  );
};

const MainRoute = () => {
  const location = useLocation();
  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return;
    } else {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location.pathname, location.search]);

  const { isAuthenticated } = useAuthContext();
  const isView = isSubDomain();

  return (
    <Routes>
      {isView ? (
        <Route path="/" element={<View />} />
      ) : (
        <Route
          path="/"
          element={<AuthRoute isAuthenticated={isAuthenticated} component={Login} />}
        />
      )}
      <Route path="/shopperAuth" element={<AuthShopperCallbackRoute />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
      <Route
        path="/login"
        element={<AuthRoute isAuthenticated={isAuthenticated} component={Login} />}
      />
      <Route
        path="/edit"
        element={<PrivateRoute isAuthenticated={isAuthenticated} component={Edit} />}
      />
      <Route
        path="/wallet"
        element={<PrivateRoute isAuthenticated={isAuthenticated} component={Wallet} />}
      />
      <Route path="/authCallback" element={<AuthCallbackRoute />} />
    </Routes>
  );
};

export default MainRoute;
