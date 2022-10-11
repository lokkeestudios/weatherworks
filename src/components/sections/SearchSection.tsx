import WeatherCard from '@/components/cards/WeatherCard';
import Container from '@/components/Container';
import SearchLocationInput from '@/components/forms/SearchLocationInput';
import { useState } from 'react';

function SearchSection() {
  const [selectedCityId, setSelectedCityId] = useState<number>();

  return (
    <section
      className="relative z-1 py-8"
      aria-label="Location search"
    >
      <Container>
        <SearchLocationInput setSelectedResult={setSelectedCityId} />
        {selectedCityId && <WeatherCard cityId={selectedCityId} />}
      </Container>
    </section>
  );
}

export default SearchSection;
