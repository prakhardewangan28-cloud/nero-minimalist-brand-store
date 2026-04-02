import { Link } from 'react-router-dom';
import Button from './Button';

const ProductCard = ({ product, onAddToCart }) => {
  const imageUrl = product.image_url || 'https://via.placeholder.com/400';

  return (
    <div className="flex flex-col group h-full bg-secondary transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-none overflow-hidden pb-4">
      <div className="relative overflow-hidden aspect-[3/4] bg-[#1A1A1A] flex items-center justify-center">
        <Link to={`/products/${product.id}`} className="w-full h-full block">
          <img 
            src={imageUrl} 
            alt={product.name || product.title || "STUDIO ARCHIVE"} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" 
            loading="lazy" 
          />
        </Link>
      </div>
      
      <div className="p-6 pb-2 flex flex-col flex-1">
        <div className="mb-2">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-heading text-sm font-bold text-accent tracking-wider uppercase group-hover:opacity-70 transition-opacity">
              {product.name || product.title || "STUDIO ARCHIVE"}
            </h3>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-3">
            <p className="text-accent font-bold text-sm tracking-tighter">
              ${(product.price || 0).toFixed(2)}
            </p>
            {product.price && (
              <p className="text-accent/30 line-through text-[10px] italic">
                ${(product.price * 1.25).toFixed(2)}
              </p>
            )}
          </div>
          <span className="text-[10px] font-black tracking-widest text-accent/20 uppercase italic">{product.category || 'Core'}</span>
        </div>
        
        <button 
          className="bg-white text-black py-2 px-4 mt-4 w-full font-heading font-black tracking-widest text-[10px] uppercase transition-all hover:bg-white/90 active:scale-[0.98]"
          onClick={(e) => {
            e.preventDefault();
            // Passing full object as requested
            onAddToCart?.({
              id: product.id,
              title: product.name || product.title,
              price: product.price,
              image_url: product.image_url
            });
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
