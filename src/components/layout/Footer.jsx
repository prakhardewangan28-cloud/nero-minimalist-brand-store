import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  ShieldCheck, 
  RefreshCw,
  ArrowRight 
} from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Button from '../ui/Button';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Signal handling logic here
    setEmail('');
  };

  return (
    <footer className="w-full bg-secondary text-accent mt-auto border-t border-white/5">
      
      {/* 1. Trust Badges Section (In Footer Area) */}
      <div className="border-b border-white/5 bg-primary/20">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center sticky">
            <div className="flex flex-col items-center group">
              <Truck size={32} strokeWidth={1} className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3">Global Logistics</h4>
              <p className="text-[10px] text-accent/30 font-bold uppercase tracking-widest max-w-[180px]">Complimentary shipping on all studio orders over $300.</p>
            </div>
            <div className="flex flex-col items-center group">
              <ShieldCheck size={32} strokeWidth={1} className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3">Quality Warranty</h4>
              <p className="text-[10px] text-accent/30 font-bold uppercase tracking-widest max-w-[180px]">Lifetime durability signals for all core technical wear.</p>
            </div>
            <div className="flex flex-col items-center group">
              <RefreshCw size={32} strokeWidth={1} className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3">Zero-Waste Ethos</h4>
              <p className="text-[10px] text-accent/30 font-bold uppercase tracking-widest max-w-[180px]">100% recycled materials and ethically sourced craftsmanship.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Signup Section (In Footer Area) */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-6 py-24 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic">Join The Studio.</h2>
            <p className="text-accent/30 mb-12 max-w-xl mx-auto text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">
                Subscribe to receive early access to technical drops, studio journal entries, and private invitations.
            </p>
            <form className="flex flex-col md:flex-row gap-0 w-full max-w-2xl mx-auto border border-white/10 p-2 focus-within:border-accent transition-all bg-primary/5" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="SIGNALS@STUDIO.COM" 
                    className="flex-1 px-8 py-5 bg-transparent border-none text-accent placeholder:text-accent/10 text-xs font-black tracking-widest outline-none"
                    required
                />
                <Button type="submit" variant="primary" className="h-[60px] md:w-auto px-12 uppercase font-black tracking-widest text-[10px]">
                    Enter Studio
                </Button>
            </form>
        </div>
      </div>

      {/* 3. Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          
          <div className="flex flex-col">
            <Link to="/" className="font-heading text-3xl font-black tracking-[0.4em] text-accent mb-10 group transition-all">
              NÉRO
            </Link>
            <p className="text-accent/40 text-[10px] leading-relaxed mb-10 max-w-xs uppercase tracking-widest font-black opacity-80 italic">
              Minimalist Modern Architecture. <br /> London Studio Edition.
            </p>
            <div className="flex gap-8">
              {[FaInstagram, FaFacebook, FaTwitter].map((IconComp, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="text-accent opacity-40 hover:opacity-100 transition-opacity"
                >
                  <IconComp size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-accent underline underline-offset-[12px] decoration-white/10 italic">Studio Collections</h4>
            <div className="flex flex-col gap-6 text-accent/30 text-[10px] uppercase font-black tracking-[0.2em]">
              <Link to="/products" className="hover:text-accent transition-colors">Technical Tops</Link>
              <Link to="/products" className="hover:text-accent transition-colors">Outerwear Architecture</Link>
              <Link to="/products" className="hover:text-accent transition-colors">Studio Bottoms</Link>
              <Link to="/products" className="hover:text-accent transition-colors">Seasonal Archive</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-accent underline underline-offset-[12px] decoration-white/10 italic">Information</h4>
            <div className="flex flex-col gap-6 text-accent/30 text-[10px] uppercase font-black tracking-[0.2em]">
              <Link to="/about" className="hover:text-accent transition-colors">Our Ethos</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">Studio Contact</Link>
              <Link to="/faq" className="hover:text-accent transition-colors">Journal Archive</Link>
              <Link to="/faq" className="hover:text-accent transition-colors">Global Stockists</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-accent underline underline-offset-[12px] decoration-white/10 italic">Support</h4>
            <div className="flex flex-col gap-6 text-accent/30 text-[10px] uppercase font-black tracking-[0.2em]">
              <Link to="/faq" className="hover:text-accent transition-colors">Exchanges & Shipping</Link>
              <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link to="/faq" className="hover:text-accent transition-colors">Technical Support</Link>
              <Link to="/checkout" className="hover:text-accent transition-colors">Secure Checkout</Link>
            </div>
          </div>

        </div>
      </div>
      
      <div className="container border-t border-white/5 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[8px] text-accent/20 uppercase font-black tracking-[0.4em] text-center">&copy; {new Date().getFullYear()} NÉRO STUDIO STORE. LONDON ARCHIVE.</p>
        <div className="flex gap-4 opacity-10">
            <div className="w-10 h-6 border border-accent rounded-sm"></div>
            <div className="w-10 h-6 border border-accent rounded-sm"></div>
            <div className="w-10 h-6 border border-accent rounded-sm"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
