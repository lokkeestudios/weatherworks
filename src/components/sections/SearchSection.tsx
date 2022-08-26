import { useState } from 'react';
import styled from 'styled-components';
import City from '../../types/City';
import Geolocation from '../../types/Geolocation';
import WeatherCard from '../cards/WeatherCard';
import SearchInput from '../forms/SearchInput';
import Wrapper from '../styles/Wrapper';

const SectionWrapper = styled(Wrapper)`
  display: grid;
  row-gap: 30px;
  padding-block: 25px;

  @media only screen and (max-width: 744px) {
    row-gap: 20px;
  }
`;

function SearchSection() {
  const [selectedLocation, setSelectedLocation] = useState<Geolocation>();

  const cities: City[] = []; // PLACEHOLDER

  return (
    <SectionWrapper as="section">
      <SearchInput cities={cities} setSelectedResult={setSelectedLocation} />
      {selectedLocation && <WeatherCard location={selectedLocation} />}
    </SectionWrapper>
  );
}

export default SearchSection;
