import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { parseCookie, setCookie } from 'utils/helpers';
import { DOMAIN_NAME } from 'config';
import { createApiCall, setLogoutEditorCallback } from 'api/call';
import { identify } from 'utils';

const AuthContext = createContext({
  isAuthenticated: false,
  logout: () => {},
  login: (token) => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const editorCookie = 'token';

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const cookie = parseCookie(document.cookie);
    const token = cookie[editorCookie];
    return token && token !== 'undefined';
  });

  const contextValue = useMemo(() => {
    const result = {
      isAuthenticated,
      logout: () => {
        setIsAuthenticated(false);
        setCookie(editorCookie, '', {
          domain: DOMAIN_NAME,
        });
      },
      login: async (token, asyncPreLoginAction) => {
        setCookie(editorCookie, token, {
          domain: DOMAIN_NAME,
        });

        if (asyncPreLoginAction) {
          await asyncPreLoginAction();
        }

        setIsAuthenticated(true);
        identify();
      },
    };

    setLogoutEditorCallback(result.logout);
    return result;
  }, [isAuthenticated]);

  useEffect(() => {
    window.heap.addEventProperties({
      isAuthenticated,
    });
  }, [isAuthenticated]);

  if (isAuthenticated) {
    // Validate token if authenticated. if not then user will be logged out automatically.
    createApiCall({
      url: 'api/v1/account/validate-token',
      method: 'POST',
    });
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
