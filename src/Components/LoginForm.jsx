import React from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EmailRegex } from '../config';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSwalToast } from '../hooks/useSwalToast';
import { useSwal } from '../hooks/useSwal';

export const LoginForm = ({ setIsLogin }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const registerObj = {
    register,
    errors,
    getValues,
  };

  function onSubmit(data) {
    const { userEmail, userPass, userName } = data;
    const userList = JSON.parse(useLocalStorage('userList') || '[]');

    const user = userList.find((user) => user.userEmail === userEmail);

    if (!user) {
      useSwalToast('error', 'No User Found! Please Register');
      return;
    }

    if (user.userPass !== userPass) {
      useSwalToast('error', 'Please Enter Correct Password');
      return;
    }

    useLocalStorage('loggedInUser', user?.userId);
    navigate('/home');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="my-3">Please login to your account</p>
      <InputField
        id="userEmail"
        type="email"
        label="Email"
        placeholder="john@gmail.com"
        {...registerObj}
        regex={EmailRegex}
      />
      <InputField id="userPass" type="password" label="Password" placeholder="qwerty!@#" {...registerObj} />

      <div className="mb-8 pb-1 pt-1 text-center">
        <button
          type="submit"
          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
          style={{
            background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
          }}
        >
          Log in
        </button>

        {/* <!--Forgot password link--> */}
        {/* <a href="#!">Forgot password?</a> */}
      </div>

      {/* <!--Register button--> */}
      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Don't have an account?</p>
        <button
          onClick={() => {
            setIsLogin((prev) => !prev);
            navigate('/register');
          }}
          type="button"
          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
        >
          Register
        </button>
      </div>
    </form>
  );
};
