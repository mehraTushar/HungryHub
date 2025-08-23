import React from 'react';
import { imgUrl } from '../config';

export const Header = ({ headerList }) => {
  if (!headerList || headerList.length === 0) return null;

  return (
    <>
      <section className="mx-auto max-w-7xl lg:px-7 font-semibold text-xl dark:text-white">
        <p className="font-bold text-xl">What's on your mind?</p>
      </section>
      <section className="mx-auto max-w-7xl overflow-x-auto flex gap-1 pb-1 no-scrollbar">
        {headerList.map(({ imageId }, index) => (
          <div key={imageId || index} className="flex-shrink-0 w-40 h-30 relative">
            <img
              src={`${imgUrl}${imageId}`}
              alt="Header"
              className="w-full h-full object-contain aspect-[3/2] mix-blend-color-multiply"
            />
          </div>
        ))}
      </section>
    </>
  );
};
