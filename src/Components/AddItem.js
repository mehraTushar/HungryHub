import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../Features/Cart/CartSlice";
const AddItem = ({ setIsaddActive }) => {
  const dispatch = useDispatch();
  const [ItemCount, SetItemCount] = useState(1);
  return (
    <div className="bg-slate-50 text-green-500 flex gap-5 justify-evenly py-2 px-4 absolute -bottom-2 border border-gray-400 left-14 font-bold rounded">
      <button className="">
        <FontAwesomeIcon
          icon={faMinus}
          onClick={() => {
            ItemCount > 1
              ? SetItemCount((cnt) => cnt - 1)
              : setIsaddActive(false);
            dispatch(removeItem());
          }}
        />
      </button>
      <span>{ItemCount}</span>
      <button>
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => {
            SetItemCount((cnt) => cnt + 1);
            dispatch(addItem());
          }}
        />
      </button>
    </div>
  );
};
export default AddItem;
