'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, GraduationCap } from 'lucide-react';
import { NAV_LINKS, INSTITUTE_PHONE1 } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="whitespace-nowrap">
            <p
              className={`font-bold text-lg leading-tight transition-colors`}
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', color: scrolled ? '#1e3a8a' : 'white' }}
            >
              Global Software
            </p>
            <p className={`text-xs font-medium transition-colors ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>
              Solutions
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                pathname === link.href
                  ? 'bg-blue-600 text-white'
                  : scrolled
                  ? 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${INSTITUTE_PHONE1}`}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              scrolled ? 'text-blue-700' : 'text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            {INSTITUTE_PHONE1}
          </a>
          <Link href="/admission" className="btn-primary text-sm py-2 px-5">
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="container-custom py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${INSTITUTE_PHONE1}`}
                className="flex items-center gap-2 px-4 py-3 text-blue-700 font-semibold text-sm"
              >
                <Phone className="w-4 h-4" /> {INSTITUTE_PHONE1}
              </a>
              <Link href="/admission" className="btn-primary text-center justify-center">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
