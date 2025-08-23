import { useState, useEffect } from 'react';
import { filterArrList } from '../config';

const Filter = ({ setFilterList, restaurantList }) => {
  const [activeFilter, setActiveFilter] = useState('');

  function handleActiveFilter(e) {
    const currFilter = e.target.value;
    setActiveFilter(currFilter);
  }

  function filterAndSortRestaurants(list) {
    return [...list].sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime);
  }

  function filterAndSortRestRating(list) {
    return [...list].sort((a, b) => b.info.avgRating - a.info.avgRating);
  }

  function filterAndSortRestLowToHigh(list) {
    return [...list].sort(
      (a, b) => parseInt(a.info.costForTwo.match(/\d+/g)) - parseInt(b.info.costForTwo.match(/\d+/g))
    );
  }

  function filterAndSortRestHighToLow(list) {
    return [...list].sort(
      (a, b) => parseInt(b.info.costForTwo.match(/\d+/g)) - parseInt(a.info.costForTwo.match(/\d+/g))
    );
  }

  function filterItems(list) {
    switch (activeFilter) {
      case 'Delivery Time':
        return filterAndSortRestaurants(list);
      case 'Rating':
        return filterAndSortRestRating(list);
      case 'Low To High':
        return filterAndSortRestLowToHigh(list);
      case 'High To Low':
        return filterAndSortRestHighToLow(list);
      default:
        return list;
    }
  }

  useEffect(() => {
    if (activeFilter) {
      const sortedList = filterItems(restaurantList);
      setFilterList(sortedList);
    }
  }, [activeFilter, restaurantList, setFilterList]);

  return (
    <div className="filterSec flex justify-evenly items-center gap-1">
      <select
        className="filter-select p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
        onChange={handleActiveFilter}
      >
        {filterArrList.map((curr) => (
          <option key={curr} className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            {curr}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
