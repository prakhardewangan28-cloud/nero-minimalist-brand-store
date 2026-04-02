import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Password from './pages/Password';
import PolicyPage from './pages/PolicyPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleAddToCart = (product) => {
    const newProduct = {
      id: product.id,
      title: product.name || product.title,
      price: product.price,
      image_url: product.image_url
    };
    setCart(prev => [...prev, newProduct]);
    
    // Trigger Toast
    setToast("MANIFEST UPDATED");
    setTimeout(() => setToast(null), 2000);
  };

  if (!isAuthenticated) {
    return <Password onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="relative">
        {/* Minimalist Toast */}
        {toast && (
          <div className="fixed top-24 right-8 z-[9999] bg-black border border-white text-white px-6 py-3 font-heading font-black tracking-[0.2em] text-[10px] uppercase animate-in slide-in-from-right-8 duration-300">
            {toast}
          </div>
        )}
        
        <Layout cart={cart}>
          {/* Defined Global Offset: 180px pt to clear NÉRO logo/header */}
          <main className="pt-[180px]">
            <Routes>
              <Route path="/" element={<Home products={products} loading={loading} onAddToCart={handleAddToCart} />} />
              <Route path="/products" element={<ProductListing products={products} loading={loading} onAddToCart={handleAddToCart} />} />
              <Route path="/products/:id" element={<ProductDetail products={products} loading={loading} onAddToCart={handleAddToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} clearCart={() => setCart([])} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ title="Frequently Asked Questions" />} />
              <Route path="/privacy" element={<PolicyPage title="Privacy Policy" />} />
              <Route path="/returns" element={<PolicyPage title="Shipping & Returns" />} />
              <Route path="/password" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
