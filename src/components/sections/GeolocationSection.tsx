import WeatherCard from '@/components/cards/WeatherCard';
import Container from '@/components/Container';
import useGeolocation from '@/hooks/useGeolocation';

function GeolocationSection() {
  const [location, error] = useGeolocation({
    maximumAge: 1000,
    timeout: 1000 * 10,
  });

  const isError = typeof error !== 'undefined';
  const isLoading = !location;

  return (
    <section
      className="relative z-1 py-8"
      aria-label="Your location"
    >
      <Container>
        <h2 className="mb-8 font-display font-bold leading-tight text-4xl">
          Your location
        </h2>
        {isError && <p>Unable to retrieve location. Try again later</p>}
        {!isError && isLoading && (
          <div>
            <p>[PH] Loading...</p>
          </div>
        )}
        {!isError && !isLoading && <WeatherCard geolocation={location} />}
      </Container>
    </section>
  );
}

export default GeolocationSection;
