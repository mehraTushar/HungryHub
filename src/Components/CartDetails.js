import { useState } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

const CartDetails = () => {
  const cartList = useSelector((state) => state.cart.cartItems);

  return (
    <div className=" h-full w-96 p-6 shadow-2xl ml-8">
      <div className="flex justify-start items-center gap-3">
        <div className=" w-16">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/ghemfhdccguwa9bjjzxu"
            className=""
          />
        </div>
        <div>
          <p className=" font-semibold text-xl">Resturant Name</p>
          <p className=" text-lg">Address</p>
        </div>
      </div>
      <div
        className={`flex flex-col gap-5 mt-4 overflow-y-auto ${
          cartList.length === 1
            ? "h-22"
            : cartList.length === 2
            ? "h-38"
            : cartList.length === 3
            ? "h-54"
            : cartList.length === 4
            ? "h-54"
            : "h-64"
        } cartItems`}
      >
        {cartList?.map((item) => (
          <CartItem item={item} key={item.Id} />
        ))}
      </div>

      <div className=" my-5">
        <input
          placeholder="Any suggestions? We will pass it on..."
          className="w-full focus:outline-none"
        />
      </div>
      <div className="border border-black flex justify-center items-center gap-3 p-4">
        <input type="checkbox" className=" self-start w-16 h-10" />
        <div>
          <p className=" font-semibold">Opt in for No-contact Delivery </p>
          <p className=" font-light">
            Unwell or avoiding contact? Please select no-contact delivery.
            Partner will safely place the order outside your door (not for COD)
          </p>
        </div>
      </div>
      <div className=" my-4">
        <p className="font-semibold">Bill Details</p>
        <div className="flex justify-between">
          <p>Item Total</p>
          <p>
            ₹
            {cartList
              ?.reduce(
                (acc, curr) => acc + (curr?.price * curr?.Quantity) / 100,
                0
              )
              .toFixed(2)}
          </p>
        </div>
        <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400"></hr>
        <div className="flex justify-between">
          <p>Delivery Fee for 6.4 kms</p>
          <p>$3760</p>
        </div>
        <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400"></hr>
        <div className="flex justify-between">
          <p className=" font-bold">To Pay</p>
          <p className=" font-bold">
            ₹
            {cartList
              ?.reduce(
                (acc, curr) => acc + (curr?.price * curr?.Quantity) / 100,
                0
              )
              .toFixed(2)}
          </p>
        </div>
        <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400"></hr>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">
            Review your order and address details to avoid cancellations
          </p>
          <p>
            <span className=" text-red-500 mr-1">Note:</span>
            If you cancel within 60 seconds of placing your order, a 100% refund
            will be issued. No refund for cancellations made after 60 seconds.
          </p>
          <p>Avoid cancellation as it leads to food wastage.</p>
          <a className=" text-red-500 underline font-semibold" href="#">
            Read cancellation policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
