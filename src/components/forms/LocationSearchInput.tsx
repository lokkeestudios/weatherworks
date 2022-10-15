import SearchIcon from '@/components/icons/SearchIcon';
import getFilteredLocations from '@/proxies/getFilteredLocations';
import { Combobox } from '@headlessui/react';
import { Location } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MAX_DISPLAYED_RESULTS = 5;

function getQuerySubstringOfResult(result: string, query: string) {
  const substring = result.replace(new RegExp(query, 'i'), '');

  return substring;
}
function getQuerySubstringOfResult2(result: string, query: string) {
  const substring = result.replace(
    getQuerySubstringOfResult(result, query),
    '',
  );

  return substring;
}

enum QueryStatus {
  PASSING,
  LOADING,
  ERROR,
  NO_RESULTS,
}

function LocationSearchInput() {
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [queryStatus, setQueryStatus] = useState(QueryStatus.PASSING);

  const router = useRouter();

  useEffect(() => {
    if (query.length === 0) {
      setFilteredLocations([]);
      setQueryStatus(QueryStatus.PASSING);
      return;
    }

    setQueryStatus(QueryStatus.LOADING);

    getFilteredLocations(query, MAX_DISPLAYED_RESULTS)
      .then((response) => {
        const { data: locations } = response;

        setFilteredLocations(locations);

        if (locations.length === 0) {
          setQueryStatus(QueryStatus.NO_RESULTS);
          return;
        }
        setQueryStatus(QueryStatus.PASSING);
      })
      .catch(() => {
        setFilteredLocations([]);
        setQueryStatus(QueryStatus.ERROR);
      });
  }, [query]);

  const showLoadingDisplay = queryStatus === QueryStatus.LOADING;
  const showErrorDisplay = queryStatus === QueryStatus.ERROR;
  const showNoResultsDisplay = queryStatus === QueryStatus.NO_RESULTS;
  const showResults =
    !showLoadingDisplay && !showErrorDisplay && !showNoResultsDisplay;

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
        {showLoadingDisplay && <p>Searching...</p>}
        {showErrorDisplay && <p>Unable to fetch results. Try again later</p>}
        {showNoResultsDisplay && <p>No locations matched your query</p>}
        {showResults &&
          filteredLocations.map((location) => (
            <Combobox.Option
              key={location.id}
              value={location}
              className="cursor-pointer rounded-sm py-1 px-2 ui-active:bg-primary"
            >
              <span className="font-semibold">
                {getQuerySubstringOfResult2(location.name, query)}
              </span>
              {getQuerySubstringOfResult(location.name, query)}
            </Combobox.Option>
          ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default LocationSearchInput;
