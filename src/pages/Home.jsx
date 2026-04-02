import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';

const Home = ({ products, loading, onAddToCart }) => {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const FEATURED_PRODUCTS = products.slice(0, 3);
  const BEST_SELLERS = products.slice(4, 7);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [products]); // Re-observe when products change

  if (loading) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-white animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="bg-primary overflow-x-hidden">
      
      {/* 1. Hero Section (Elevated Essentials Overhaul) */}
      <section className="relative w-full h-screen group overflow-hidden flex items-center justify-center">
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-fixed bg-center bg-no-repeat transition-transform duration-[3000ms] group-hover:scale-110 scale-100"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000&auto=format&fit=crop')" 
          }}
        >
          {/* 60% Opacity Overlay - Ensuring White Text Pops */}
          <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_500px_rgba(0,0,0,0.8)] transition-opacity duration-1000 group-hover:opacity-70"></div>
        </div>

        <div className="container relative z-20 text-center">
            <div ref={addToRefs} className="reveal flex flex-col items-center">
                <span className="text-accent/60 font-heading font-black tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-8 block transition-all hover:tracking-[0.6em] cursor-default italic">
                    Studio Collection Issue 01
                </span>
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black font-heading text-accent leading-[0.85] mb-12 tracking-[-0.04em] uppercase">
                    ELEVATED <br /> ESSENTIALS.
                </h1>
                <p className="text-sm md:text-lg text-accent/50 mb-16 max-w-2xl font-body font-bold uppercase tracking-[0.25em] leading-relaxed mx-auto italic">
                    The intersection of technical form and high-performance minimalist architecture.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link to="/products">
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="shadow-2xl shadow-white/5 border-none w-full sm:w-auto font-black tracking-[0.3em] uppercase text-[12px] h-[70px] px-16"
                        >
                          Shop Collection
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="backdrop-blur-sm bg-white/5 w-full sm:w-auto font-black tracking-[0.3em] uppercase text-[12px] h-[70px] px-16"
                        >
                          Studio Archive
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* 2. Featured Grid Section */}
      <section className="section-padding container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div ref={addToRefs} className="reveal">
            <span className="text-accent/30 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block underline decoration-white/10 underline-offset-8 italic">Studio Selection</span>
            <h2 className="text-5xl md:text-7xl font-black text-accent uppercase tracking-tighter leading-none italic">
                Featured Grid.
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline" size="sm" className="hidden md:flex transition-all hover:px-12 group uppercase font-black tracking-widest text-[10px]">
                Explore All <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {FEATURED_PRODUCTS.map(product => (
            <div key={product.id} ref={addToRefs} className="reveal">
              <ProductCard product={product} onAddToCart={() => onAddToCart(product)} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Single-Column Testimonials */}
      <section className="section-padding bg-secondary border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-[0.01] rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>
        
        <div className="container max-w-4xl text-center relative z-10">
          <div ref={addToRefs} className="reveal">
              <div className="flex gap-2 mb-12 justify-center opacity-30">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} fill="currentColor" className="text-accent w-4 h-4" />
                ))}
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-16 text-accent tracking-tighter leading-[1.05] italic">
                &quot;The architectural integrity of these pieces is industrial. I&apos;ve completely replaced my core rotation with NÉRO studio essentials. Remarkable forms.&quot;
              </h2>
              <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border border-white/20 rounded-none flex items-center justify-center text-accent/50 font-black uppercase tracking-widest text-[10px]">
                      M.T
                  </div>
                  <p className="font-black text-accent tracking-[0.4em] uppercase text-[10px]">Michael Thornton — Lead Architect</p>
                  <div className="flex gap-4 mt-12">
                    <button className="p-4 border border-white/10 hover:border-accent transition-all opacity-40 hover:opacity-100">
                        <ArrowLeft size={16} strokeWidth={1} />
                    </button>
                    <button className="p-4 border border-white/10 hover:border-accent transition-all opacity-40 hover:opacity-100">
                        <ArrowRight size={16} strokeWidth={1} />
                    </button>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="section-padding container">
        <div className="flex flex-col items-center text-center mb-24">
            <span ref={addToRefs} className="reveal text-accent/30 font-black tracking-[0.3em] uppercase text-[10px] mb-8 block underline decoration-white/10 underline-offset-8 italic">Global Top Rated</span>
            <h2 ref={addToRefs} className="reveal text-5xl md:text-8xl font-black text-accent uppercase mb-8 tracking-tighter">Studio Bestsellers.</h2>
            <p ref={addToRefs} className="reveal text-accent/40 max-w-xl text-xs sm:text-sm font-bold uppercase tracking-[0.1em] leading-relaxed italic">
                The foundational kits our global community relies on every day for professional performance.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {BEST_SELLERS.map(product => (
            <div key={product.id} ref={addToRefs} className="reveal">
                <ProductCard product={product} onAddToCart={() => onAddToCart(product)} />
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center lg:hidden">
            <Link to="/products" className="w-full">
                <Button variant="outline" size="sm" className="w-full uppercase font-black tracking-widest text-[10px]">View Full Archive</Button>
            </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
