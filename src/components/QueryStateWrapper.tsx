import { UseQueryResult } from '@tanstack/react-query';

interface Props<T> {
  query: UseQueryResult<T, unknown>;
  errorText: string;
  children: (data: T) => JSX.Element;
}

function QueryStateWrapper<T>({ query, errorText, children }: Props<T>) {
  if (query.isLoading) {
    return (
      <div className="pointer-events-none w-full rounded-2xl border-0.5 border-neutrals-50/30 bg-neutrals-800/60 px-8 py-4 shadow-lg backdrop-blur-xl lg:px-11 lg:py-6">
        <div className="flex animate-pulse items-center justify-between">
          <p className="rounded-full bg-neutrals-900/60 font-display font-bold leading-none text-transparent text-7xl">
            00°
          </p>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <p className="rounded-full bg-neutrals-900/60 font-medium leading-none text-transparent text-sm">
              Clear Sky
            </p>
            <h3 className="rounded-full bg-neutrals-900/60 font-display font-bold leading-none text-transparent text-2xl">
              Hamburg - DE
            </h3>
          </div>
          <div className="h-20 w-20 rounded-full bg-neutrals-900/60 md:h-24 md:w-24 lg:h-32 lg:w-32" />
        </div>
      </div>
    );
  }
  if (query.isSuccess) {
    return children(query.data);
  }
  return <p>{errorText}</p>;
}

export default QueryStateWrapper;
