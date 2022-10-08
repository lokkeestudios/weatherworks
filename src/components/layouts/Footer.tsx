// const StyledFooterWrapper = styled.footer`
//   padding-block: 1.5em;
//   width: 100%;
//   margin-top: 100px;
//   background: ${CommonStyles.colors.background};
// `;

// const StyledContentsWrapper = styled(StyledWrapper)`
//   position: relative;
//   z-index: 1;
//   & > :not([hidden]) ~ :not([hidden]) {
//     border-top: 0.6px solid ${CommonStyles.colors.text2};
//   }
// `;

// const StyledFooterRow = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding-block: 32px;
// `;

// const StyledCreditsLink = styled.a`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-decoration: none;
// `;

// const StyledCreditsText = styled(StyledCaptionLarge)`
//   color: ${CommonStyles.colors.text};
//   margin-top: 0.625em;

//   span {
//     font-family: 'Roboto Condensed', sans-serif;
//     font-weight: normal;
//   }
// `;

// const StyledMultiColumnFooterRow = styled(StyledFooterRow)`
//   row-gap: 20px;

//   @media only screen and (max-width: 50em) {
//     flex-direction: column-reverse;
//   }
// `;

// const StyledCopyrightWrapper = styled.div`
//   display: flex;
//   flex-basis: 33.33333%;
//   justify-content: flex-start;
//   align-items: center;

//   @media only screen and (max-width: 50em) {
//     justify-content: center;
//   }
// `;

// const StyledCopyrightText = styled(StyledBodySmall)`
//   color: ${CommonStyles.colors.text2};
// `;

// const StyledSocialsWrapper = styled.nav`
//   display: flex;
//   flex-basis: 33.33333%;
//   column-gap: 10px;
//   justify-content: center;
//   align-items: center;
// `;

// const StyledSocialsItem = styled.a`
//   color: ${CommonStyles.colors.text2};
//   transition-property: color;
//   transition: cubic-bezier(0.215, 0.61, 0.355, 1) 300ms;

//   &:hover,
//   &:focus-within {
//     color: ${CommonStyles.colors.text};
//   }
// `;

// const StyledLinksWrapper = styled.nav`
//   display: flex;
//   flex-basis: 33.33333%;
//   justify-content: flex-end;
//   align-items: center;

//   @media only screen and (max-width: 50em) {
//     justify-content: center;
//   }
// `;

// const StyledLinkText = styled(StyledCaptionSmall)`
//   text-transform: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${CommonStyles.colors.text2};
// `;

// const StyledBackgroundWrapper = styled.div`
//   position: relative;
// `;

// function getCurrentYear() {
//   const currentYear = new Date().getFullYear().toString();

//   return currentYear;
// }

function Footer() {
  return (
    <div />
    // <StyledFooterWrapper>
    //   <StyledBackgroundWrapper>
    //     <Wave
    //       src="/images/waves/footer/wave1.svg"
    //       width={1700}
    //       height={508}
    //       offsetY="-380px"
    //       hasBlur
    //     />
    //     <Wave
    //       src="/images/waves/footer/wave2.svg"
    //       width={1700}
    //       height={300}
    //       offsetY="-130px"
    //     />
    //   </StyledBackgroundWrapper>
    //   <StyledContentsWrapper>
    //     <StyledFooterRow>
    //       <Image
    //         src="/images/logos/weatherworks.svg"
    //         alt="WeatherWorks"
    //         width={64}
    //         height={64}
    //       />
    //     </StyledFooterRow>
    //     <StyledFooterRow>
    //       <StyledCreditsLink
    //         href="https://lokkeestudios.com"
    //         rel="noreferrer"
    //         target="_blank"
    //         aria-label="Visit creator"
    //       >
    //         <Image
    //           src="/images/logos/lokkee-studios.svg"
    //           alt="Lokkee Studios"
    //           width={48}
    //           height={48}
    //         />
    //         <StyledCreditsText>
    //           Hand crafted by{' '}
    //           <span>
    //             <b>Lokkee</b> Studios
    //           </span>
    //         </StyledCreditsText>
    //       </StyledCreditsLink>
    //     </StyledFooterRow>
    //     <StyledMultiColumnFooterRow>
    //       <StyledCopyrightWrapper>
    //         <StyledCopyrightText>
    //           Copyright &copy; {getCurrentYear()} Lokkee Studios All Rights
    //           Reserved.
    //         </StyledCopyrightText>
    //       </StyledCopyrightWrapper>
    //       <StyledSocialsWrapper>
    //         {socialsData.map((social, index) => (
    //           <StyledSocialsItem
    //             /* safe to disable in this case, as we are dealing with static data */
    //             /* eslint-disable-next-line react/no-array-index-key */
    //             key={index}
    //             href={social.link}
    //             rel="noreferrer"
    //             target="_blank"
    //             aria-label={social.title}
    //           >
    //             {social.icon}
    //           </StyledSocialsItem>
    //         ))}
    //       </StyledSocialsWrapper>
    //       <StyledLinksWrapper>
    //         <Link href="/imprint">
    //           <StyledLinkText>Imprint</StyledLinkText>
    //         </Link>
    //       </StyledLinksWrapper>
    //     </StyledMultiColumnFooterRow>
    //   </StyledContentsWrapper>
    // </StyledFooterWrapper>
  );
}

export default Footer;
