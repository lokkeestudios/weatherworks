import weatherworksLogoImage from '@/assets/images/logos/weatherworks.webp';
import Container from '@/components/Container';
import socials from '@/data/socials';
import Image from 'next/image';
import Link from 'next/link';

function getCurrentYear() {
  const currentYear = new Date().getFullYear().toString();

  return currentYear;
}

function Footer() {
  return (
    <footer className="relative isolate mt-24 w-full bg-neutrals-900 py-4">
      <div
        aria-hidden
        className="absolute -top-80 -z-1 h-[508px] w-full overflow-hidden"
      >
        <Image
          src="/images/waves/footer.svg"
          alt="Footer wave"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <Container>
        <div className="flex flex-col items-center divide-y-0.5 divide-neutrals-400">
          <div className="flex w-full items-center justify-center py-8">
            <Image
              src={weatherworksLogoImage}
              alt="WeatherWorks"
              loading="lazy"
              className="w-16 md:w-20"
            />
          </div>
          <div className="flex w-full items-center justify-center py-8">
            <a
              href="https://lokkeestudios.com"
              rel="noreferrer"
              target="_blank"
              title="Get inspired by more great work"
              className="flex flex-col items-center justify-center"
            >
              <Image
                src="/images/logos/lokkeestudios.svg"
                alt="LOKKEE STUDIOS"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 md:w-14"
              />
              <p className="mt-2 font-semibold uppercase text-sm">
                Hand crafted by{' '}
                <span className="font-display font-normal">
                  <b>Lokkee</b> Studios
                </span>
              </p>
            </a>
          </div>
          <div className="flex w-full flex-col-reverse items-center justify-center gap-5 py-8 lg:flex-row">
            <div className="flex basis-1/3 items-center justify-start">
              <p className="text-neutrals-300 text-xs">
                Copyright &copy; {getCurrentYear()} LOKKEE STUDIOS All Rights
                Reserved.
              </p>
            </div>
            <div className="flex basis-1/3 items-center justify-center gap-x-2">
              {socials.map((social) => {
                const { position, link, title, Icon } = social;

                return (
                  <a
                    key={position}
                    href={link}
                    rel="noreferrer"
                    target="_blank"
                    title={title}
                    className="text-neutrals-300 transition-colors duration-200 focus-visible:text-neutrals-50 hover:text-neutrals-50"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <div className="flex basis-1/3 items-center justify-end">
              <Link
                href="/imprint"
                className="uppercase text-neutrals-300 transition-colors duration-200 text-xs focus-visible:text-neutrals-50 hover:text-neutrals-50"
              >
                Imprint
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
