import GeolocationWeatherCard from '@/components/cards/GeolocationWeatherCard';
import Container from '@/components/Container';
import LocationIcon from '@/components/icons/LocationIcon';
import useGeolocation from '@/hooks/useGeolocation';

function GeolocationSection() {
  const { geolocation, error, isLoading, refetchGeolocation } =
    useGeolocation();

  const isGeolocationDisplayed = !isLoading && !error && geolocation;
  const isErrorMessageDisplayed = !isLoading && error && !geolocation;
  const isGeolocationButtonDisplayed = !isLoading && !error && !geolocation;

  return (
    <section
      className="relative z-1 py-8"
      aria-label="Your location"
    >
      <Container>
        <h2 className="mb-8 font-display font-bold leading-tight text-4xl">
          Your location
        </h2>
        {isGeolocationDisplayed && (
          <GeolocationWeatherCard geolocation={geolocation} />
        )}
        {isLoading && <p className="animate-pulse">Locating...</p>}
        {isErrorMessageDisplayed && <p>Unable to retrieve location: {error}</p>}
        {isGeolocationButtonDisplayed && (
          <button
            type="button"
            onClick={refetchGeolocation}
            className="flex items-center rounded-lg border-0.5 border-neutrals-50/30 bg-neutrals-800/60 p-3 backdrop-blur-xl"
          >
            <LocationIcon className="mr-2 h-5 w-5" /> Retrieve weather for my
            location
          </button>
        )}
      </Container>
    </section>
  );
}

export default GeolocationSection;
