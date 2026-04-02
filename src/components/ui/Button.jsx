const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-heading font-extrabold tracking-[0.1em] uppercase transition-all duration-300 rounded-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent",
    secondary: "bg-secondary text-accent border border-secondary hover:border-accent",
    outline: "bg-transparent text-accent border border-accent hover:bg-accent hover:text-primary",
  };
  
  const sizes = {
    sm: "px-6 py-2 text-[10px]",
    md: "px-8 py-4 text-xs",
    lg: "px-12 py-5 text-sm",
  };
  
  const rootClass = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  return (
    <button className={rootClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
