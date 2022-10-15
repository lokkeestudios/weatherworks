import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Container({ children }: Props) {
  return <div className="mx-auto w-[90%] max-w-6xl">{children}</div>;
}

export default Container;
