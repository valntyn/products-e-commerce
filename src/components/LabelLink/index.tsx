import React, { memo, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '@helpers/searchHelpers';
import { PageChange } from '@utils/page';

type PropTypes = {
  currentPage: number;
  value: string;
};

export const LabelLink: React.FC<PropTypes> = memo(({ currentPage, value }) => {
  const [searchParams] = useSearchParams();
  const memoizedSearchParams = useMemo(() => searchParams, [searchParams]);

  const getSearch = (title: PageChange) => {
    switch (title) {
      case PageChange.NEXT:
        return getSearchWith(memoizedSearchParams, {
          page: `${currentPage + 1}`,
        });

      case PageChange.PREVIOUS:
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
        search: getSearch(value as PageChange),
      }}
    >
      {value}
    </Link>
  );
});
