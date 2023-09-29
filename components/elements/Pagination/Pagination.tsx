import React from 'react';

import s from './Pagination.module.scss';
import clsx from 'clsx';

const Pagination = ({
  count,
  currentPage,
  entities,
  onChangePage,
}: {
  count?: number;
  currentPage: number;
  entities?: object[];
  onChangePage: (pageNumber: number) => void;
}) => {
  const currentPageCount = count && entities ? Math.ceil(count / entities.length) : 0;

  return (
    <div className={s.paginationContainer}>
      {currentPageCount !== 1 && (
        <>
          {[...Array(currentPageCount)].map((_, idx) => {
            return (
              <div
                key={idx}
                onClick={() => onChangePage(idx + 1)}
                className={clsx(
                  s.paginationItem,
                  currentPage === idx + 1 && s.activePaginationItem
                )}>
                {idx + 1}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Pagination;
