import { useState, useEffect } from "react";
import { filterArrList } from "../config";
const Filter = ({ filterList, setFilterList, restaurantList }) => {
  const [ActiveFilter, SetActiveFilter] = useState([]);
  const filters = filterArrList;

  function HandelActiveFilter(CurrFilter) {
    if (ActiveFilter.includes(CurrFilter)) {
      SetActiveFilter(ActiveFilter.filter((res) => res !== CurrFilter));
    } else {
      SetActiveFilter([...ActiveFilter, CurrFilter]);
    }
    // console.log(ActiveFilter);
  }

  function filterAndSortRestaurants(filterList, setFilterList) {
    const sortRestaurants = [...filterList];
    sortRestaurants.sort((a, b) => {
      return a.info.sla.deliveryTime - b.info.sla.deliveryTime;
    });
    setFilterList(sortRestaurants);
  }

  function filterAndSortRestRating(filterList, setFilterList) {
    const sortRestaurants = [...filterList];
    sortRestaurants
      .sort((a, b) => {
        return a.info.avgRating - b.info.avgRating;
      })
      .reverse();
    console.log(sortRestaurants);
    setFilterList(sortRestaurants);
  }

  function filterItems(filterList, setFilterList) {
    if (!ActiveFilter.length) {
      setFilterList(restaurantList);
      return;
    }
    ActiveFilter.map((currFilter) => {
      switch (currFilter) {
        case "Delivery Time":
          filterAndSortRestaurants(filterList, setFilterList);
          break;
        case "Rating":
          filterAndSortRestRating(filterList, setFilterList);
          break;

        default:
          break;
      }
    });
    // setFilterList();
  }

  useEffect(() => {
    filterItems(filterList, setFilterList);
  }, [ActiveFilter]);

  return (
    <>
      <div className="filterSec flex justify-evenly items-center gap-10">
        <ul className="flex items-center gap-10 ">
          {filters.map((curr, i) => {
            return (
              <ListItem
                key={curr}
                onclick={() => HandelActiveFilter(curr)}
                className={`font-semibold hover:bg-gray-200 p-2 cursor-pointer rounded-lg ${
                  ActiveFilter.includes(curr)
                    ? "bg-gray-400 hover:bg-gray-400"
                    : ""
                }`}
              >
                {curr}
              </ListItem>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Filter;

function ListItem({ onclick, className, children }) {
  return (
    <li onClick={onclick} className={className}>
      {children}
    </li>
  );
}