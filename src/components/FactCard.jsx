import React from "react";

function FactCard({ icon, data, title, moreData }) {
  const Icon = icon;

  const cardClasses =
    "w-full min-w-0 bg-card border border-card-border backdrop-blur-lg backdrop-saturate-[180%] rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col gap-3 group hover:shadow-[0_0_24px_rgba(173,198,255,0.15)] transition-all duration-300 relative overflow-hidden";

  return (
    <div className={`${cardClasses} hover:border-primary/50`}>
      
      {/* Icon */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        <Icon size={18} className="sm:w-5 sm:h-5" />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p className="font-label-mono text-[10px] sm:text-xs text-text-muted mb-1 uppercase tracking-wider truncate">
          {title}
          {moreData && ` ${moreData}`}
        </p>

        <p
          className="font-headline-md text-sm sm:text-base text-on-surface font-semibold truncate"
          title={data}
        >
          {data || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default FactCard;