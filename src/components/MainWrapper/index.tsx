import './MainWrapper.scss';

type PropTypes = {
  children: React.ReactNode;
};

export const MainWrapper: React.FC<PropTypes> = ({ children }) => {
  return (
    <main className="main-wrapper">
      {children}
    </main>
  );
};
