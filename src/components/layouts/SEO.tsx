import { NextSeo } from 'next-seo';
import Script from 'next/script';

interface Props {
  title: string;
  slug: string;
}

function SEO({ title, slug }: Props) {
  const baseUrl = 'https://weatherworks.lokkeestudios.com';
  const canonical = slug?.length !== 0 ? `${baseUrl}/${slug}` : baseUrl;
  const description =
    'WeatherWorks brings you visually compelling real-time global weather data, from both the present and the future.';

  const { NEXT_PUBLIC_GA_MEASUREMENT_ID } = process.env;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          type: 'website',
          url: canonical,
          title,
          description,
          site_name: 'WeatherWorks',
          images: [
            {
              url: '/banner-1200x630.png',
              alt: 'WeatherWorks',
              width: 1200,
              height: 630,
            },
          ],
        }}
        twitter={{ cardType: 'summary_large_image' }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: 'any',
          },
          {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            href: '/site.webmanifest',
          },
        ]}
        additionalMetaTags={[
          {
            name: 'theme-color',
            content: '#6919FF',
          },
          {
            name: 'google-site-verification',
            content: 'M5b_xgbjIoOjw_GHMkLyUdW-uSAfYHuL9Elqv5IloxQ',
          },
        ]}
      />
      {NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
          >
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

export default SEO;
