import CartCard from './CartCard';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { faLocationDot, faWallet, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import CartDetails from './CartDetails';
import CartEmpty from './CartEmpty';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartNotLoggedIn } from './CartNotLoggedIn';
import useLocation from '../hooks/useLocation';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSwalToast } from '../hooks/useSwalToast';
import { reset } from '../Features/Cart/ResturantSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const cartList = useSelector((state) => state.Resturant.cartItems);
  const userId = useLocalStorage('loggedInUser');
  const [address, setAddress] = useState('');
  const { latitude, longitude, loading: locationLoading } = useLocation();
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    if (latitude && longitude && !locationLoading) {
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=82506e379b8446e8a633673faa199756`
      )
        .then((response) => response.json())
        .then((result) => setAddress(result.features[0].properties.formatted))
        .catch((error) => console.log('Error fetching address:', error));
    }
  }, [latitude, longitude, locationLoading]);

  const handlePayment = () => {
    Swal.fire({
      title: 'Payment',
      html: `
        <form id="paymentForm">
          <div class="relative mb-6">
            <input id="cardNumber" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Card Number">
          </div>
          <section class='flex justify-start gap-2'>
            <div class="relative mb-6">
              <input id="expiryDate" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Expiry Date (MM/YY)">
            </div>
            <div class="relative mb-6">
              <input id="cvv" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CVV">
            </div>
          </section>
          <button id="payButton" type="button" class="swal2-confirm swal2-styled" style="width: 100%; margin-top: 1rem;">
            Pay ₹${totalBill.toFixed(2)}
          </button>
        </form>
      `,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-swal-width',
      },
      didOpen: () => {
        document.getElementById('payButton').addEventListener('click', () => {
          const cardNumber = document.getElementById('cardNumber').value.trim();
          const expiryDate = document.getElementById('expiryDate').value.trim();
          const cvv = document.getElementById('cvv').value.trim();

          // Validate card number
          const cardNumberRegex = /^[0-9]{16}$/;
          if (!cardNumberRegex.test(cardNumber)) {
            Swal.showValidationMessage('Invalid card number. Please enter a 16-digit card number.');
            return;
          }

          // Validate expiry date
          const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
          if (!expiryDateRegex.test(expiryDate)) {
            Swal.showValidationMessage('Invalid expiry date. Please enter in MM/YY format.');
            return;
          }

          // Validate CVV
          const cvvRegex = /^[0-9]{3,4}$/;
          if (!cvvRegex.test(cvv)) {
            Swal.showValidationMessage('Invalid CVV. Please enter a 3 or 4-digit CVV.');
            return;
          }
          useSwalToast('success', `Your payment of ₹${totalBill.toFixed(2)} was successful!`);
          dispatch(reset());
          navigate('/home');
        });
      },
    });
  };

  if (cartList.length === 0) {
    return <CartEmpty />;
  }

  return (
    <section className="mx-auto max-w-7xl p-6 lg:px-8 flex bg-white dark:bg-black text-black dark:text-white">
      <div className="flex flex-col gap-10 flex-grow">
        <CartCard>
          <CartNotLoggedIn userId={userId} />
        </CartCard>
        <CartCard>
          <div className="text-xl font-semibold">
            Delivery address
            <FontAwesomeIcon icon={faCircleCheck} size="xl" className="text-green-500 ml-2" />
          </div>
          <div className="text-xl font-semibold">{locationLoading ? 'Fetching Location...' : address}</div>
          <div>
            <FontAwesomeIcon icon={faLocationDot} size="3x" className="absolute top-10 -left-6" />
            <div className="absolute top-20 w-0.5 h-full -left-2 bg-black"></div>
          </div>
        </CartCard>
        <CartCard>
          <div className="text-xl font-semibold">Choose payment method</div>
          <button
            className="bg-green-500 font-bold text-white text-xl p-6 rounded"
            onClick={() => handlePayment(totalBill)}
          >
            Proceed To Pay
          </button>
          <div>
            <FontAwesomeIcon icon={faWallet} size="3x" className="absolute top-10 -left-9" />
          </div>
        </CartCard>
      </div>
      <CartDetails setTotalBill={setTotalBill} />
    </section>
  );
};

export default Cart;
