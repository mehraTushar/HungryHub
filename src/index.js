import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './Components/Body';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Error from './Components/Error';
import About from './Components/About';
import Contact from './Components/Contact';
import ResturantMenu from './Components/ResturantMenu';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import Cart from './Components/Cart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Components/Login';
const MainContainer = () => {
  const client = new QueryClient();
  return (
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <div className="flex flex-col h-screen">
            <header>
              <Navbar />
            </header>
            <main className="relative flex-grow">
              <Outlet />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContainer />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Body /> },
      { path: '/home', element: <Body /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/cart', element: <Cart /> },
      { path: '/restaurant/:id', element: <ResturantMenu /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Login />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.querySelector('#root')).render(<RouterProvider router={router} />);
