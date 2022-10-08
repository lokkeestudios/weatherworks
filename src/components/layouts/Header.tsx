import socialsData from '@/data/socials';
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
    <header>
      <Link
        href="/"
        aria-label="Visit home page"
      >
        <Image
          src="/images/logos/weatherworks.svg"
          alt="WeatherWorks"
          width={64}
          height={64}
        />
      </Link>
      <ul>
        {socialsData.map((social, index) => (
          <a
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            href={social.link}
            rel="noreferrer"
            target="_blank"
            aria-label={social.title}
          >
            {social.icon}
          </a>
        ))}
      </ul>
    </header>
  );
}

export default Header;
