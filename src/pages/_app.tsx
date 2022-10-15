import LoadingScreen from '@/components/loading/LoadingScreen';
import { FavouritesContextProvider } from '@/contexts/FavouritesContext';
import queryClient from '@/proxies/queryClient';
import '@/styles/globals.css';
import '@fontsource/roboto-condensed/400.css';
import '@fontsource/roboto-condensed/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoadingScreen />
      <QueryClientProvider client={queryClient}>
        <FavouritesContextProvider>
          <Component {...pageProps} />
        </FavouritesContextProvider>
      </QueryClientProvider>
    </>
  );
}
