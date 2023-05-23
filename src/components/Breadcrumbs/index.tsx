import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import { BreadcrumbsNames } from '@constants/breadcrumbs';
import { paths } from '@constants/paths';
import { capitalize } from '@helpers/capitalize';
import { useAppSelector } from '@hooks/useAppSelector';

import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split('/')
    .filter((pathname) => pathname !== '');

  const { selectedProduct, isSelectedProductLoading } = useAppSelector(
    (state) => state.products,
  );

  const breadcrumbItems = pathnames.map((pathname, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    const isProduct
      = location.pathname === `${paths.products}/${selectedProduct?.id}`;

    let displayName = BreadcrumbsNames[pathname] || pathname;

    if (isLast && selectedProduct && isProduct && !isSelectedProductLoading) {
      const fixedTitle = selectedProduct.title
        .split(' ')
        .map((el) => capitalize(el))
        .join(' ');

      displayName = fixedTitle;
    }

    return {
      routeTo,
      isLast,
      displayName,
    };
  });

  return (
    <nav className="breadcrumbs">
      {!isSelectedProductLoading && (
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item breadcrumbs__item--first">
            <Link
              to={{
                pathname: '/',
                search: location.search,
              }}
            >
              Homepage
            </Link>
            <span>/</span>
          </li>
          {breadcrumbItems.map(({ routeTo, isLast, displayName }) => (
            <li
              key={routeTo}
              className={classNames(
                'breadcrumbs__item',
                { 'breadcrumbs__item--first': !isLast },
              )}
            >
              {isLast ? (
                <Link to={routeTo}>{displayName}</Link>
              ) : (
                <>
                  <Link
                    to={{
                      pathname: routeTo,
                      search: location.search,
                    }}
                  >
                    {displayName}
                  </Link>
                  <span>/</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
