import Geolocation from '@/types/Geolocation';
import { useCallback, useEffect, useState } from 'react';

const errorMesages = {
  permissionDenied: 'Permission denied',
  timeout: 'Timed out',
  uavailable: 'Location unavailable',
  unsupported: 'Not supported by your browser',
};

function useGeolocation() {
  const [geolocation, setGeolocation] = useState<Geolocation>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePositionSuccess = useCallback((position: GeolocationPosition) => {
    const { coords } = position;
    setGeolocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    setIsLoading(false);
  }, []);

  const handlePositionError = useCallback(
    (positionError: GeolocationPositionError) => {
      let errorMessage;

      switch (positionError.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          errorMessage = errorMesages.permissionDenied;
          break;
        case GeolocationPositionError.TIMEOUT:
          errorMessage = errorMesages.timeout;
          break;
        default:
          errorMessage = errorMesages.uavailable;
          break;
      }
      setError(errorMessage);
      setIsLoading(false);
    },
    [],
  );

  const refetchGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(errorMesages.unsupported);
      return;
    }

    setIsLoading(true);

    const maximumAge = 1000;
    const timeout = 1000 * 10;

    navigator.geolocation.getCurrentPosition(
      handlePositionSuccess,
      handlePositionError,
      {
        maximumAge,
        timeout,
      },
    );
  }, [handlePositionError, handlePositionSuccess]);

  useEffect(() => {
    if (!navigator.permissions || !navigator.permissions.query) return;

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((geolocationPermission) => {
        if (geolocationPermission.state === 'granted') {
          refetchGeolocation();
        } else if (geolocationPermission.state === 'denied') {
          setError(errorMesages.permissionDenied);
        }
      })
      .catch(() => {});
  }, [refetchGeolocation]);

  return { geolocation, error, isLoading, refetchGeolocation };
}

export default useGeolocation;
