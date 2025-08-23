import AddItem from './AddItem';

const CartItem = ({ items }) => {
  console.log(items);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex-grow font-bold text-lg truncate text-gray-800 dark:text-gray-200 drop-shadow-lg">
        {items.ResturantName}
      </div>
      <div className="flex-grow truncate text-gray-800 dark:text-gray-200 drop-shadow-lg">
        {items.ResturantAreaName}
      </div>
      {items.items.map((item) => {
        return (
          <section key={item.Id}>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-600 dark:text-gray-400 font-semibold">{item.Name}</p>
              <AddItem
                item={item}
                cart={item.Quantity}
                className="font-bold bg-slate-50 float-end my-2 text-sm dark:bg-black dark:text-green-400 flex justify-evenly border border-gray-400 dark:border-gray-600 rounded"
              />
            </div>
            <p className="text-gray-800 dark:text-gray-200 font-semibold">₹{(item.price * item.Quantity) / 100}</p>
          </section>
        );
      })}
    </div>
  );
};

export default CartItem;
