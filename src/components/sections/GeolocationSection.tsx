import GeolocationWeatherCard from '@/components/cards/GeolocationWeatherCard';
import Container from '@/components/Container';
import Geolocation from '@/types/Geolocation';

interface Props {
  geolocation: Geolocation | undefined;
}

function GeolocationSection({ geolocation }: Props) {
  return (
    <section
      className="relative z-1 py-8"
      aria-label="Your location"
    >
      <Container>
        <h2 className="mb-8 font-display font-bold leading-tight text-4xl">
          Your location
        </h2>
        {geolocation ? (
          <GeolocationWeatherCard geolocation={geolocation} />
        ) : (
          <p>Unable to retrieve location. Try again later</p>
        )}
      </Container>
    </section>
  );
}

export default GeolocationSection;
