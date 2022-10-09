import WeatherCard from '@/components/cards/WeatherCard';
import Loader from '@/components/loaders/Loader';
import useGeolocation from '@/hooks/useGeolocation';

// const StyledSectionWrapper = styled(StyledWrapper)`
//   display: grid;
//   row-gap: 30px;
//   padding-block: 35px;

//   @media only screen and (max-width: 744px) {
//     row-gap: 20px;
//   }
// `;

// const StyledLoaderWrapper = styled.div`
//   --weather-icon-height: 128px;
//   --weather-card-padding-block: 25px;
//   --weather-card-border-width: 0.5px;
//   display: flex;
//   justify-content: center;

//   height: calc(
//     var(--weather-icon-height) + var(--weather-card-padding-block) * 2 +
//       var(--weather-card-border-width) * 2
//   );
// `;

function GeolocationSection() {
  const [location, error] = useGeolocation({
    maximumAge: 1000,
    timeout: 1000 * 10,
  });

  const isError = typeof error !== 'undefined';
  const isLoading = !location;

  return (
    <section
      className="py-8"
      aria-label="Your location"
    >
      <h2>Your location</h2>
      {isError && <p>Unable to retrieve location. Try again later</p>}
      {!isError && isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {!isError && !isLoading && <WeatherCard geolocation={location} />}
    </section>
  );
}

export default GeolocationSection;
