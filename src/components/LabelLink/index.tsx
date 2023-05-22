import React, { memo, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '@helpers/searchHelpers';

type PropTypes = {
  currentPage: number;
  value: string;
};

export const LabelLink: React.FC<PropTypes> = memo(({ currentPage, value }) => {
  const [searchParams] = useSearchParams();
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

  const getSearch = (title: string) => {
    switch (title) {
      case '>':
        return getSearchWith(memoizedSearchParams, {
          page: `${currentPage + 1}`,
        });

      case '<':
        return getSearchWith(memoizedSearchParams, {
          page: `${currentPage - 1}`,
        });

      default:
        return getSearchWith(memoizedSearchParams, {
          page: `${currentPage}`,
        });
    }
  };

  return (
    <Link
      to={{
        search: getSearch(value),
      }}
    >
      {value}
    </Link>
  );
});
