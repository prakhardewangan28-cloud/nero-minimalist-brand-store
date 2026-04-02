import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ShieldCheck, CreditCard, Lock, CheckCircle, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';

const Checkout = ({ cart = [], clearCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Contact, 2: Shipping, 3: Payment
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const handleNextOrExecute = () => {
    if (!customerEmail || !firstName || !lastName || !address || !city) {
      alert("STUDIO ERROR: COMPLETE ALL FIELDS TO INITIALIZE.");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleExecuteOrder();
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const total = subtotal + (subtotal > 0 ? 25 : 0);

  const handleExecuteOrder = async () => {
    setIsLoading(true);
    setOrderError(null);

    const { error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: `${firstName} ${lastName}`.trim(),
          customer_email: customerEmail,
          total_amount: total,
          items: cart,
        },
      ]);

    setIsLoading(false);

    if (error) {
      console.error('Order insert failed:', error);
      setOrderError('Signal failed. Please retry.');
      return;
    }

    // DB confirmed — clear cart and show modal
    if (clearCart) clearCart();
    setIsSuccess(true);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] mb-12">
      <span className={step >= 1 ? "text-accent" : "text-accent/30"}>Studio Information</span>
      <ChevronRight size={12} className="text-accent/20" />
      <span className={step >= 2 ? "text-accent" : "text-accent/30"}>Logistics</span>
      <ChevronRight size={12} className="text-accent/20" />
      <span className={step >= 3 ? "text-accent" : "text-accent/30"}>Encryption</span>
    </div>
  );

  return (
    <div className="bg-primary min-h-screen pt-[180px] pb-24">

      {/* ─── ORDER SUCCESS MODAL ─── */}
      {isSuccess && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'rgba(0,0,0,0.96)' }}
          onClick={handleReturnHome}
        >
          {/* Inner card — stop click from bubbling to backdrop */}
          <div
            className="relative w-full max-w-lg mx-4 border border-white/10 bg-black p-16 flex flex-col items-center text-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Icon */}
            <div className="mb-10">
              <CheckCircle
                size={48}
                strokeWidth={1}
                className="text-white/60 mx-auto"
              />
            </div>

            {/* "MANIFEST SECURED." headline */}
            <h1
              className="font-heading font-black uppercase tracking-[0.3em] text-white text-3xl mb-6 italic"
              style={{ letterSpacing: '0.25em' }}
            >
              Manifest Secured.
            </h1>

            {/* Divider */}
            <div className="w-16 h-px bg-white/20 mb-8" />

            {/* Subtext */}
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/40 leading-relaxed max-w-xs">
              Your order has been logged into the studio. A digital signal has been sent to your email.
            </p>

            {/* Spacer */}
            <div className="mt-14 w-full">
              <button
                onClick={handleReturnHome}
                className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all duration-300"
              >
                Return to Collections
              </button>
            </div>

            {/* Fine print */}
            <p className="mt-6 text-[9px] font-bold uppercase tracking-widest text-white/20 italic">
              Studio Archive — Order Confirmed
            </p>
          </div>
        </div>
      )}

      {/* ─── MAIN CHECKOUT LAYOUT ─── */}
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Main Checkout Form (7-cols) */}
          <div className="lg:col-span-7">
            <Link
              to="/cart"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/40 hover:text-accent flex items-center gap-2 mb-12 transition-all"
            >
              <ArrowLeft size={14} /> Back to Manifest
            </Link>

            {renderStepIndicator()}

            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>

              {/* Step 1 — Contact */}
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-accent uppercase tracking-tighter italic">
                    Studio Contact Details.
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      placeholder="EMAIL SIGNAL"
                      className="w-full px-8 py-5 bg-secondary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30"
                    />
                    <div className="flex gap-4 items-center">
                      <input type="checkbox" className="w-4 h-4 accent-white" id="newsletter" />
                      <label
                        htmlFor="newsletter"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/40"
                      >
                        Accept technical drops &amp; signals
                      </label>
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-accent uppercase tracking-tighter italic pt-6">
                    Architecture Destination.
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="FIRST NAME" className="px-8 py-5 bg-secondary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30" />
                    <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="LAST NAME" className="px-8 py-5 bg-secondary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30" />
                    <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="ADDRESS ARCHITECTURE" className="sm:col-span-2 px-8 py-5 bg-secondary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30" />
                    <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="CITY" className="px-8 py-5 bg-secondary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30" />
                    <input placeholder="POSTAL SIGNAL" className="px-8 py-5 bg-secondary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30" />
                  </div>
                </div>
              )}

              {/* Step 2 — Shipping */}
              {step === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-accent uppercase tracking-tighter italic">
                    Logistics Selection.
                  </h2>
                  <div className="space-y-4">
                    <div className="p-8 bg-secondary border border-white/20 flex justify-between items-center cursor-pointer">
                      <div className="flex gap-4 items-center">
                        <div className="w-4 h-4 border-2 border-accent rounded-full flex items-center justify-center p-1">
                          <div className="w-full h-full bg-accent rounded-full" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-accent">
                            Global Carbon-Neutral Express
                          </p>
                          <p className="text-[10px] font-bold text-accent/40 uppercase mt-1 tracking-tighter italic">
                            48 Studio Hours
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-accent">$25.00</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 — Payment */}
              {step === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-accent uppercase tracking-tighter italic">
                    Encryption Gateway.
                  </h2>
                  <div className="bg-secondary p-10 border border-white/5 text-center">
                    <p className="text-xs font-bold text-accent/40 uppercase tracking-widest leading-relaxed mb-8 max-w-sm mx-auto">
                      Your technical transaction is encrypted via our 256-bit secure SSL architecture.
                    </p>
                    <div className="flex justify-center gap-8 text-accent/20">
                      <CreditCard size={32} />
                      <Lock size={32} />
                    </div>
                  </div>
                </div>
              )}

              {/* Spacer so fixed bar doesn't obscure last form field */}
              <div className="h-[120px]" />

              {/* Trust signals */}
              <div className="pt-12 border-t border-white/5 flex flex-col items-center">
                <div className="flex gap-8 opacity-20 grayscale mb-8">
                  {['VISA', 'MC', 'AMEX', 'AE'].map((brand) => (
                    <div key={brand} className="w-12 h-8 border border-white/50 rounded flex items-center justify-center text-[8px] font-bold text-white">
                      {brand}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-accent/30 italic">
                  <ShieldCheck size={14} /> Studio Secure Encryption Verified
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar — Order Breakdown */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="sticky top-[200px] bg-secondary p-12 border border-white/5">
              <h3 className="font-heading text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-accent pb-6 border-b border-white/5 italic">
                Order Breakdown.
              </h3>
              <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto pr-2">
                {cart.length > 0 ? cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-6 items-center group">
                    <div className="w-16 h-20 bg-primary flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image_url || 'https://via.placeholder.com/400'}
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                        alt={item.title}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] font-black tracking-widest uppercase mb-1">
                        {item.title || 'STUDIO ARCHIVE'}
                      </h4>
                      <p className="text-[10px] font-bold text-accent/30 tracking-tighter">
                        Manifest ID: {String(item.id).slice(0, 8)}
                      </p>
                    </div>
                    <p className="font-bold text-accent text-sm tracking-tighter">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                )) : (
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent/20 italic">
                    Manifest Empty
                  </p>
                )}
              </div>
              <div className="space-y-4 pt-12 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-accent/40">
                  <span>Architecture Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-accent/40">
                  <span>Studio Shipping</span>
                  <span>{subtotal > 0 ? '$25.00' : '—'}</span>
                </div>
                <div className="pt-8 flex justify-between items-end border-t border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent underline underline-offset-8 decoration-white/10">
                    Manifest Total
                  </span>
                  <span className="text-3xl font-black tracking-tighter text-accent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── ALWAYS-VISIBLE FIXED ACTION BAR ─── */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: 0,
          right: 0,
          zIndex: 9998,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          className="flex flex-col md:flex-row gap-4 w-[calc(100%-2rem)] md:w-full max-w-2xl mx-auto bg-black/95 backdrop-blur-xl p-4 border border-white/20 shadow-[0_-20px_60px_rgba(0,0,0,0.7)]"
          style={{ pointerEvents: 'all', opacity: 1, visibility: 'visible' }}
        >
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 h-[60px] uppercase font-black tracking-[0.4em] text-[11px] bg-transparent border border-white/20 text-white hover:border-white transition-all"
            >
              Return
            </button>
          )}
          <button
            onClick={handleNextOrExecute}
            className="flex-[2] h-[60px] uppercase font-black tracking-[0.4em] text-[11px] bg-black text-white border border-white/40 hover:bg-white/10 transition-all"
            style={{ opacity: 1, visibility: 'visible', color: '#ffffff' }}
          >
            {step === 3 ? 'Execute Architecture Order' : 'Initialize Signal'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
