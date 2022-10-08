import Image from 'next/image';

interface Props {
  src: string;
  width: number;
  height: number;
  yOffsetClass: string;
  isPriority?: boolean;
  hasBlur?: boolean;
}

function Wave({
  src,
  width,
  height,
  yOffsetClass,
  isPriority = false,
  hasBlur = false,
}: Props) {
  return (
    <div
      className={`absolute ml-[50%] -translate-x-1/2 ${yOffsetClass} ${
        hasBlur ? 'blur-3xl' : 'blur-0'
      } `}
    >
      <Image
        src={src}
        alt="Wave"
        width={width}
        height={height}
        priority={isPriority}
        layout="fixed"
      />
    </div>
  );
}

export default Wave;
