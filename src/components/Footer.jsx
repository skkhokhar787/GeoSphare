import React from "react";
import { Globe, Mail, Rss, Code, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const exploreLinks = [
    { label: "All Countries", path: "/explore" },
    { label: "World Regions", path: "/regions" },
    { label: "Saved Favorites", path: "/favorites" },
    { label: "United States", path: "/country/US" },
  ];

  const quickRegions = [
    { label: "Americas", path: "/explore?region=Americas" },
    { label: "Europe", path: "/explore?region=Europe" },
    { label: "Asia", path: "/explore?region=Asia" },
    { label: "Africa", path: "/explore?region=Africa" },
    { label: "Oceania", path: "/explore?region=Oceania" },
  ];

  return (
    <footer className="relative mt-16 sm:mt-24 border-t border-border-glass bg-card backdrop-blur-lg overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 left-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-32 right-0 sm:right-10 w-56 sm:w-72 h-56 sm:h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-container-max mx-auto px-4 sm:px-margin-safe pt-10 sm:pt-16 pb-6 sm:pb-8 flex flex-col gap-10 sm:gap-12">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10">

          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4 min-w-0">

            <Link
              to="/"
              className="font-bold text-primary text-xl sm:text-2xl tracking-tighter flex items-center gap-2 w-fit"
            >
              <Globe size={22} className="sm:w-6 sm:h-6" />
              GeoSphere
            </Link>

            <p className="font-body-base text-sm text-text-muted max-w-xs leading-relaxed">
              Explore accurate geographic, demographic, and economic data
              for countries across the globe formatted strictly to the
              restcountries standard.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-3 mt-1">
              {[Globe, Mail, Rss, Code].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="Social link"
                  className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full border border-border-glass bg-card flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-mono text-xs text-text-muted tracking-widest uppercase mb-1">
              Explore
            </h4>

            {exploreLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="font-body-base text-sm text-on-surface-variant hover:text-primary transition-colors duration-300 w-fit"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Regions */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-mono text-xs text-text-muted tracking-widest uppercase mb-1">
              Regions
            </h4>

            {quickRegions.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="font-body-base text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 w-fit"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Schema Info */}
          <div className="flex flex-col gap-3 lg:col-span-2 min-w-0">

            <h4 className="font-label-mono text-xs text-text-muted tracking-widest uppercase mb-1">
              Data Engine
            </h4>

            <p className="font-body-base text-xs text-text-muted leading-relaxed">
              Built using full country dataset specs including{" "}
              <code className="text-secondary bg-surface-variant px-1 rounded font-label-mono">
                alpha2Code
              </code>
              ,{" "}
              <code className="text-secondary bg-surface-variant px-1 rounded font-label-mono">
                alpha3Code
              </code>
              ,{" "}
              <code className="text-secondary bg-surface-variant px-1 rounded font-label-mono">
                borders
              </code>
              ,{" "}
              <code className="text-secondary bg-surface-variant px-1 rounded font-label-mono">
                currencies
              </code>
              ,{" "}
              <code className="text-secondary bg-surface-variant px-1 rounded font-label-mono">
                gini
              </code>
              , and{" "}
              <code className="text-secondary bg-surface-variant px-1 rounded font-label-mono">
                populationDensity
              </code>
              .
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-glass pt-6 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 text-center sm:text-left">

          <span className="font-label-mono text-[10px] sm:text-xs text-text-muted flex flex-wrap justify-center sm:justify-start items-center gap-1 leading-relaxed">
            © {new Date().getFullYear()} GEOSPHERE. CRAFTED WITH

            <Heart
              size={12}
              className="text-tertiary fill-tertiary shrink-0"
            />

            FOR WORLD EXPLORERS.
          </span>

          <span className="flex items-center justify-center gap-2 font-label-mono text-[10px] sm:text-xs text-text-muted text-center">
            <span className="w-2 h-2 shrink-0 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.7)] animate-pulse" />

            RESTCOUNTRIES SCHEMA VERIFIED
          </span>

        </div>
      </div>
    </footer>
  );
}

export default Footer;