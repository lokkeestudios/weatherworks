import cloudMonsterImage from '@/assets/images/cloud-monster.webp';
import Container from '@/components/Container';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import Image from 'next/image';
import Link from 'next/link';

function PageNotFoundSection() {
  return (
    <section
      className="relative z-1 flex min-h-screen"
      aria-label="Page not found"
    >
      <Container>
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Image
              src={cloudMonsterImage}
              alt="Happy cloud monster"
              className="w-64 md:w-80 lg:w-96"
            />
            <h1 className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 font-display font-bold text-neutrals-900 text-9xl">
              404
            </h1>
          </div>
          <p className="mb-8 text-center font-display font-bold text-3xl">
            Some things are better not disturbed
          </p>
          <p className="mb-4 text-neutrals-50 text-base">
            Let&apos;s rewind in time and get you...
          </p>
          <Link
            href="/"
            title="Go back home"
            className="group flex -translate-x-5 items-center  transition-transform duration-300 focus-visible:translate-x-0 hover:translate-x-0"
          >
            <ChevronRightIcon className="mr-0.5 inline h-7 w-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="border-b-0.5 border-b-neutrals-50 transition-colors duration-300 text-lg group-hover:border-transparent group-focus-visible:border-transparent">
              back home
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default PageNotFoundSection;
