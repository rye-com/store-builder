import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Spinner from 'react-bootstrap/Spinner';

import { Button, Input } from 'components';
import { AuthPageLayout } from 'components/Auth/AuthPageLayout/AuthPageLayout';
import { createApiCall } from 'api/call';
import { useAuthContext } from 'context/AuthContext';
import { getStoreBuilderURL } from 'utils';
import { createStore } from 'api';
import './style.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secondLogin, setSecondLogin] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const { login } = useAuthContext();

  const handleEmailChange = useCallback((email) => {
    setEmail(email);
  }, []);

  const handleGetStartedClick = useCallback(
    (e) => {
      e.preventDefault();

      if (email) {
        let token = '';
        setIsLoading(true);
        const data = {
          email_address: email,
          redirect_url: getStoreBuilderURL('authCallback'),
          device_fingerprint: uuidv4(),
        };
        setLoadingMsg('Bringing up your store & wallet');
        createApiCall({
          url: 'api/v1/account/create',
          method: 'POST',
          data,
        }).then((data) => {
          if (data?.magiclink && data?.magiclink === 'sent') {
            setIsLoading(false);
            setSecondLogin(true);
          } else {
            token = data?.jwt;
            if (!token) {
              setIsLoading(false);
              setLoadingMsg('');
              // TODO notification about error
              return;
            }
            setLoadingMsg('Generating your store');
            login(token, createStore);
          }
        });
      }
    },
    [email, login]
  );

  return (
    <AuthPageLayout>
      {!secondLogin ? (
        <form onSubmit={handleGetStartedClick} className="d-flex flex-column">
          <div className="home-title">First, enter your email</div>
          <Input
            placeholder="Enter your email address"
            type="email"
            onChange={handleEmailChange}
            id="influencer-login-email-address-input"
            autoFocus
          />
          <Button
            className="mt-3"
            type="submit"
            disabled={isLoading}
            id="influencer-login-get-started-button"
          >
            {isLoading ? (
              <div className="home-spinner-wrapper">
                <Spinner animation="border" role="status" size="sm" />
                <span>{loadingMsg}</span>
              </div>
            ) : (
              'Get Started'
            )}
          </Button>
          <div className="home-desc">
            By clicking “Get started” above, you acknowledge that you have read and understood, and
            agree to Rye’s <a href="/terms-of-service">Terms and Conditions</a> and{' '}
            <a href="/privacy-policy">Privacy Policy</a>.
          </div>
        </form>
      ) : (
        <div className="home-title">Please check the link in your email to login</div>
      )}
    </AuthPageLayout>
  );
};

export default Login;
