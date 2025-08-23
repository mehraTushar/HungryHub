import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Search = ({ Text, SetText }) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Search By Name"
        className="h-10 w-auto rounded-md bg-gray-50 dark:bg-gray-800 px-4 font-thin outline-4 border-black border-2 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
        value={Text}
        onChange={(e) => {
          SetText(e.target.value);
        }}
      />
    </div>
  );
};

export const ExpandSearchBar = ({ searchMenu, setSearchMenu, setIsSearchActive }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search By Name"
        className="h-10 w-auto rounded-md bg-gray-50 dark:bg-gray-800 px-4 font-thin outline-4 border-black border-2 drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
        value={searchMenu}
        onChange={(e) => {
          setSearchMenu(e.target.value);
        }}
        // onClick={() => setIsSearchActive(false)}
      />
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute top-3 right-2 cursor-pointer z-10 text-gray-700 dark:text-white"
        onClick={() => {
          setIsSearchActive(false);
          setSearchMenu('');
        }}
      />
    </>
  );
};

export default Search;
