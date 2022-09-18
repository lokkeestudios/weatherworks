import styled from 'styled-components';

const StyledH1 = styled.h1`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  font-size: 3.75rem;
  line-height: 1;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 50em) {
    font-size: 2.125rem;
  }
`;

const StyledH2 = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 1;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 50em) {
    font-size: 1.75rem;
  }
`;

const StyledH3 = styled.h3`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  font-size: 1.875rem;
  line-height: 1;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 50em) {
    font-size: 1.5rem;
  }
`;

const StyledBodyLarge = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 1.0625rem;
  line-height: 1.4;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 50em) {
    font-size: 1rem;
  }
`;

const StyledBodyMedium = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.4;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 50em) {
    font-size: 0.8125rem;
  }
`;

const StyledBodySmall = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 0.84rem;
  line-height: 1.4;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 50em) {
    font-size: 0.6875rem;
  }
`;

const StyledCaptionLarge = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1;
  max-width: 50ch;
  margin: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 50em) {
    font-size: 0.8125rem;
  }
`;

const StyledCaptionSmall = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 0.6875rem;
  line-height: 1;
  max-width: 50ch;
  margin: 0;
  text-transform: uppercase;

  @media only screen and (min-width: 50em) {
    font-size: 0.84rem;
  }
`;

export {
  StyledH1,
  StyledH2,
  StyledH3,
  StyledBodyLarge,
  StyledBodyMedium,
  StyledBodySmall,
  StyledCaptionLarge,
  StyledCaptionSmall,
};
