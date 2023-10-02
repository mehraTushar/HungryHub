import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
function MenuCategory({ item, Resturant, index }) {
  const [active, setActive] = useState(false);

  function toggleActive(e) {
    e.stopPropagation();
    setActive(() => !active);
  }

  useEffect(() => {
    if (index === 0) {
      setActive(() => !active);
    }
  }, []);
  return (
    <>
      <h2 onClick={toggleActive}>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 pl-0 font-medium text-left rounded-t-xl border-b-2 hover:bg-gray-100"
        >
          <span className="font-bold text-black">{item.card.card.title}</span>
          {active ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </button>
      </h2>
      {active && (
        <div className="p-5 pl-0 ">
          {/* {console.log(item?.card)} */}
          {item?.card?.card?.itemCards?.map((menuItem) => {
            return (
              <>
                <MenuItem
                  Resturant={Resturant}
                  Item={menuItem.card.info}
                  key={menuItem.card.info.id}
                ></MenuItem>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}

export default MenuCategory;
