import './PageWrapper.scss';

type PropTypes = {
  children: React.ReactNode;
};

export const PageWrapper: React.FC<PropTypes> = ({ children }) => {
  return (
    <div className="page-wrapper">
      {children}
    </div>
  );
};
