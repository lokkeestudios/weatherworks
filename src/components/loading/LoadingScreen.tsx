import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
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
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-neutrals-900"
          aria-hidden
          key={router.route}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: {
              opacity: '0%',
            },
            visible: {
              opacity: '100%',
            },
          }}
        >
          <div className="h-20 w-20 animate-ping">
            <Image
              src="/images/logos/weatherworks.svg"
              alt="WeatherWorks"
              width={512}
              height={512}
              layout="responsive"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
