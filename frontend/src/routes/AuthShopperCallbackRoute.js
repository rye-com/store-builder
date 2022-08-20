import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAuthContext } from 'context/AuthContext';
import { createApiCall } from 'api/call';
import { ExpiredAuthLink } from 'components/Auth/ExpiredAuthLink/ExpiredAuthLink';
import { getProductURL } from 'api/product';

export function AuthShopperCallbackRoute() {
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated } = useAuthContext();
  const [tokenValidated, setTokenValidated] = useState(false);

  if (!tokenValidated) {
    const token = searchParams.get('token');
    login(token);
    createApiCall({
      url: 'api/v1/account/validate-token',
      method: 'POST',
    }).then((e) => setTokenValidated(true));
    return null;
  }

  if (tokenValidated && isAuthenticated) {
    getProductURL(searchParams.get('productId'), searchParams.get('storeName')).then((link) =>
      window.location.replace(link)
    );

    return null;
  }

  return <ExpiredAuthLink />;
}
