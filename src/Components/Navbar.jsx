import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import { NavbarLinksArr } from '../config';
import ThemeToggle from './ThemeToggle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navbar = () => {
  const cartItemCount = useSelector((state) => {
    return state.Resturant.cartItems?.reduce((acc, currVal) => acc + currVal.Quantity, 0);
  });
  const [isLoggedIn, setisLoggedIn] = useState(useLocalStorage('loggedInUser') ?? false);
  function logoutFn() {
    useLocalStorage('loggedInUser', null, true);
    setisLoggedIn(false);
  }

  return (
    <nav className="Navbar mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 bg-white dark:bg-black">
      <Logo />
      <div>
        <ul className="navbarLinks flex gap-4 place-items-center">
          {NavbarLinksArr.map((link, index) =>
            link.name === 'Cart' ? (
              <li key={index}>
                <Link to={link.url} className="font-semibold flex text-black dark:text-white">
                  {link.name}
                  <svg
                    className="fill-white dark:fill-gray-600 stroke-slate-700 dark:stroke-gray-400 stroke-2 ml-2"
                    viewBox="-1 2 37 32"
                    height="25"
                    width="25"
                    fill="#686b78"
                  >
                    <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                    <text
                      x={cartItemCount <= 9 ? '12' : '8'}
                      y="23"
                      fill="black"
                      fontSize="20"
                      className="dark:fill-white"
                    >
                      {cartItemCount}
                    </text>
                  </svg>
                </Link>
              </li>
            ) : (
              <li key={index}>
                <Link to={link.url} className="font-semibold text-black dark:text-white">
                  {link.name}
                </Link>
              </li>
            )
          )}
          <ThemeToggle />
          {isLoggedIn ? (
            <button type="button" className="text-center" title="Logout" onClick={logoutFn}>
              <FontAwesomeIcon icon={faRightToBracket} className="px-1 text-xl " />
            </button>
          ) : (
            <Link
              to="/login"
              type="button"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
