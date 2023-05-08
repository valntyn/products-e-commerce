import { PageNavLink } from '@components/PageNavLink';
import './Header.scss';
import { paths } from '@constants/paths';

export const Header = () => {
  return (
    <header className="header">
      <nav className="header__box-test">
        <PageNavLink to="/" text="Home" />
        <PageNavLink to={paths.products} text="ProductsPage" />
        <PageNavLink to={paths.checkout} text="CheckoutPage" />
        <PageNavLink to={paths.notFound} text="NotFoundPage" />
      </nav>
    </header>
  );
};
