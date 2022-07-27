import styled from 'styled-components';
import socialsData from '../../data/socialsData';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 30px;

  @media only screen and (max-width: 744px) {
    padding-block: 20px;
  }
`;

const LogoWrapper = styled.div``;

const SocialsWrapper = styled.nav`
  display: flex;
  align-items: center;
  column-gap: 10px;
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

function Header() {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <span>Logo</span>
      </LogoWrapper>
      <SocialsWrapper>
        {socialsData.map((social, index) => (
          <SocialsItem
            /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            href={social.link}
            title={social.title}
            rel="noreferrer"
            target="_blank"
          >
            <img src={social.icon} alt={social.title} />
          </SocialsItem>
        ))}
      </SocialsWrapper>
    </HeaderWrapper>
  );
}

export default Header;
