import { createContext, useState, useEffect } from 'react';
import { getCookieValue } from '../utils/utils';

const LoginContext = createContext({});

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = getCookieValue(process.env.REACT_APP_AUTH_KEY);
    if (!token) setIsLogin(false);
    else setIsLogin(true);
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
