import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';
import { Monitor, Printer, CreditCard, Wifi, FileText, Briefcase, ShoppingCart, Wrench, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | Global Software Solutions',
  description:
    'Explore services offered by Global Software Solutions - Internet, Xerox, PAN Card, Aadhaar, Computer Sales and more.',
};

const services = [
  { icon: Wifi, title: 'Internet Services', desc: 'High-speed internet access available. Browse, download, and use online services at affordable rates.', color: 'blue' },
  { icon: Printer, title: 'Xerox & Printouts', desc: 'Black & white and color xerox copies and print services at competitive prices.', color: 'slate' },
  { icon: CreditCard, title: 'PAN Card Assistance', desc: 'New PAN card application, corrections, and reprints. We guide you through the entire process.', color: 'amber' },
  { icon: FileText, title: 'Aadhaar Services', desc: 'Aadhaar enrollment, updates, address changes, and mobile linking assistance.', color: 'green' },
  { icon: Briefcase, title: 'Job Applications', desc: 'Help with online job applications, government job forms, and government portal registrations.', color: 'purple' },
  { icon: ShoppingCart, title: 'Computer Sales', desc: 'New and refurbished computers, laptops, and accessories at best prices with warranty.', color: 'teal' },
  { icon: Wrench, title: 'Computer Services', desc: 'Hardware repair, software installation, virus removal, OS formatting, and maintenance services.', color: 'red' },
  { icon: Monitor, title: 'Computer Training', desc: 'Professional computer training courses for students and working professionals.', color: 'indigo' },
];

const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-100', text: 'text-blue-600' },
  slate: { bg: 'bg-slate-50', icon: 'bg-slate-100', text: 'text-slate-600' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-100', text: 'text-amber-600' },
  green: { bg: 'bg-green-50', icon: 'bg-green-100', text: 'text-green-600' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-100', text: 'text-purple-600' },
  teal: { bg: 'bg-teal-50', icon: 'bg-teal-100', text: 'text-teal-600' },
  red: { bg: 'bg-red-50', icon: 'bg-red-100', text: 'text-red-600' },
  indigo: { bg: 'bg-indigo-50', icon: 'bg-indigo-100', text: 'text-indigo-600' },
};

export default function ServicesPage() {
  return (
    <PublicLayout>
      <section className="hero-gradient pt-44 pb-20 md:pt-48 md:pb-24">
        <div className="container-custom relative z-10 flex flex-col items-center text-center">
          <span className="badge bg-white/15 text-white border border-white/25 mb-5">Our Services</span>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-5"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', letterSpacing: '-0.02em' }}
          >
            Our Services
          </h1>
          <p className="text-blue-100 text-center text-lg md:text-xl leading-relaxed mx-auto max-w-xl">
            Beyond computer training, we offer a complete range of digital and computer services to the community.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="What We Offer"
            title="Complete Digital Services"
            subtitle="One-stop solution for all your computer and digital service needs in Chodavaram."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const colors = colorMap[service.color];
              return (
                <div key={service.title} className={`${colors.bg} rounded-2xl p-6 card-hover`}>
                  <div
                    className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <service.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-center text-white">
            <h2 className="text-3xl font-black mb-3">Need Our Services?</h2>
            <p className="text-blue-100 text-center mb-8 max-w-xl mx-auto">
              Visit us at Venkannapalem, Chodavaram or call us now.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="btn-white">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:8186072193"
                className="text-white border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Call: 8186072193
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
