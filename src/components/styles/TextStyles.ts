import styled from 'styled-components';

const H1 = styled.h1`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  font-size: 3.75rem;
  line-height: 1;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 2.125rem;
  }
`;

const H2 = styled.h2`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 1;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const H3 = styled.h3`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  font-size: 1.875rem;
  line-height: 1;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BodyLarge = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 1.0625rem;
  line-height: 1.4;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BodyMedium = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 0.9375rem;
  line-height: 1.4;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 0.8125rem;
  }
`;

const BodySmall = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 0.8125rem;
  line-height: 1.4;
  max-width: 50ch;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 0.6875rem;
  }
`;

const CaptionLarge = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.4;
  max-width: 50ch;
  margin: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 768px) {
    font-size: 0.8125rem;
  }
`;

const CaptionSmall = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1.4;
  max-width: 50ch;
  margin: 0;
  text-transform: uppercase;

  @media only screen and (max-width: 768px) {
    font-size: 0.6875rem;
  }
`;

export {
  H1,
  H2,
  H3,
  BodyLarge,
  BodyMedium,
  BodySmall,
  CaptionLarge,
  CaptionSmall,
};
