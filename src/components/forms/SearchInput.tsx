import {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import City from '../../types/City';
import Geolocation from '../../types/Geolocation';
import ColorStyles from '../styles/ColorStyles';
import { BodyLarge } from '../styles/TextStyles';

const MIN_QUERY_LENGTH = 3;
const MAX_RESULTS = 5;

function toCityStringDisplay(city: City) {
  const cityStringDisplay = `${city.name} - ${city.country}`;
  return cityStringDisplay;
}

const InputWrapper = styled.label`
  position: relative;
  width: min(360px, 50%);
  height: 44px;
  display: relative;
  z-index: 1;

  @media only screen and (max-width: 744px) {
    width: 100%;
  }
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1rem;
  padding: 10px;
  padding-left: 44px;
  border-radius: 6px;
  color: ${ColorStyles.dark.text};
  background: ${ColorStyles.dark.card.background};
  border: ${ColorStyles.dark.card.border};
  box-shadow: ${ColorStyles.dark.card.shadow};
  backdrop-filter: blur(40px);

  &:placeholder-shown {
    color: ${ColorStyles.dark.text2};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 10px rgba(250, 251, 255, 0.4),
      inset 0 0 10px rgba(250, 251, 255, 0.4);
  }
`;

const SearchIcon = styled.img`
  width: 24px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const ResultsList = styled.ul`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  color: ${ColorStyles.dark.text};
  background: ${ColorStyles.dark.card.background};
  border: ${ColorStyles.dark.card.border};
  box-shadow: ${ColorStyles.dark.card.shadow};
  backdrop-filter: blur(40px);
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const ResultsItem = styled.li`
  cursor: pointer;
  width: 100%;
  padding: 8px;
  border-radius: 6px;

  &:hover {
    background: rgba(105, 25, 255, 1);
  }
`;

interface Props {
  cities: City[];
  setSelectedResult: Dispatch<SetStateAction<Geolocation | undefined>>;
}

function SearchInput({ cities, setSelectedResult }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);

  function clearSearch() {
    setQuery('');
    setResults([]);
  }

  const handleSelectResult = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const { latitude, longitude } = event.currentTarget.dataset;

      if (!latitude || !longitude) {
        return;
      }

      const selectedLocation: Geolocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };

      setSelectedResult(selectedLocation);
      clearSearch();
    },
    [setSelectedResult],
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);

  const handleBlur = useCallback(() => setIsFocused(false), []);

  const handleQueryChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      setQuery(value);

      const matchingCities: City[] = [];

      if (value.length >= MIN_QUERY_LENGTH) {
        for (
          let i = 0;
          i < cities.length && matchingCities.length < MAX_RESULTS;
          i++
        ) {
          const city = cities[i];

          const isMatch = toCityStringDisplay(city)
            .toLowerCase()
            .includes(value.toLowerCase());

          if (isMatch) {
            matchingCities.push(city);
          }
        }
      }

      setResults(matchingCities);
    },
    [cities],
  );

  return (
    <InputWrapper>
      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleQueryChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <SearchIcon src="/images/icons/search.svg" alt="Magnifier" />
      {query.length >= MIN_QUERY_LENGTH && isFocused && (
        <ResultsList role="list">
          {results.length > 0 ? (
            results.map((city) => (
              <ResultsItem
                key={city.id}
                onMouseDown={handleSelectResult}
                data-latitude={city.coord.lat}
                data-longitude={city.coord.lon}
              >
                {`${toCityStringDisplay(city)} [${city.coord.lat.toFixed(
                  2,
                )}, ${city.coord.lon.toFixed(2)}]`}
              </ResultsItem>
            ))
          ) : (
            <BodyLarge>No cities matching your query were found</BodyLarge>
          )}
        </ResultsList>
      )}
    </InputWrapper>
  );
}

export default SearchInput;
