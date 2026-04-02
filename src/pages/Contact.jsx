import { useEffect } from 'react';
import { Mail, Globe, MapPin, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary min-h-screen pb-24">
      <div className="container max-w-4xl">
        <div className="mb-24 border-b border-white/10 pb-12">
            <span className="text-accent/30 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Studio Signals</span>
            <h1 className="text-5xl md:text-7xl font-black text-accent uppercase tracking-tighter italic leading-none">Contact Studio.</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-accent underline underline-offset-[12px] decoration-white/10">Primary Signal</h3>
              <p className="text-accent hover:opacity-50 transition-opacity font-heading text-xl uppercase tracking-widest cursor-pointer">signals@studienero.com</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-accent underline underline-offset-[12px] decoration-white/10">Location</h3>
              <p className="text-accent/60 text-sm leading-relaxed max-w-xs font-medium tracking-wide">
                NÉRO STUDIO STORE LONDON UNIT 42 SHOREDITCH LONDON, E1
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-accent underline underline-offset-[12px] decoration-white/10">Studio Hours</h3>
              <div className="text-accent/40 text-[10px] font-black uppercase tracking-[0.2em] space-y-2">
                <p>Monday — Friday: 10:00 — 18:00</p>
                <p>Saturday: 11:00 — 17:00</p>
              </div>
            </div>
          </div>

          <form className="space-y-8 bg-secondary p-12 border border-white/5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
                <input placeholder="STUDIO NAME" className="w-full px-8 py-5 bg-primary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30" />
                <input type="email" placeholder="SIGNAL EMAIL" className="w-full px-8 py-5 bg-primary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30" />
                <textarea rows="4" placeholder="MESSAGE CONTENT" className="w-full px-8 py-5 bg-primary border border-white/5 text-accent text-xs font-black tracking-widest outline-none transition-all placeholder:text-accent/10 focus:border-white/30 resize-none"></textarea>
            </div>
            <Button variant="primary" fullWidth size="lg">Send Message <ArrowRight size={14} className="ml-2" /></Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
