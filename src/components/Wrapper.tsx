import { ReactHTML, ReactNode } from 'react';

interface Props {
  as?: keyof ReactHTML;
  children: ReactNode;
}

function Wrapper({ as: WrapperAs = 'div', children }: Props) {
  return (
    <WrapperAs className="mx-auto w-11/12 max-w-7xl">{children}</WrapperAs>
  );
}

export default Wrapper;
