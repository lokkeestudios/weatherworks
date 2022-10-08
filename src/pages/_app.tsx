import { FavouritesContextProvider } from '@/contexts/FavouritesContext';
import queryClient from '@/proxies/queryClient';
import '@/styles/globals.css';
import '@fontsource/roboto-condensed/400.css';
import '@fontsource/roboto-condensed/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function LoadingScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function handleStartRoute(url: string) {
      if (url === router.asPath) {
        return;
      }
      setIsLoading(true);
    }

    function handleStopRoute(url: string) {
      if (url !== router.asPath) {
        return;
      }
      setIsLoading(false);
    }

    router.events.on('routeChangeStart', handleStartRoute);
    router.events.on('routeChangeComplete', handleStopRoute);
    router.events.on('routeChangeError', handleStopRoute);

    return () => {
      router.events.off('routeChangeStart', handleStartRoute);
      router.events.off('routeChangeComplete', handleStopRoute);
      router.events.off('routeChangeError', handleStopRoute);
    };
  }, [router]);

  return (
    <div
      className={`${
        isLoading ? 'flex' : 'hidden'
      } fixed inset-0 z-50 h-screen w-full items-center justify-center bg-green-600`}
      aria-hidden
    >
      <h1>Loading...</h1>
    </div>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoadingScreen />
      <QueryClientProvider client={queryClient}>
        <FavouritesContextProvider>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </FavouritesContextProvider>
      </QueryClientProvider>
    </>
  );
}
