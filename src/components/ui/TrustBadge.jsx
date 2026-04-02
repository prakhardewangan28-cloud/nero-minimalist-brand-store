const TrustBadge = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-12 bg-transparent transition-all duration-700 hover:opacity-100 opacity-60 group border border-white/5 hover:border-white/20">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-10 text-accent transition-transform duration-700 group-hover:scale-110">
        <Icon size={32} strokeWidth={0.75} />
      </div>
      <h4 className="font-heading text-xs font-black uppercase tracking-[0.3em] mb-4 text-accent">{title}</h4>
      <p className="text-[10px] text-text-muted leading-relaxed font-bold uppercase tracking-[0.1em] max-w-[200px]">{description}</p>
    </div>
  );
};

export default TrustBadge;
