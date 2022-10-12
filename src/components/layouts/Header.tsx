import Container from '@/components/Container';
import socials from '@/data/socials';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className="w-full py-3">
      <Container>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            passHref
          >
            <a
              className="h-12 w-12 lg:h-16 lg:w-16"
              aria-label="Go back home"
            >
              <Image
                src="/images/logos/weatherworks.svg"
                alt="WeatherWorks"
                width={512}
                height={512}
                layout="responsive"
                priority
              />
            </a>
          </Link>
          <div className="flex gap-x-2">
            {socials.map((social, i) => {
              const { link, title, icon: Icon } = social;

              return (
                <a
                  key={i}
                  href={link}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={title}
                  className="text-neutrals-50/70 transition-colors duration-200 focus-visible:text-neutrals-50 hover:text-neutrals-50"
                >
                  <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
