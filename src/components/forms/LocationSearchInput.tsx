import SearchIcon from '@/components/icons/SearchIcon';
import useDebounce from '@/hooks/useDebounce';
import { QueryKeys } from '@/utils';
import getFilteredLocations from '@/utils/getFilteredLocations';
import { Combobox } from '@headlessui/react';
import { Location } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

const MAX_DISPLAYED_RESULTS = 5;
const QUERY_DEBOUNCE_TIME = 150;

function getSubstringOfResultWithoutQuery(result: string, query: string) {
  const substring = result.replace(new RegExp(query, 'i'), '');

  return substring;
}
function getQuerySubstringOfResult(result: string, query: string) {
  const substring = result.replace(
    getSubstringOfResultWithoutQuery(result, query),
    '',
  );

  return substring;
}

function LocationSearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_TIME);
  const {
    data: filteredLocations,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    QueryKeys.filteredLocations(debouncedQuery),
    () => getFilteredLocations(debouncedQuery, MAX_DISPLAYED_RESULTS),
    { enabled: Boolean(debouncedQuery.length !== 0) },
  );

  const router = useRouter();

  return (
    <Combobox
      as="div"
      onChange={(location: Location) =>
        router.push(`/locations/${location.id}`)
      }
      className="relative w-full rounded-t-lg border-0.5 border-neutrals-50/30 bg-neutrals-800/60 p-3 backdrop-blur-xl ui-not-open:rounded-b-lg md:w-1/2"
    >
      <label className="flex items-center">
        <SearchIcon className="mr-2 h-6 w-6 text-neutrals-300" />
        <Combobox.Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 bg-transparent outline-none placeholder:text-neutrals-300"
        />
        <div className="ml-2 hidden space-x-1 lg:block">
          <kbd className="rounded border border-b-2 border-neutrals-700 border-b-neutrals-900 bg-neutrals-800 py-0.5 px-2 font-semibold text-neutrals-300 shadow-lg text-xs">
            ⌘
          </kbd>
          <kbd className="rounded border border-b-2 border-neutrals-700 border-b-neutrals-900 bg-neutrals-800 py-0.5 px-2 font-display text-neutrals-300 shadow-lg text-xs">
            K
          </kbd>
        </div>
      </label>
      <Combobox.Options className="absolute left-0 top-12 flex w-full flex-col rounded-b-lg border-0.5 border-neutrals-50/30 bg-neutrals-800/60 p-3 backdrop-blur-xl">
        {isLoading && <p className="animate-pulse">Searching...</p>}
        {isError && <p>Unable to fetch results. Try again later</p>}
        {isSuccess &&
          (filteredLocations.length === 0 ? (
            <p>No locations matched your query</p>
          ) : (
            filteredLocations.map((location) => (
              <Combobox.Option
                key={location.id}
                value={location}
                className="cursor-pointer rounded-sm py-1 px-2 ui-active:bg-primary"
              >
                <span className="font-semibold">
                  {getQuerySubstringOfResult(location.name, debouncedQuery)}
                </span>
                {getSubstringOfResultWithoutQuery(
                  location.name,
                  debouncedQuery,
                )}
              </Combobox.Option>
            ))
          ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default LocationSearchInput;
