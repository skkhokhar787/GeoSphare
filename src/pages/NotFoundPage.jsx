import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="max-w-container-max mx-auto px-margin-safe py-24 text-center flex flex-col items-center justify-center gap-6">
      <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(173,198,255,0.2)]">
        <Globe size={40} />
      </div>
      <span className="font-label-mono text-xs text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
        404 ERROR - PAGE NOT FOUND
      </span>
      <h1 className="font-display-lg text-4xl sm:text-5xl font-extrabold text-on-surface">
        Lost in Territory
      </h1>
      <p className="text-text-muted text-base max-w-md">
        The coordinates or page path you requested does not exist on our global map.
      </p>
      <Link
        to="/"
        className="mt-2 px-6 py-3.5 rounded-2xl bg-primary text-bg-deep font-bold font-label-mono text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
      >
        <ArrowLeft size={16} /> RETURN TO GEOSPHERE HOME
      </Link>
    </div>
  );
};

export default NotFoundPage;
