import weatherworksLogoImage from '@/assets/images/logos/weatherworks.webp';
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
            title="Go back home"
          >
            <Image
              src={weatherworksLogoImage}
              alt="WeatherWorks"
              className="h-14 w-14 lg:h-16 lg:w-16"
            />
          </Link>
          <div className="flex gap-x-2">
            {socials.map((social) => {
              const { position, link, title, Icon } = social;

              return (
                <a
                  key={position}
                  href={link}
                  rel="noreferrer"
                  target="_blank"
                  title={title}
                  className="text-neutrals-50/70 transition-colors duration-200 focus-visible:text-neutrals-50 hover:text-neutrals-50"
                >
                  <Icon className="h-6 w-6" />
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
