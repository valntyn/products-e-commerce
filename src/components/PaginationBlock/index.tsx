import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  ADD_ITEMS_PER_PAGE,
} from '@constants/default';
import { getSearchWith } from '@helpers/searchHelpers';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { setItemsPerPage, setPage } from '@store/reducers/filterSlice';
import { setVisibleProducts } from '@store/reducers/productsSlice';
import {
  selectFilteredProducts,
} from '@store/selectors/selectFilteredProducts';
import { Params } from '@utils/params';

import { Pagination } from './Pagination';

import './PaginationBlock.scss';

export const PaginationBlock = () => {
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const { products } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.filter);
  const { itemsPerPage, currentPage } = pagination;

  const [searchParams, setSearchParams] = useSearchParams();

  const quantity = filteredProducts.length;
  const totalPages = Math.ceil(quantity / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItem = useMemo(
    () => filteredProducts.slice(firstItemIndex, lastItemIndex),
    [filteredProducts, firstItemIndex, lastItemIndex],
  );

  useEffect(() => {
    const pageInParams = searchParams.get(Params.Page);
    const itemsInParams = searchParams.get(Params.itemsPerPage);

    if (pageInParams) {
      dispatch(setPage(+pageInParams));
    }

    if (itemsInParams) {
      dispatch(setItemsPerPage(+itemsInParams));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(setVisibleProducts(currentItem));
  }, [currentPage, currentItem, dispatch]);

  const handleAddVisibleProducts = () => {
    const newItemsPerPage = itemsPerPage + ADD_ITEMS_PER_PAGE;
    const displayedProductsCount = currentPage * itemsPerPage;

    let targetPage;

    if (!(currentPage % 2)) {
      targetPage = Math.floor(displayedProductsCount / newItemsPerPage) + 1;
    } else {
      targetPage = Math.ceil(displayedProductsCount / newItemsPerPage);
    }

    const mergedItems = [...currentItem];

    setSearchParams(
      getSearchWith(searchParams, {
        page: `${targetPage}`,
        perPage: `${newItemsPerPage}`,
      }),
    );

    dispatch(setVisibleProducts(mergedItems));
  };

  return (
    <div className="pagination-block">
      <Pagination total={totalPages} currentPage={currentPage} />
      <button
        className="pagination-block__button"
        type="button"
        onClick={handleAddVisibleProducts}
        disabled={currentPage >= totalPages}
      >
        Show more products
      </button>
      <div className="pagination-block__quantity-box">
        <p className="pagination-block__quantity">{products.length}</p>
        <p className="pagination-block__items">Products</p>
      </div>
    </div>
  );
};
