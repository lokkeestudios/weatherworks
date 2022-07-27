import Link from 'next/link';
import styled from 'styled-components';
import socialsData from '../../data/socialsData';
import ColorStyles from '../styles/ColorStyles';
import { BodySmall, CaptionLarge, CaptionSmall } from '../styles/TextStyles';

function getCurrentYear() {
  const currentYear = new Date().getFullYear().toString();

  return currentYear;
}

const FooterWrapper = styled.footer`
  position: relative;
  bottom: 0;
  padding-block: 24px;

  & > :not([hidden]) ~ :not([hidden]) {
    border-top: 0.6px solid ${ColorStyles.dark.text2};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-block: 32px;
`;

const CreditsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 32px;
  row-gap: 10px;
`;

const CreditsLogo = styled.img`
  width: 48px;

  @media only screen and (max-width: 744px) {
    width: 40px;
  }
`;

const CreditsText = styled(CaptionLarge)`
  span {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: normal;
  }
`;

const InformationWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-block: 32px;
  row-gap: 30px;

  @media only screen and (max-width: 744px) {
    flex-direction: column-reverse;
  }
`;

const CopyrightWrapper = styled.div`
  display: flex;
  flex-basis: 33.33333%;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 744px) {
    justify-content: center;
  }
`;

const CopyrightText = styled(BodySmall)`
  color: ${ColorStyles.dark.text2};
`;

const SocialsWrapper = styled.nav`
  display: flex;
  flex-basis: 33.33333%;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
`;

const SocialsItem = styled.a`
  width: 24px;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    opacity: 0.7;
  }

  @media only screen and (max-width: 744px) {
    width: 20px;
  }
`;

const LinksWrapper = styled.nav`
  display: flex;
  flex-basis: 33.33333%;
  justify-content: flex-end;
  align-items: center;

  @media only screen and (max-width: 744px) {
    justify-content: center;
  }
`;

const LinkText = styled(CaptionSmall)`
  cursor: pointer;
  text-decoration: none;
  color: ${ColorStyles.dark.text2};
  border-bottom: 1px solid transparent;
  transition-property: border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    border-color: ${ColorStyles.dark.text2};
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <LogoWrapper>
        <span>Logo</span>
      </LogoWrapper>
      <CreditsWrapper>
        <CreditsLogo
          src="/images/logos/lokkee-studios.svg"
          alt="Lokkee Studios"
        />
        <CreditsText>
          Hand crafted by{' '}
          <span>
            <b> Lokkee</b> Studios
          </span>
        </CreditsText>
      </CreditsWrapper>
      <InformationWrapper>
        <CopyrightWrapper>
          <CopyrightText>
            Copyright &copy; {getCurrentYear()} Lokkee Studios All Rights
            Reserved.
          </CopyrightText>
        </CopyrightWrapper>
        <SocialsWrapper>
          {socialsData.map((social, index) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <SocialsItem key={index} href={social.link} title={social.title}>
              <img src={social.icon} alt={social.title} />
            </SocialsItem>
          ))}
        </SocialsWrapper>
        <LinksWrapper>
          <Link href="/imprint">
            <LinkText>Imprint</LinkText>
          </Link>
        </LinksWrapper>
      </InformationWrapper>
    </FooterWrapper>
  );
}

export default Footer;
