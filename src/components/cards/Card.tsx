import { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
}

function Card({ title = undefined, children }: Props) {
  return (
    <div className="rounded-2xl border-0.5 border-slate-50/30 bg-slate-800/50 p-6 backdrop-blur-xl">
      {title && (
        <>
          <h2 className="font-display text-2xl font-semibold leading-none">
            {title}
          </h2>
          <hr className="my-4 border-slate-50/30" />
        </>
      )}
      {children}
    </div>
  );
}

export default Card;
