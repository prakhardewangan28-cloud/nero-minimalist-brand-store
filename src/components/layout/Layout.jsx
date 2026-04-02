import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, cart = [] }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="app bg-primary min-h-screen">
      <Header cart={cart} />
      <main className={isHome ? 'pt-0' : 'pt-[100px]'}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
