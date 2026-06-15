import type { Metadata } from 'next';
import PublicLayout from '@/components/layout/PublicLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import Link from 'next/link';
import { Target, Eye, CheckCircle, Award, Users, BookOpen, Cpu, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Global Software Solutions',
  description:
    'Learn about Global Software Solutions - premier computer training institute in Chodavaram, Andhra Pradesh.',
};

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="hero-gradient pt-44 pb-20 md:pt-48 md:pb-24">
        <div className="container-custom relative z-10 text-center">
          <span className="badge bg-white/15 text-white border border-white/25 mb-5">About Us</span>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-5"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', letterSpacing: '-0.02em' }}
          >
            Our Story
          </h1>
          <p className="text-blue-100 text-center text-lg md:text-xl leading-relaxed mx-auto max-w-xl">
            Building careers through quality computer education since over a decade.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge badge-blue mb-4">Our Foundation</span>
              <h2 className="section-title mb-6">
                A Decade of <span className="gradient-text">Excellence</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Global Software Solutions was established with a single mission — to provide world-class computer education at affordable prices in the Chodavaram region of Andhra Pradesh.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Located in Venkannapalem, our institute serves students from Chodavaram and surrounding villages. We believe that quality education should be accessible to everyone, regardless of their financial background.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Over the years, we have expanded our course offerings, improved our infrastructure, and built a team of experienced trainers who are passionate about student success.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  ['500+', 'Students Trained'],
                  ['15+', 'Courses Offered'],
                  ['10+', 'Years Experience'],
                  ['95%', 'Job Placement'],
                ].map(([val, label]) => (
                  <div key={label} className="stat-card p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-3xl font-black text-blue-700 mb-1">{val}</p>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
              
              <h3 className="text-3xl font-black mb-8 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>Training Methodology</h3>
              {[
                {
                  title: 'Theory + Practice',
                  desc: 'Every concept taught with real hands-on practice sessions on modern computers.',
                },
                {
                  title: 'Project-Based Learning',
                  desc: 'Students complete real projects that build their portfolio and confidence.',
                },
                {
                  title: 'Small Batch Sizes',
                  desc: 'Limited students per batch ensures personal attention from trainers.',
                },
                {
                  title: 'Revision & Doubt Sessions',
                  desc: 'Regular revision classes and doubt-clearing sessions for all students.',
                },
                {
                  title: 'Mock Tests & Assessments',
                  desc: 'Periodic tests to track progress and prepare for certification exams.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 mb-6 last:mb-0 relative z-10">
                  <div className="bg-white/20 p-1.5 rounded-lg h-fit mt-1">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">{item.title}</p>
                    <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionHeader badge="Our Purpose" title="Mission & Vision" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To provide affordable, high-quality computer education and technical training to students in rural and semi-urban Andhra Pradesh, empowering them with skills that lead to employment and entrepreneurship opportunities.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the most trusted computer training institute in Andhra Pradesh, recognized for transforming students into skilled IT professionals and contributing to the digital growth of our region and nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader badge="Achievements" title="Our Milestones" subtitle="Key achievements that mark our journey of excellence." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Best Training Institute', desc: 'Recognized as the best computer training institute in Chodavaram mandal.' },
              { icon: Users, title: '500+ Successful Students', desc: 'Over 500 students have successfully completed courses and found employment.' },
              { icon: BookOpen, title: '15+ Course Portfolio', desc: 'Expanded from 3 courses to 15+ comprehensive technology programs.' },
              { icon: Cpu, title: 'Modern Infrastructure', desc: 'State-of-the-art computer lab with latest hardware and high-speed internet.' },
              { icon: CheckCircle, title: 'Government Recognized', desc: 'Affiliated with recognized certification bodies for valid course certificates.' },
              { icon: Award, title: '95% Placement Rate', desc: 'Industry-leading placement rate with active employer partnerships.' },
            ].map((item) => (
              <div key={item.title} className="stat-card flex flex-col items-start p-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3 leading-snug">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding hero-gradient">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Join Us?</h2>
          <p className="text-blue-100 text-center mb-8 max-w-xl mx-auto">
            Start your journey with Global Software Solutions today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/admission" className="btn-white px-10 py-4">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/courses" className="btn-ghost px-10 py-4">
              View Courses
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
