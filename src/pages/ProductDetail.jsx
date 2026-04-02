import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Shield, RefreshCw, Truck, ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';

const ProductDetail = ({ products, loading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => String(p.id) === id);
  
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isScrolledPastATC, setIsScrolledPastATC] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const atcButton = document.getElementById('main-add-to-cart');
      if (atcButton) {
        const rect = atcButton.getBoundingClientRect();
        setIsScrolledPastATC(rect.top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-white animate-spin opacity-20" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-primary min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-4xl font-black text-accent uppercase mb-8">Signal Lost.</h2>
        <p className="text-accent/40 font-black uppercase tracking-[0.4em] mb-12 text-xs">The requested product architecture does not exist in our current archive.</p>
        <Link to="/products">
          <Button variant="outline" size="lg">Return to Archive</Button>
        </Link>
      </div>
    );
  }

  // Ensure images is an array for the gallery
  const productImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images 
    : [product.image];

  const handleAddToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="bg-primary min-h-screen pb-24">
      <div className="container max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="mb-12">
            <Link to="/products" className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40 hover:text-accent flex items-center gap-2">
                <ArrowLeft size={12} /> Back to Studio Collection
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Image Gallery (7-cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="aspect-[3/4] bg-secondary overflow-hidden group">
              <img 
                src={productImages[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
            </div>
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    className={`aspect-[3/4] bg-secondary overflow-hidden border transition-all ${activeImage === idx ? 'border-accent' : 'border-white/5 opacity-50'}`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info (5-cols) */}
          <div className="lg:col-span-5 h-full flex flex-col pt-4">
            <div className="mb-12">
              <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block underline decoration-white/10 underline-offset-8">Studio Seasonal Core</span>
              <h1 className="text-5xl font-black text-accent uppercase tracking-tighter mb-4 italic leading-none">{product.name}.</h1>
              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold tracking-tighter text-accent">${product.price?.toFixed(2)}</p>
                {product.price && <p className="text-accent/30 line-through text-sm italic tracking-widest">${(product.price * 1.25).toFixed(2)}</p>}
              </div>
            </div>

            <p className="text-accent/50 text-sm leading-relaxed mb-12 font-medium tracking-wide uppercase italic border-l-2 border-white/5 pl-8">
               {product.description || "The foundational architecture for a modern technical wardrobe. Engineered for Longevity."}
            </p>

            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Technical Sizing</span>
                    <button className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40 underline underline-offset-4 hover:text-accent">Size Architecture</button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {['S', 'M', 'L', 'XL'].map(size => (
                        <button 
                            key={size}
                            className={`py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                                selectedSize === size ? 'bg-white text-primary border-white' : 'text-accent/40 border-white/10 hover:border-white/30'
                            }`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div id="main-add-to-cart" className="mb-8 p-1 bg-white/5 focus-within:bg-white/10 transition-colors">
                <Button variant="primary" size="lg" fullWidth className="h-[70px] uppercase font-black tracking-[0.4em] text-[12px]" onClick={handleAddToCart}>
                    Execute Order — ${product.price?.toFixed(2)}
                </Button>
            </div>

            {/* Trust Signals */}
            <div className="bg-secondary p-8 mb-12 border border-white/5">
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">
                        <Truck size={14} className="text-accent" />
                        <span>Carbon-Neutral Global Shipping (48h Processing)</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">
                        <RefreshCw size={14} className="text-accent" />
                        <span>30-Day Studio Warranty & Returns</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">
                        <Shield size={14} className="text-accent" />
                        <span>Verified SSL Security Gateway</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex gap-4 opacity-30 grayscale saturate-0 hover:opacity-80 transition-opacity">
                        {/* Mock Payment Badges */}
                        <div className="h-6 w-10 border border-white/20"></div>
                        <div className="h-6 w-10 border border-white/20"></div>
                        <div className="h-6 w-10 border border-white/20"></div>
                    </div>
                </div>
            </div>

            {/* Quality Details */}
            <div className="space-y-6">
                <details className="group border-b border-white/5 pb-4">
                    <summary className="flex justify-between items-center cursor-pointer list-none text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                        Fabric Technology <ArrowRight size={12} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-4 text-[10px] font-medium text-accent/40 uppercase tracking-widest leading-relaxed">
                        100% GOTS Certified Organic Cotton. Developed in Japan. 300 GSM. Pre-washed for structural stability.
                    </p>
                </details>
                <details className="group border-b border-white/5 pb-4">
                    <summary className="flex justify-between items-center cursor-pointer list-none text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                        Ethical Standards <ArrowRight size={12} className="group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-4 text-[10px] font-medium text-accent/40 uppercase tracking-widest leading-relaxed">
                        Produced in our Studio A factory in London. Fair wages, carbon-neutral production, zero-plastic packaging.
                    </p>
                </details>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Mobile Add to Cart */}
      <div className={`lg:hidden fixed bottom-12 left-6 right-6 z-[100] transition-all duration-500 transform ${isScrolledPastATC ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
          <div className="bg-primary/95 backdrop-blur-xl p-3 border border-white/10 shadow-2xl flex items-center gap-4">
              <div className="w-16 h-16 bg-secondary flex-shrink-0">
                  <img src={productImages[0]} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 overflow-hidden">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-accent truncate">{product.name}</h4>
                  <p className="text-[10px] font-bold tracking-tighter text-accent/60">${product.price?.toFixed(2)}</p>
              </div>
              <Button variant="primary" size="sm" className="px-6" onClick={handleAddToCart}>
                  Buy
              </Button>
          </div>
      </div>

    </div>
  );
};

export default ProductDetail;
