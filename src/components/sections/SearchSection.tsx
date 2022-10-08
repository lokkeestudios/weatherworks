import WeatherCard from '@/components/cards/WeatherCard';
import SearchCityInput from '@/components/forms/SearchCityInput';
import { useState } from 'react';

function SearchSection() {
  const [selectedCityId, setSelectedCityId] = useState<number>();

  return (
    <section className="py-8">
      <SearchCityInput setSelectedResult={setSelectedCityId} />
      {selectedCityId && <WeatherCard cityId={selectedCityId} />}
    </section>
  );
}

export default SearchSection;
