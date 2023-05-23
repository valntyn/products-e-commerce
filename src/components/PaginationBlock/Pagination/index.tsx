import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import { LabelLink } from '@components/LabelLink';
import { getSearchWith } from '@helpers/searchHelpers';
import { PageChange } from '@utils/page';

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

    const element = document.documentElement || document.body;

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const normalizedCurrentPage = Math.min(Math.max(1, currentPage), total);

  return (
    <div className="pagination">
      <p className="pagination__title">Page:</p>
      <ReactPaginate
        containerClassName="pagination pagination__position"
        previousLinkClassName="pagination__item"
        pageLinkClassName="pagination__item"
        breakLinkClassName="pagination__item"
        activeLinkClassName="pagination__item--active"
        disabledClassName="pagination__item--disabled"
        marginPagesDisplayed={1}
        forcePage={normalizedCurrentPage - 1}
        pageRangeDisplayed={4}
        previousLabel={
          <LabelLink currentPage={currentPage} value={PageChange.PREVIOUS} />
        }
        nextLabel={
          <LabelLink currentPage={currentPage} value={PageChange.NEXT} />
        }
        onPageChange={(data) => handleClick(data.selected + 1)}
        breakLabel="..."
        pageCount={total}
      />
    </div>
  );
};
