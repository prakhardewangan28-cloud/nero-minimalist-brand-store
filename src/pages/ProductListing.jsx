import { useState } from 'react';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"];

const ProductListing = ({ products, loading, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-white animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen pb-24">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-24 border-b border-white/10 pb-12">
          <span className="text-accent/30 font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Current Archive</span>
          <h1 className="text-5xl md:text-7xl font-black text-accent uppercase tracking-tighter italic leading-none mb-6">
            Studio Collections.
          </h1>
          <p className="text-accent/50 max-w-xl text-xs sm:text-sm font-bold uppercase tracking-[0.1em] leading-relaxed">
            The foundational architecture for a modern technical wardrobe. Engineered for Longevity.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                  activeCategory === cat ? 'bg-white text-primary border-white' : 'text-accent/40 border-white/10 hover:border-white/30'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-accent/40 text-[10px] font-black uppercase tracking-[0.2em]">
            <span>Sort by:</span>
            <button className="flex items-center gap-2 text-accent hover:text-white transition-colors">
              Featured <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-accent/20 font-black uppercase tracking-[0.4em]">No technical signals found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
