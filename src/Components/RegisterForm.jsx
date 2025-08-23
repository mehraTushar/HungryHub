import React from 'react';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EmailRegex } from '../config';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSwal } from '../hooks/useSwal';
import { useSwalToast } from '../hooks/useSwalToast';

export const RegisterForm = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();
  var registerObj = {
    register,
    errors,
    getValues,
  };

  function obSubmit(data) {
    var { userName, userEmail, userPass } = data;
    var jsonUserList = JSON.parse(useLocalStorage('userList') || '[]');

    var isUserExist = jsonUserList.filter((user) => {
      return user.userEmail === userEmail;
    });
    if (isUserExist.length !== 0) {
      useSwal('Error', 'User With Same Email Already Exist', 'error');
      return;
    }
    useLocalStorage('userList', [...jsonUserList, { userId: crypto.randomUUID(), userName, userEmail, userPass }]);
    useSwalToast('success', 'New User Created Successfully');
    reset();
    navigate('/login');
  }

  return (
    <form onSubmit={handleSubmit(obSubmit)}>
      <p className="my-3">Please Regsiter your account</p>
      <div className="flex gap-2">
        <InputField id="userName" type="text" label="Name" placeholder="John" {...registerObj} />
        <InputField
          id="userEmail"
          type="email"
          label="Email"
          placeholder="john@gmail.com"
          {...registerObj}
          regex={EmailRegex}
        />
      </div>
      <div className="flex gap-2">
        <InputField id="userPass" type="password" label="New Password" placeholder="qwerty!@#" {...registerObj} />
        <InputField
          id="userConfirmPass"
          type="password"
          label="Confirm Password"
          placeholder="qwerty!@#"
          {...registerObj}
        />
      </div>

      <div className="mb-8 pb-1 pt-1 text-center">
        <button
          type="submit"
          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
          style={{
            background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
          }}
        >
          Register
        </button>
      </div>

      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Already Have An Account?</p>
        <button
          onClick={() => {
            setIsLogin((prev) => !prev);
            navigate('/login');
          }}
          type="button"
          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
        >
          Login
        </button>
      </div>
    </form>
  );
};
