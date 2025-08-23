import React, { useEffect, useState } from 'react';
import { LoginForm } from './LoginForm';
import Logo from './Logo';
import { RegisterForm } from './RegisterForm';
import { useLocation } from 'react-router-dom';
export const LeftContainerLogin = () => {
  const [islogin, setIsLogin] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.toLowerCase() === '/register') setIsLogin(false);
    else setIsLogin(true);
  }, [location.pathname]);

  return (
    <div className="px-4 md:px-0 lg:w-6/12">
      <div className="md:mx-6 md:p-12">
        <div className="text-center">
          <Logo />
          {/* <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">We are The Lotus Team</h4> */}
        </div>
        {islogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};
