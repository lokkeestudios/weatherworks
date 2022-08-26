import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: -1;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 326px;
  background: linear-gradient(
    149.81deg,
    rgba(41, 3, 121, 1) 18.39%,
    rgba(92, 16, 236, 1) 78.52%
  );
`;

const Wave = styled.img`
  position: absolute;
  margin-left: calc(50%);
  transform: translateX(-50%);
`;

const WaveWithBlur = styled(Wave)`
  filter: blur(75px);
`;

function WaveBackground() {
  return (
    <Wrapper>
      <Background />
      <Wave
        src="/images/waves/home-wave1.svg"
        alt="Wave"
        style={{ top: '90px' }}
      />
      <WaveWithBlur
        src="/images/waves/home-wave2.svg"
        alt="Wave"
        style={{ top: '10px' }}
      />
      <Wave
        src="/images/waves/home-wave3.svg"
        alt="Wave"
        style={{ top: '156px' }}
      />
      <WaveWithBlur
        src="/images/waves/home-wave4.svg"
        alt="Wave"
        style={{ top: '126px' }}
      />
      <Wave
        src="/images/waves/home-wave5.svg"
        alt="Wave"
        style={{ top: '349px' }}
      />
      <WaveWithBlur
        src="/images/waves/home-wave6.svg"
        alt="Wave"
        style={{ top: '389px' }}
      />
      <Wave
        src="/images/waves/home-wave7.svg"
        alt="Wave"
        style={{ top: '489px' }}
      />
    </Wrapper>
  );
}

export default WaveBackground;
