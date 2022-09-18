import styled from 'styled-components';

const StyledWrapper = styled.div`
  --max-width: 980px;
  --padding-inline: 60px;

  width: calc(100% - var(--padding-inline));
  max-width: var(--max-width);
  margin-inline: auto;
`;

export default StyledWrapper;
