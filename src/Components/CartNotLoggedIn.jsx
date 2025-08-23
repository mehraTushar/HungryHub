import { faCircleCheck, faCircleUser, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CartNotLoggedIn = ({ userId }) => {
  var userList = JSON.parse(useLocalStorage('userList') || '[]');

  var currUser = userList.find((user) => user.userId === userId);
  return (
    <>
      <div className="text-xl font-semibold">
        <span>{currUser ? 'Logged in' : 'Please Login'}</span>
        <FontAwesomeIcon
          icon={currUser ? faCircleCheck : faCircleXmark}
          size="xl"
          className={`${currUser ? 'text-green-500' : 'text-red-500'} ml-2`}
        />
      </div>
      <div className="text-xl font-semibold">
        {currUser ? `${currUser.userName} | ${currUser.userEmail}` : 'Username | Phone No'}
      </div>
      <div>
        <FontAwesomeIcon icon={faCircleUser} size="3x" className="absolute top-10 -left-8" />
        <div className="absolute top-20 w-0.5 h-full -left-2 bg-black"></div>
      </div>
    </>
  );
};
