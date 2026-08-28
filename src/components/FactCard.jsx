import React from 'react'

function FactCard({icon, data, title, moreData}) {
  const Icon = icon;
  const cardClasses = "bg-card border border-card-border backdrop-blur-lg backdrop-saturate-[180%] rounded-2xl p-6 flex flex-col gap-3 group hover:shadow-[0_0_24px_rgba(173,198,255,0.15)] transition-all duration-300 relative overflow-hidden";


  return (
    <div className={`${cardClasses} hover:border-primary/50`}>
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-label-mono text-xs text-text-muted mb-1 uppercase tracking-wider">{title} {moreData}</p>
          <p className="font-headline-md text-base text-on-surface font-semibold truncate">{data}</p>
        </div>
      </div>
  )
}

export default FactCard