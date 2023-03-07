import { QueryClient } from '@tanstack/react-query';

const STALE_TIME = 10 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: (query) => query.state.status !== 'error',
      retry: 2,
      staleTime: STALE_TIME,
      cacheTime: STALE_TIME,
    },
  },
});

export default queryClient;
