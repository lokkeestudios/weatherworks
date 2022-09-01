import type { AppProps } from 'next/app';
import { FavouritesContextProvider } from '../contexts/FavouritesContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavouritesContextProvider>
      {/* built-in nextjs feature, thus there is no way around using props spreading in this specific case */
      /* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </FavouritesContextProvider>
  );
}
