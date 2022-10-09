import { ReactHTML, ReactNode } from 'react';

interface Props {
  as?: keyof ReactHTML;
  children: ReactNode;
}

function Container({ as: ContainerAs = 'div', children }: Props) {
  return (
    <ContainerAs className="mx-auto w-11/12 max-w-7xl">{children}</ContainerAs>
  );
}

export default Container;
