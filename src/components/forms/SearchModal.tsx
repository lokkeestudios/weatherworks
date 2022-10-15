import Container from '@/components/Container';
import LocationSearchInput from '@/components/forms/LocationSearchInput';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleStartRoute(url: string) {
      if (url === router.asPath) {
        return;
      }
      setIsOpen(false);
    }

    router.events.on('routeChangeStart', handleStartRoute);

    return () => {
      router.events.off('routeChangeStart', handleStartRoute);
    };
  }, [router]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isToggleModalShortcutPressed =
        (event.metaKey || event.ctrlKey) && event.key === 'k';

      if (isToggleModalShortcutPressed) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={setIsOpen}
          className="fixed inset-0 -top-[50vh] z-40 flex items-center justify-center"
        >
          <Dialog.Overlay
            className="fixed inset-0 bg-neutrals-900/50"
            as={motion.div}
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
          />

          <Container>
            <motion.div
              className="flex items-center justify-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {
                  scale: 0.95,
                  opacity: '0%',
                },
                visible: {
                  scale: 1,
                  opacity: '100%',
                },
              }}
            >
              <LocationSearchInput />
            </motion.div>
          </Container>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;
