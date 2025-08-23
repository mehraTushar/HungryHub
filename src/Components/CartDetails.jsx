import { useMemo } from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const CartDetails = ({ setTotalBill }) => {
  const { cartItems } = useSelector((state) => state.Resturant);

  // Group items by ResturantID
  const groupedItems = useMemo(() => {
    const grouped = cartItems.reduce((acc, item) => {
      const { ResturantID, ResturantName, ResturantAreaName } = item;
      if (!acc[ResturantID]) {
        acc[ResturantID] = { ResturantName, ResturantAreaName, items: [] };
      }
      acc[ResturantID].items.push(item);
      return acc;
    }, {});
    return Object.values(grouped);
  }, [cartItems]);

  const gstPercentage = 18;
  // Calculate item total and total to pay
  const itemTotal = useMemo(
    () => cartItems.reduce((acc, curr) => acc + (curr.price * curr.Quantity) / 100, 0).toFixed(2),
    [cartItems]
  );
  const gstAmount = useMemo(() => (itemTotal * gstPercentage) / 100, [itemTotal, gstPercentage]);

  // Assuming an additional service tax of 5%
  const serviceTaxPercentage = 5;
  const serviceTaxAmount = useMemo(() => (itemTotal * serviceTaxPercentage) / 100, [itemTotal, serviceTaxPercentage]);
  // Calculate total amount to pay
  const totalToPay = useMemo(() => {
    const total = Number(itemTotal) + gstAmount + serviceTaxAmount / 100;
    return total;
  }, [itemTotal, gstAmount, serviceTaxAmount, setTotalBill]);
  setTotalBill(totalToPay);

  // Dynamic className for cartItems height
  const cartHeightClass = useMemo(() => {
    switch (cartItems.length) {
      case 1:
        return 'h-22';
      case 2:
        return 'h-38';
      case 3:
      case 4:
        return 'h-54';
      default:
        return 'h-64';
    }
  }, [cartItems.length]);

  return (
    <div className="h-full w-96 p-6 shadow-2xl ml-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg">
      <div className={`flex flex-col gap-5 mt-4 overflow-y-auto ${cartHeightClass} cartItems`}>
        {groupedItems.map((group) => (
          <CartItem items={group} key={group.ResturantID} />
        ))}
      </div>

      <div className="my-5">
        <input
          placeholder="Any suggestions? We will pass it on..."
          className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="border border-gray-300 dark:border-gray-700 rounded-lg flex justify-center items-center gap-3 p-4 shadow-md">
        <input type="checkbox" className="self-start w-6 h-6 text-indigo-600 rounded" />
        <div>
          <p className="font-semibold">Opt in for No-contact Delivery</p>
          <p className="font-light text-sm text-gray-600 dark:text-gray-400">
            Unwell or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside
            your door (not for COD)
          </p>
        </div>
      </div>

      <div className="my-4">
        <p className="font-semibold text-lg">Bill Details</p>
        <div className="flex justify-between text-gray-800 dark:text-gray-200">
          <p>Item Total</p>
          <p>₹{itemTotal}</p>
        </div>
        <hr className="h-px my-6 bg-gray-200 dark:bg-gray-600 border-0" />
        <div className="flex justify-between text-gray-800 dark:text-gray-200">
          <p>GST ({gstPercentage}%)</p>
          <p>₹{gstAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-gray-800 dark:text-gray-200">
          <p>Service Tax ({serviceTaxPercentage}%)</p>
          <p>₹{serviceTaxAmount.toFixed(2)}</p>
        </div>
        <hr className="h-px my-6 bg-gray-200 dark:bg-gray-600 border-0" />
        <div className="flex justify-between text-gray-800 dark:text-gray-200">
          <p className="font-bold">To Pay</p>
          <p className="font-bold">₹{totalToPay.toFixed(2)}</p>
        </div>
        <hr className="h-px my-6 bg-gray-200 dark:bg-gray-600 border-0" />
        <div className="flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Review your order and address details to avoid cancellations
          </p>
          <p>
            <span className="text-red-500 mr-1">Note:</span>
            If you cancel within 60 seconds of placing your order, a 100% refund will be issued. No refund for
            cancellations made after 60 seconds.
          </p>
          <p>Avoid cancellation as it leads to food wastage.</p>
          <a className="text-red-500 underline font-semibold" href="#">
            Read cancellation policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
