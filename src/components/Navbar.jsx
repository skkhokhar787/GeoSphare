import React, { useState } from "react";
import { Search, Heart, Globe, Menu, X, Sun, Moon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `font-semibold text-body-base transition-all duration-300 px-3 py-1.5 rounded-full scale-95 active:scale-90 flex items-center gap-1.5 ${
      isActive
        ? "text-primary bg-primary/10 border border-primary/20"
        : "text-on-surface-variant hover:text-on-surface hover:bg-hover-subtle"
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-bg-deep/80 backdrop-blur-md border-b border-border-glass saturate-180 shadow-lg">
      <div className="flex justify-between items-center px-margin-safe py-3.5 max-w-container-max mx-auto">
        {/* Brand */}
        <Link
          className="flex items-center gap-2.5 font-bold text-primary text-2xl tracking-tight hover:opacity-90 transition-opacity"
          to={"/"}
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(173,198,255,0.2)]">
            <Globe size={20} />
          </div>
          <span className="font-headline-md tracking-tighter">GeoSphere</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center gap-2 px-4 h-10 w-64 lg:w-80 border border-border-glass bg-surface-glass focus-within:border-primary/50 focus-within:bg-hover-subtle transition-all duration-300 rounded-full"
        >
          <Search size={16} className="text-on-surface-variant shrink-0" />
          <input
            className="outline-none bg-transparent w-full font-body-base text-sm text-on-surface placeholder:text-text-muted"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country, capital, code..."
          />
        </form>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink className={navLinkClass} to={"/"} end>
            Home
          </NavLink>
          <NavLink className={navLinkClass} to={"/explore"}>
            Explore
          </NavLink>
          <NavLink className={navLinkClass} to={"/regions"}>
            Regions
          </NavLink>
          <NavLink className={navLinkClass} to={"/favorites"}>
            <Heart size={15} className="text-tertiary fill-tertiary/20" />
            Favorites
            {favorites.length > 0 && (
              <span className="bg-tertiary text-bg-deep text-xs font-bold px-1.5 py-0.5 rounded-full ml-1 font-label-mono">
                {favorites.length}
              </span>
            )}
          </NavLink>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border-glass bg-surface-glass text-on-surface-variant hover:text-primary transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border-glass bg-surface-glass text-on-surface-variant hover:text-primary transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/favorites"
            className="p-2 rounded-full border border-border-glass bg-surface-glass text-tertiary relative"
          >
            <Heart size={18} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-tertiary text-bg-deep text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-label-mono">
                {favorites.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border-glass bg-surface-glass text-on-surface"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-glass bg-bg-deep/95 backdrop-blur-xl px-margin-safe py-4 flex flex-col gap-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 px-4 h-10 border border-border-glass bg-surface-glass rounded-full mb-2">
            <Search size={16} className="text-on-surface-variant" />
            <input
              className="outline-none bg-transparent w-full text-sm text-on-surface placeholder:text-text-muted"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country..."
            />
          </form>
          <NavLink onClick={() => setMobileMenuOpen(false)} className={navLinkClass} to={"/"} end>
            Home
          </NavLink>
          <NavLink onClick={() => setMobileMenuOpen(false)} className={navLinkClass} to={"/explore"}>
            Explore Catalogue
          </NavLink>
          <NavLink onClick={() => setMobileMenuOpen(false)} className={navLinkClass} to={"/regions"}>
            World Regions
          </NavLink>
          <NavLink onClick={() => setMobileMenuOpen(false)} className={navLinkClass} to={"/favorites"}>
            Saved Favorites ({favorites.length})
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
