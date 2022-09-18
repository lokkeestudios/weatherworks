import { createGlobalStyle, css } from 'styled-components';
import ColorStyles from './ColorStyles';
import ResetStyles from './ResetStyles';

const BaseStyles = css`
  body {
    font-family: 'Roboto', sans-serif;
    background: ${ColorStyles.background};
    color: ${ColorStyles.text};
    overflow-x: hidden;

    *::selection {
      background-color: rgba(105, 25, 255, 0.9);
      color: ${ColorStyles.text};
    }
  }
`;

/* workaround for an issue where prettier is not formatting css styles passed into createGlobalStyle */
const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  ${ResetStyles}
  ${BaseStyles}
`;

export default GlobalStyles;
