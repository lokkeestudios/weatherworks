import { DotPulse } from '@uiball/loaders';
import styled from 'styled-components';
import ColorStyles from '../styles/ColorStyles';

const StyledLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loader() {
  return (
    <StyledLoaderWrapper>
      <DotPulse size={48} speed={1.3} color={ColorStyles.text} />
    </StyledLoaderWrapper>
  );
}

export default Loader;
