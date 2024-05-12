/* eslint-disable react/prop-types */
import { twMerge } from 'tailwind-merge';
import React from 'react';

export default function Td({ children, className }) {
  return (
    <td
      className={twMerge(
        'border-l border-slate-400 px-4 py-2 first:border-l-0',
        className,
      )}
    >
      {children}
    </td>
  );
}
