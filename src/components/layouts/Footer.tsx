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
      <div className="absolute -top-80 -z-1 h-[508px] w-full overflow-hidden">
        <Image
          src="/images/waves/footer.svg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <Container>
        <div className="flex flex-col items-center divide-y-0.5 divide-neutrals-300">
          <div className="flex w-full items-center justify-center py-8">
            <Image
              src="/images/logos/weatherworks.svg"
              alt="WeatherWorks"
              width={64}
              height={64}
            />
          </div>
          <div className="flex w-full items-center justify-center py-8">
            <a
              href="https://lokkeestudios.com"
              rel="noreferrer"
              target="_blank"
              aria-label="Check out the creator"
              className="flex flex-col items-center justify-center"
            >
              <Image
                src="/images/logos/lokkee-studios.svg"
                alt="LOKKEE STUDIOS"
                width={48}
                height={48}
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
                Copyright &copy; {getCurrentYear()} Lokkee Studios All Rights
                Reserved.
              </p>
            </div>
            <div className="flex basis-1/3 items-center justify-center gap-x-2">
              {socials.map((social, i) => {
                const { link, title, icon: Icon } = social;

                return (
                  <a
                    key={i}
                    href={link}
                    rel="noreferrer"
                    target="_blank"
                    aria-label={title}
                    className="text-neutrals-300 transition-colors duration-200 focus-visible:text-neutrals-50 hover:text-neutrals-50"
                  >
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                  </a>
                );
              })}
            </div>
            <div className="flex basis-1/3 items-center justify-end">
              <Link
                href="/imprint"
                passHref
              >
                <a className="uppercase text-neutrals-300 transition-colors duration-200 text-xs focus-visible:text-neutrals-50 hover:text-neutrals-50">
                  Imprint
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
