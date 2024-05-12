/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import { twMerge } from 'tailwind-merge';
import React from 'react';

export default function PaginationButton({ className, ...rest }) {
  return (
    <button
      className={twMerge(
        'border-l border-slate-400 bg-slate-100 px-4 py-2 text-slate-800 first:rounded-l-md first:border-0 last:rounded-r-md enabled:hover:bg-slate-300',
        className,
      )}
      {...rest}
    />
  );
}
