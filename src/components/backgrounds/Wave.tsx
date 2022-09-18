import Image from 'next/image';
import styled from 'styled-components';

interface StyledWaveWrapperProps {
  offsetY: string;
  hasBlur: boolean;
}

const StyledWaveWrapper = styled.div<StyledWaveWrapperProps>`
  position: absolute;
  margin-left: calc(50%);
  translate: -50%;
  top: ${(props) => props.offsetY};
  ${(props) => props.hasBlur && 'filter: blur(75px)'};
`;

interface Props {
  src: string;
  width: number;
  height: number;
  offsetY: string;
  hasBlur?: boolean;
}

function Wave({ src, width, height, offsetY, hasBlur = false }: Props) {
  return (
    <StyledWaveWrapper offsetY={offsetY} hasBlur={hasBlur}>
      <Image
        priority
        src={src}
        alt="Wave"
        width={width}
        height={height}
        layout="fixed"
      />
    </StyledWaveWrapper>
  );
}

export default Wave;
