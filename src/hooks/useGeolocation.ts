import { useCallback, useEffect, useState } from 'react';
import Geolocation from '../types/Geolocation';

function useGeolocation(options?: PositionOptions) {
  const [location, setLocation] = useState<Geolocation>();
  const [error, setError] = useState<string>();

  const handlePositionSuccess = useCallback((position: GeolocationPosition) => {
    const { coords } = position;
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  }, []);

  const handlePositionError = useCallback(
    (positionError: GeolocationPositionError) => {
      let errorMessage;

      switch (positionError.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          errorMessage = 'Permission denied';
          break;
        case GeolocationPositionError.TIMEOUT:
          errorMessage = 'Timed out';
          break;
        default:
          errorMessage = 'Location unavailable';
          break;
      }
      setError(errorMessage);
    },
    [],
  );

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      handlePositionSuccess,
      handlePositionError,
      options,
    );
  }, []);

  return [location, error] as const;
}

export default useGeolocation;
