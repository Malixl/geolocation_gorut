/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import Button from './PaginationButton';

/**
 *
 * @param {object} props
 * @param {number} props.total
 * @param {number} props.current
 * @param {number} props.perPage
 * @param {Function} props.onPageChange
 * @returns
 */
export default function Pagination({
  total,
  current,
  perPage,
  onPageChange,
  className,
}) {
  const totalPages = useMemo(
    () => Math.ceil(total / perPage),
    [total, perPage],
  );
  const pagesToShow = 2;
  const pagesBeforeCurrentPage = useMemo(
    () => Array(Math.min(pagesToShow, current - 1)).fill(),
    [current],
  );
  const pagesAfterCurrentPage = useMemo(
    () => Array(Math.max(0, Math.min(pagesToShow, totalPages - current))).fill(),
    [current, totalPages],
  );

  return (
    <div className={className}>
      {current > 1 && (
        <Button
          disabled={current === 1}
          onClick={() => onPageChange(current - 1)}
          aria-label="Sebelumnya"
        >
          &laquo;
        </Button>
      )}

      {/* Pages before current page */}
      {pagesBeforeCurrentPage.map((_, index) => (
        <Button key={index} onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </Button>
      ))}

      {current > pagesToShow + 1 && <Button disabled>...</Button>}

      {/* Current page */}
      <Button disabled className="bg-slate-400">
        {current}
      </Button>

      {current < totalPages - pagesToShow && <Button disabled>...</Button>}

      {/* Pages after current page */}
      {pagesAfterCurrentPage
        .map((_, index) => (
          <Button key={index} onClick={() => onPageChange(totalPages - index)}>
            {totalPages - index}
          </Button>
        ))
        .reverse()}
      {current < totalPages && (
        <Button
          onClick={() => onPageChange(current + 1)}
          className="rounded-r-md"
        >
          &raquo;
        </Button>
      )}
    </div>
  );
}
