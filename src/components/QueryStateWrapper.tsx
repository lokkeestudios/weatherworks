import Loader from '@/components/loaders/Loader';
import { UseQueryResult } from '@tanstack/react-query';

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

interface Props<T> {
  query: UseQueryResult<T, unknown>;
  errorText: string;
  children: (data: T) => JSX.Element;
}

function QueryStateWrapper<T>({ query, errorText, children }: Props<T>) {
  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (query.isSuccess) {
    return children(query.data);
  }
  return <p>{errorText}</p>;
}

export default QueryStateWrapper;
