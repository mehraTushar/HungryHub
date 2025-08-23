import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div>
      <Link key="logoLink" to="/home" className="flex mx-auto items-center justify-between gap-2 text-2xl">
        <h1 className="mainHeading font-bold">Hungry Hub</h1>
        <FontAwesomeIcon icon={faBurger} size="lg" aria-label="Burger Icon" />
      </Link>
    </div>
  );
};

export default Logo;
