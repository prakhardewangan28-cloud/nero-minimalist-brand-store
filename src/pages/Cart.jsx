import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';

// Updated Mock Cart Data
const CART_ITEMS = [
  { id: 1, name: "The Architecture Tee", price: 65.00, quantity: 2, size: "M", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Minimalist Modern Trouser", price: 185.00, quantity: 1, size: "L", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop" },
];

const Cart = ({ cart = [] }) => {
  const navigate = useNavigate();
  
  // Group identical items if needed (for now we assume id-based uniqueness or single increments)
  // To match the user request of just reflecting Supabase data:
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="bg-primary min-h-screen pb-24">
      <div className="container max-w-7xl">
        <div className="mb-16 border-b border-white/10 pb-12">
            <span className="text-accent/30 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Order Manifest</span>
            <h1 className="text-5xl md:text-7xl font-black text-accent uppercase tracking-tighter italic leading-none">Your Studio Cart.</h1>
        </div>
        
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-8">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex flex-col sm:flex-row gap-8 bg-secondary p-8 border border-white/5 group hover:border-white/20 transition-all">
                  <Link to={`/products/${item.id}`} className="w-full sm:w-32 aspect-[3/4] bg-primary flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/400'} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                    />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/products/${item.id}`}>
                            <h3 className="font-heading text-lg font-black text-accent uppercase tracking-widest group-hover:opacity-60 transition-opacity mb-2">
                                {item.title || "STUDIO ARCHIVE"}
                            </h3>
                        </Link>
                        <p className="text-[10px] font-black uppercase tracking-widest text-accent/30">Technical Archive ID: {item.id}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-8">
                      <p className="font-bold text-accent tracking-tighter text-lg">${Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-8">
                  <Link to="/products" className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/40 hover:text-accent flex items-center gap-4 transition-all">
                      <ArrowLeft size={14} /> Continue Exploring Collections
                  </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-secondary p-10 border border-white/5 sticky top-[140px]">
                <h3 className="font-heading text-xs font-black uppercase tracking-[0.3em] mb-10 text-accent underline underline-offset-[12px] decoration-white/10">Order Summary</h3>
                <div className="space-y-6 mb-12">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-accent/40">Technical Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-accent/40">Studio Shipping</span>
                    <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Total Manifest</span>
                    <span className="text-2xl font-black tracking-tighter">${total.toFixed(2)}</span>
                    </div>
                </div>
                <Button 
                    variant="primary" 
                    fullWidth 
                    size="lg" 
                    className="h-[70px] uppercase font-black tracking-[0.4em] text-[12px] mb-8"
                    onClick={() => navigate('/checkout')}
                >
                    Initialize Checkout <ArrowRight size={14} className="ml-2" />
                </Button>
                <div className="flex items-center justify-center gap-2 py-4 bg-white/5 text-[10px] font-black uppercase tracking-widest text-accent/40 border border-white/5">
                    <ShieldCheck size={14} /> Encrypted Gateway Secure
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-40 text-center flex flex-col items-center">
            <h2 className="text-3xl font-black text-accent/20 uppercase tracking-[0.4em] mb-12">Cart Empty.</h2>
            <Button variant="outline" size="lg" onClick={() => navigate('/products')}>Browse Studio</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
