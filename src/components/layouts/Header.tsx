import Container from '@/components/Container';
import socials from '@/data/socials';
import Image from 'next/image';
import Link from 'next/link';

// const StyledHeaderWrapper = styled(StyledWrapper)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding-block: 30px;

//   @media only screen and (max-width: 744px) {
//     padding-block: 20px;
//   }
// `;

// const StyledLogoWrapper = styled.a``;

// const StyledLogo = styled(Image)`
//   width: 50px;
// `;

// const StyledSocialsWrapper = styled.nav`
//   display: flex;
//   align-items: center;
//   column-gap: 10px;
// `;

// const StyledSocialsItem = styled.a`
//   display: flex;
//   color: ${CommonStyles.colors.text2};
//   transition-property: color;
//   transition: cubic-bezier(0.215, 0.61, 0.355, 1) 300ms;

//   :hover,
//   :focus-within {
//     color: ${CommonStyles.colors.text};
//   }
// `;

function Header() {
  return (
    <Container as="header">
      <div className="flex items-center justify-between py-4">
        <Link
          href="/"
          passHref
        >
          <a aria-label="Go back home">
            <Image
              src="/images/logos/weatherworks.svg"
              alt="WeatherWorks"
              width={64}
              height={64}
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
  );
}

export default Header;
