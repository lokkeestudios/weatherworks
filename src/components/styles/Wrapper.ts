import styled from 'styled-components';

const Wrapper = styled.div`
  --max-width: 980px;
  --padding-inline: 10vw;

  width: min(var(--max-width), 100% - var(--padding-inline));
  margin-inline: auto;
`;

export default Wrapper;
