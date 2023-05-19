import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '@helpers/searchHelpers';
import './Pagination.scss';

type PropTypes = {
  total: number;
  currentPage: number;
};

export const Pagination: React.FC<PropTypes> = ({ total, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (newPage: number) => {
    setSearchParams(
      getSearchWith(searchParams, {
        page: `${newPage}`,
      }),
    );

    window.scrollTo(0, 0);
  };

  return (
    <div className="pagination">
      <p className="pagination__title">Page:</p>
      <ReactPaginate
        containerClassName="pagination pagination__position"
        previousLinkClassName="pagination__item"
        nextLinkClassName="pagination__item"
        pageLinkClassName="pagination__item"
        breakLinkClassName="pagination__item"
        activeLinkClassName="pagination__item--active"
        disabledClassName="pagination__item--disabled"
        marginPagesDisplayed={1}
        forcePage={+currentPage - 1}
        pageRangeDisplayed={4}
        previousLabel={null}
        nextLabel={null}
        onPageChange={(data) => handleClick(data.selected + 1)}
        breakLabel="..."
        pageCount={total}
      />
    </div>
  );
};
