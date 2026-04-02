import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

const Header = ({ cart = [] }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="h-[40px] bg-white text-primary flex items-center justify-center text-[10px] uppercase font-heading font-extrabold tracking-[0.2em] z-50 relative">
        Free Global Shipping on orders over $150. Limited time only.
      </div>

      <header className={`relative w-full h-[100px] z-50 transition-all duration-500 ${isScrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="container h-full flex items-center justify-between">
          
          <button 
            className={`md:hidden p-2 -ml-2 text-accent transition-opacity hover:opacity-70`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>

          <Link to="/" className="font-heading text-3xl font-black tracking-[0.4em] text-accent pl-2 md:pl-0">
            NÉRO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-12">
            {['Shop', 'New Arrivals', 'Our Story'].map((item) => (
              <Link 
                key={item}
                to={item === 'Shop' ? '/products' : item === 'New Arrivals' ? '/products?category=new' : '/about'} 
                className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Nav Overlay */}
          <nav className={`md:hidden fixed inset-0 top-[140px] bg-primary transition-all duration-700 ${mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
            <div className="flex flex-col p-12 gap-8 items-center justify-center h-full">
              {['Shop', 'New Arrivals', 'Collections', 'Story'].map((item) => (
                <Link 
                  key={item}
                  to="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading font-black uppercase tracking-[0.3em] text-accent hover:opacity-50 transition-opacity"
                >
                  {item}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-6">
            <button className="text-accent p-2 hover:opacity-50 transition-opacity hidden sm:block">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link to="/cart" className="relative text-accent p-2 hover:opacity-50 transition-opacity group">
              <ShoppingBag size={18} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-white text-primary text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
