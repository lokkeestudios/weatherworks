import weatherworksLogoImage from '@/assets/images/logos/weatherworks.webp';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function LoadingScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function handleStartRoute() {
      setIsLoading(true);
    }

    function handleStopRoute() {
      setIsLoading(false);
    }

    router.events.on('routeChangeStart', handleStartRoute);
    router.events.on('routeChangeComplete', handleStopRoute);

    return () => {
      router.events.off('routeChangeStart', handleStartRoute);
      router.events.off('routeChangeComplete', handleStopRoute);
    };
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key={router.route}
          aria-hidden
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
            },
          }}
          className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-neutrals-900"
        >
          <Image
            src={weatherworksLogoImage}
            alt="WeatherWorks"
            className="h-20 w-20 animate-ping"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
