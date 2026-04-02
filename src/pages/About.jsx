import { useEffect } from 'react';
import Button from '../components/ui/Button';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary min-h-screen pb-24">
      <div className="container max-w-4xl">
        <div className="mb-24 border-b border-white/10 pb-12">
            <span className="text-accent/30 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Studio Heritage</span>
            <h1 className="text-5xl md:text-7xl font-black text-accent uppercase tracking-tighter italic leading-none">Our Ethos.</h1>
        </div>

        <div className="space-y-24">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-square bg-secondary border border-white/5 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-50" />
            </div>
            <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-accent underline underline-offset-[12px] decoration-white/10">The Signal</h3>
                <p className="text-accent/60 text-sm leading-relaxed font-medium tracking-wide mb-8">
                    Founded in London, NÉRO is a technical fashion studio dedicated to the architecture of minimalist modern wear. We operate at the intersection of raw industrial aesthetics and high-performance garment engineering.
                </p>
                <p className="text-accent/40 text-xs leading-relaxed font-medium tracking-wide">
                    Every piece is developed in-house, tested for structural integrity, and responsibly sourced from our global network of carbon-neutral artisans.
                </p>
            </div>
          </section>

          <section className="bg-secondary p-12 lg:p-24 border border-white/5 text-center">
            <h2 className="text-4xl font-black text-accent uppercase tracking-tighter mb-8 italic">Responsibility First.</h2>
            <p className="text-accent/40 max-w-2xl mx-auto text-xs leading-relaxed font-bold uppercase tracking-[0.2em] mb-12">
                We believe longevity is the ultimate sustainability. Our garments are built to withstand 500+ wear cycles, significantly reducing the environmental footprint of a modern wardrobe.
            </p>
            <Button variant="outline" size="sm">Explore Our Sustainability Document</Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
