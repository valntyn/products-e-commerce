import './PageWrapper.scss';

type PropTypes = {
  children: React.ReactNode;
};

export const PageWrapper: React.FC<PropTypes> = ({ children }) => {
  return (
    <section className="page-wrapper">
      {children}
    </section>
  );
};
