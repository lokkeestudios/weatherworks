import { UseQueryResult } from '@tanstack/react-query';

interface Props<T> {
  query: UseQueryResult<T, unknown>;
  LoadingStateDisplay?: JSX.Element;
  errorText: string;
  children: (data: T) => JSX.Element;
}

function QueryStateWrapper<T>({
  query,
  LoadingStateDisplay = <p>Loading...</p>,
  errorText,
  children,
}: Props<T>) {
  if (query.isLoading) {
    return LoadingStateDisplay;
  }
  if (query.isSuccess) {
    return children(query.data);
  }
  return <p>{errorText}</p>;
}

export default QueryStateWrapper;
