import { createGlobalStyle, css } from 'styled-components';
import ColorStyles from './ColorStyles';
import Reset from './Reset';

const BaseStyles = css`
  body {
    font-family: 'Roboto', sans-serif;
    background: ${ColorStyles.dark.background};
    color: ${ColorStyles.dark.text};

    *::selection {
      background-color: rgba(146, 92, 240, 0.9);
    }
  }
`;

/* workaround for an issue where prettier is not formatting css styles passed into createGlobalStyle */
const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  ${Reset}
  ${BaseStyles}
`;

export default GlobalStyles;
