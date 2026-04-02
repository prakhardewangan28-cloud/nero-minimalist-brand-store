import { useState } from 'react';
import Button from '../components/ui/Button';

const Password = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Test@123') {
      onUnlock();
      window.localStorage.setItem('nero_authenticated', 'true');
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full flex flex-col items-center">
        <h1 className="font-heading text-4xl font-black tracking-[0.4em] text-accent mb-12">NÉRO</h1>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="relative group">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER ACCESS CODE" 
              className={`w-full px-8 py-5 bg-secondary border ${error ? 'border-red-500' : 'border-white/10 group-hover:border-white/30'} text-accent text-xs font-black tracking-[0.3em] outline-none transition-all placeholder:text-accent/10 text-center uppercase`}
              autoFocus
            />
            {error && (
              <p className="absolute -bottom-10 left-0 w-full text-center text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                Incorrect Access Code
              </p>
            )}
          </div>
          
          <Button type="submit" variant="primary" fullWidth className="h-[60px] shadow-none">
            Enter Studio
          </Button>
        </form>

        <div className="mt-24 text-center">
            <p className="text-[10px] text-accent/20 font-black uppercase tracking-[0.4em] leading-relaxed">
                Private Access Only. <br />Global Signal Store.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Password;
