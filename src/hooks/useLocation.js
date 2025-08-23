import { useState, useEffect } from 'react';

const useLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLocationAccess();
  }, []);

  const checkLocationAccess = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
      }
    );
  };

  const handleLocationPermission = () => {
    setLoading(true);
    checkLocationAccess();
  };

  return { latitude, longitude, loading, handleLocationPermission };
};

export default useLocation;
