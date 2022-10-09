import Image from 'next/image';

interface Props {
  src: string;
}

function Background({ src }: Props) {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 h-screen w-full"
    >
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
}

export default Background;
