import Header from "../components/Header/Header";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="base-layout__content">
        {children}
      </div>
    </div>
  )
};

export default BaseLayout;