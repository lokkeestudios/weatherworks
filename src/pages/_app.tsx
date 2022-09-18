import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FavouritesContextProvider } from '../contexts/FavouritesContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FavouritesContextProvider>
        {/* built-in nextjs feature, thus there is no way around using props spreading in this specific case */
        /* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </FavouritesContextProvider>
    </QueryClientProvider>
  );
}
