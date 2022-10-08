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

// const StyledInputWrapper = styled.div`
//   display: flex;
//   position: relative;
//   width: 100%;

//   @media only screen and (min-width: 50em) {
//     width: 50%;
//   }
// `;

// interface StyledSearchWrapperProps {
//   isResultsListShown: boolean;
// }

// const StyledSearchWrapper = styled.label<StyledSearchWrapperProps>`
//   display: flex;
//   position: relative;
//   align-items: center;
//   height: 44px;
//   background: ${CommonStyles.colors.card.background};
//   border: ${CommonStyles.colors.card.border};
//   box-shadow: ${CommonStyles.colors.card.shadow};
//   backdrop-filter: blur(40px);
//   padding: 10px;
//   border-radius: 8px;
//   ${(props) => props.isResultsListShown && 'border-bottom-left-radius: 0'};
//   ${(props) => props.isResultsListShown && 'border-bottom-right-radius: 0'};
//   width: 100%;
// `;

// const StyledSearchIcon = styled(SearchIcon)`
//   margin-right: 10px;
//   color: ${CommonStyles.colors.text2};
// `;

// const StyledInput = styled.input`
//   font-size: 1rem;
//   color: ${CommonStyles.colors.text};
//   line-height: 1;
//   border: none;
//   outline: none;
//   background: transparent;
//   flex: 1;

//   &::placeholder {
//     color: ${CommonStyles.colors.text2};
//   }
// `;

// const StyledResultsList = styled.ul`
//   position: absolute;
//   top: 28px;
//   width: 100%;
//   color: ${CommonStyles.colors.text};
//   border-top: 0.5px solid rgba(255, 255, 255, 0.3);
//   flex-direction: column;
//   list-style: none;
//   background: ${CommonStyles.colors.card.background};
//   border: ${CommonStyles.colors.card.border};
//   border-top: none;
//   box-shadow: ${CommonStyles.colors.card.shadow};
//   backdrop-filter: blur(40px);
//   padding: 10px;
//   border-radius: 8px;
//   border-top-left-radius: 0;
//   border-top-right-radius: 0;
//   z-index: 1;
// `;

// const StyledResultsItem = styled.li`
//   cursor: pointer;
//   width: 100%;
//   padding: 8px;
//   border-radius: 6px;
//   line-height: 1;
//   color: ${CommonStyles.colors.text2};

//   span {
//     color: ${CommonStyles.colors.text};
//   }

//   &:hover {
//     background: rgb(105, 25, 255);
//   }
// `;

// const StyledLoaderWrapper = styled.div`
//   padding-block: 0.6rem;
// `;

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
    <div>
      <div>
        <SearchIcon size={24} />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleQueryChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {isResultsListShown && (
        <ul>
          {isError && <p>Unable to fetch results. Try again later</p>}
          {!isError && results.length === 0 && (
            <div>
              <Loader />
            </div>
          )}
          {!isError &&
            results.map((result) => (
              <div
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
              </div>
            ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
