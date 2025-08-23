import { useState, useEffect } from 'react';
import ShimmerCard from './Shimmer.jsx';
import { useFilterCard } from '../hooks/useFilterCard.js';
import { useRestaurant } from '../hooks/useRestaurant.js';
import Search from './Search';
import FilterCards from './FilterCard.jsx';
import NoMatch from './NoMatch.jsx';
import { Header } from './Header.jsx';
import Filter from './Filter.jsx';
import { useQuery } from '@tanstack/react-query';
import useLocation from '../hooks/useLocation.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Body = () => {
  const [searchText, setSearchText] = useState('');
  const [restaurantList, setRestaurantList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  const { latitude, longitude, loading: locationLoading } = useLocation();

  const query = useQuery({
    queryKey: ['Restaurant', latitude, longitude],
    queryFn: () => useRestaurant(latitude, longitude),
    enabled: !!latitude && !!longitude,
  });

  useEffect(() => {
    const filteredList = useFilterCard(searchText, restaurantList);
    setFilterList(filteredList);
  }, [searchText, restaurantList]);

  if (locationLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 dark:border-gray-200 mb-4"></div>
        <p className="text-xl font-semibold">Loading Location...</p>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="text-xl font-semibold">Error: {query.error.message}</div>
      </div>
    );
  }

  if (query.isLoading) {
    return <ShimmerCard />;
  }

  if (!query?.data?.finalData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 dark:border-gray-200 mb-4"></div>
        <p className="text-xl font-semibold">
          Please Allow Location... <button onClick={() => window.location.reload()}>Click To Refresh</button>
        </p>
      </div>
    );
  }

  const { restaurantData, headerData } = query?.data?.finalData;

  return (
    <>
      <Header headerList={headerData?.imageGridCards?.info} />
      <section className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 bg-white dark:bg-black text-black dark:text-white">
        <Search Text={searchText} SetText={setSearchText} />
        <Filter restaurantList={restaurantData} setFilterList={setFilterList} />
      </section>
      {restaurantData?.length === 0 ? (
        <NoMatch className="bg-white dark:bg-black text-black dark:text-white" />
      ) : (
        <FilterCards FilterResList={restaurantData} className="bg-white dark:bg-black text-black dark:text-white" />
      )}
    </>
  );
};

export default Body;
