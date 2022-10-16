import { NextSeo } from 'next-seo';

interface Props {
  title: string;
  slug: string;
}

function SEO({ title, slug }: Props) {
  const baseUrl = 'https://weatherworks.lokkeestudios.com';
  const canonical = slug?.length !== 0 ? `${baseUrl}/${slug}` : baseUrl;
  const description =
    'WeatherWorks brings you visually compelling real-time global weather data, from both the present and the future.';

  return (
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
            url: '/icon-512x512.png',
            width: 1200,
            height: 630,
            alt: title,
          },
          {
            url: '/banner-1200x630.png',
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }}
      twitter={{ cardType: 'summary' }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon-180x180.png',
          sizes: '180x180',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
      additionalMetaTags={[
        {
          name: 'theme-color',
          content: '#6919FF',
        },
      ]}
    />
  );
}

export default SEO;
