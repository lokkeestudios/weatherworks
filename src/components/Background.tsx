import Image from 'next/image';

interface Props {
  src: string;
}

function Background({ src }: Props) {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-50 h-screen w-full"
    >
      <Image
        src={src}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

export default Background;
