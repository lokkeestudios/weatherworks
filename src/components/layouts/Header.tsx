import Container from '@/components/Container';
import socials from '@/data/socials';
import Image from "next/image";
import Link from 'next/link';

function Header() {
  return (
    <header className="w-full py-3">
      <Container>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            title="Go back home"
            className="h-14 w-14 lg:h-16 lg:w-16"
          >
            <Image
              src="/images/logos/weatherworks.webp"
              alt="WeatherWorks"
              width={256}
              height={256}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }} />
          </Link>
          <div className="flex gap-x-2">
            {socials.map((social) => {
              const { id, link, title, Icon } = social;

              return (
                <a
                  key={id}
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
