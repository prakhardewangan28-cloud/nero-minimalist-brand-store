import { useEffect } from 'react';
import Button from '../components/ui/Button';

const PolicyPage = ({ title }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="bg-primary min-h-screen pb-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <span className="text-accent/30 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Legal Archive</span>
          <h1 className="text-5xl md:text-7xl font-black text-accent uppercase tracking-tighter italic leading-none">{title}.</h1>
        </div>

        {/* Content */}
        <div className="space-y-16">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-accent underline underline-offset-[12px] decoration-white/10">Overview</h2>
            <p className="text-accent/60 text-sm leading-relaxed max-w-2xl font-medium tracking-wide">
              At NÉRO, we believe in complete transparency. Our operations are grounded in a minimalist philosophy that extends from our design studio to our legal framework.
            </p>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-accent underline underline-offset-[12px] decoration-white/10">Technical Details</h2>
            <div className="space-y-8 text-accent/50 text-[12px] font-medium leading-relaxed max-w-3xl">
              <p>
                1.1 All technical garments are responsibly sourced from our audited partners in Italy and Japan. We strictly monitor every stage of production to ensure zero-waste principles are upheld.
              </p>
              <p>
                1.2 Digital assets and user data are encrypted using standard industry-grade protocols. We do not sell signals or exchange private information with third-party actors.
              </p>
              <p>
                1.3 Shipping is handled via our carbon-neutral logistics network. Standard processing time is 48 studio hours.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-accent underline underline-offset-[12px] decoration-white/10">Inquiries</h2>
            <p className="text-accent/50 text-[12px] mb-8 font-medium italic">
                For further technical documentation or studio inquiries, please reach out to our support team.
            </p>
            <Button variant="outline" size="sm">Contact Studio</Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
