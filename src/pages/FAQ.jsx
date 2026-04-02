import { useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const FAQ_ITEMS = [
    { q: "Shipping Architecture", a: "We ship globally via our carbon-neutral logistics network. Standard processing time is 48 studio hours. Delivery typically takes 3-7 business days depending on your location signal." },
    { q: "Technical Returns", a: "Returns are accepted within 30 days of signal receipt. Items must be in their original condition and include all studio tags and packaging. Visit our logistics portal to initialize a return." },
    { q: "Ethical Standards", a: "Every NÉRO piece is ethically sourced and responsibly manufactured. We prioritize high-performance recycled materials and maintain complete transparency across our entire supply chain." },
    { q: "Quality Warranty", a: "We stand by the architectural integrity of our garments. We offer a lifetime quality guarantee for manufacturing defects. Contact our studio with your order signal for assistance." },
  ];

  return (
    <div className="bg-primary min-h-screen pb-24">
      <div className="container max-w-4xl">
        <div className="mb-24 border-b border-white/10 pb-12">
            <span className="text-accent/30 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Studio Documentation</span>
            <h1 className="text-5xl md:text-7xl font-black text-accent uppercase tracking-tighter italic leading-none">Global FAQ.</h1>
        </div>

        <div className="space-y-12">
            {FAQ_ITEMS.map((item, idx) => (
                <details key={idx} className="group border-b border-white/5 pb-8">
                    <summary className="flex justify-between items-center cursor-pointer list-none text-xl font-heading font-black uppercase tracking-widest text-accent italic hover:opacity-50 transition-opacity">
                        {item.q} <ChevronDown size={24} strokeWidth={1} className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-8 text-accent/50 text-[12px] font-medium uppercase tracking-[0.2em] leading-relaxed max-w-2xl border-l border-white/10 pl-8">
                        {item.a}
                    </p>
                </details>
            ))}
        </div>

        <div className="mt-32 p-12 bg-secondary border border-white/5 text-center">
            <h3 className="text-xl font-black text-accent uppercase tracking-[0.2em] mb-6 italic underline underline-offset-8 decoration-white/10">Still have a signal to send?</h3>
            <p className="text-accent/40 text-[10px] font-black uppercase tracking-[0.2em] mb-12">Our studio support team is available Monday through Friday for technical consultation.</p>
            <Button variant="primary">Initialize Studio Inquiry <ArrowRight size={14} className="ml-2" /></Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
