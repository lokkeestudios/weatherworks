import Loader from '@/components/loaders/Loader';
import getFilteredLocations from '@/proxies/getFilteredLocations';
import { Location } from '@prisma/client';
import Image from 'next/image';
import {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { BiSearch as SearchIcon } from 'react-icons/bi';

const MIN_QUERY_LENGTH = 3;
const MAX_DISPLAYED_RESULTS = 5;

/* start utility function */
/* function toLocationStringDisplay(location ...) {
  const { name, state, country } = city;

  const cityStringDisplay = `${name}${state ? `, ${state}` : ''}${
    country ? ` - ${country}` : ''
  }`;
  return cityStringDisplay;
} */

function toMarkup(innerHtml: string) {
  return { __html: innerHtml };
}

function highlightQuery(text: string, highlight: string) {
  const computedText = text.replace(
    new RegExp(highlight, 'i'),
    (substringMatch) => `<span>${substringMatch}</span>`,
  );

  return computedText;
}
/* end utility function */

// enum SearchStatus { 'loading', 'error', 'success', 'no-results', 't' };

interface Props {
  setSelectedResult: Dispatch<SetStateAction<number | undefined>>;
}

function SearchInput({ setSelectedResult }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  // const [status, setStatus] = useState<SearchStatus>('loading');

  function clearSearch() {
    setQuery('');
    setResults([]);
  }

  const handleSelectResult = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const { cityId } = event.currentTarget.dataset;

      if (!cityId) {
        return;
      }

      const cityIdNum = parseInt(cityId, 10);

      setSelectedResult(cityIdNum);
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
      setResults([]);

      if (value.length >= MIN_QUERY_LENGTH) {
        // setStatus('loading');
        getFilteredLocations(value, MAX_DISPLAYED_RESULTS)
          .then((response) => {
            setResults(response.data);
            // setStatus('success');
          })
          .catch(() => new Error() /* setStatus('error') */);
      }
    },
    [],
  );

  /*
  const isQueryTooShortStatus;
  const blabla;
  const isLoadingStatus;
  */
  const isError = false; // placeholder
  const isResultsListShown = query.length >= MIN_QUERY_LENGTH && isFocused;

  return (
    <div className="relative w-full rounded-lg border-0.5 border-neutrals-50/30 bg-neutrals-800/60 p-3 backdrop-blur-xl md:w-1/2">
      <label className="flex">
        <SearchIcon
          className="mr-2 text-neutrals-300"
          size={24}
        />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleQueryChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="flex-1 bg-transparent outline-none placeholder:text-neutrals-300"
        />
      </label>
      {isResultsListShown && (
        <ul className="absolute top-16">
          {isError && <p>Unable to fetch results. Try again later</p>}
          {!isError && results.length === 0 && (
            <div>
              <Loader />
            </div>
          )}
          {!isError &&
            results.map((result) => (
              <li
                key={result.id}
                style={{ display: 'flex' }}
              >
                <Image
                  src="/images/icons/location.svg"
                  width={20}
                  height={20}
                />
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  key={result.id}
                  onMouseDown={handleSelectResult}
                  data-city-id={result.id}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={toMarkup(
                    highlightQuery(result.name, query),
                  )}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
