import { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
}

function Card({ title = undefined, children }: Props) {
  return (
    <div className="rounded-2xl border-0.5 border-neutrals-50/30 bg-neutrals-800/60 p-6 backdrop-blur-xl">
      {title && (
        <>
          <h2 className="font-display font-semibold leading-none text-2xl">
            {title}
          </h2>
          <hr className="my-4 border-neutrals-50/30" />
        </>
      )}
      {children}
    </div>
  );
}

export default Card;
