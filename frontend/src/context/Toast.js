import { createContext, useContext, useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import { removeEmpty } from 'utils';

const ToastContext = createContext({
  show: false,
  message: {},
  setMessage: () => {},
});

export const useToastContext = () => useContext(ToastContext);

export const ToastContextProvider = ({ children }) => {
  const [message, setMessage] = useState({
    title: '',
    content: '',
    type: '',
  });

  const show = useMemo(() => !isEmpty(removeEmpty(message)), [message]);

  return (
    <ToastContext.Provider value={{ show, setMessage, message }}>{children}</ToastContext.Provider>
  );
};
