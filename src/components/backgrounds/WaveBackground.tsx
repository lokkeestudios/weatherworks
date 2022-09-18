import styled from 'styled-components';
import Wave from './Wave';

const StyledBackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: -1;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 400px;
  background: linear-gradient(
    149.81deg,
    rgba(41, 3, 121, 1) 18.39%,
    rgba(92, 16, 236, 1) 78.52%
  );
`;

function WaveBackground() {
  return (
    <StyledBackgroundWrapper>
      <StyledBackground />
      <Wave
        src="/images/waves/wave1.svg"
        width={1700}
        height={554}
        offsetY="90px"
      />
      <Wave
        src="/images/waves/wave2.svg"
        width={1998}
        height={1025}
        offsetY="10px"
        hasBlur
      />
      <Wave
        src="/images/waves/wave3.svg"
        width={1709}
        height={809}
        offsetY="156px"
      />
      <Wave
        src="/images/waves/wave4.svg"
        width={2012}
        height={835}
        offsetY="126px"
        hasBlur
      />
      <Wave
        src="/images/waves/wave5.svg"
        width={1709}
        height={471}
        offsetY="349px"
      />
      <Wave
        src="/images/waves/wave6.svg"
        width={1700}
        height={695}
        offsetY="389px"
        hasBlur
      />
      <Wave
        src="/images/waves/wave7.svg"
        width={1711}
        height={659}
        offsetY="489px"
      />
    </StyledBackgroundWrapper>
  );
}

export default WaveBackground;
