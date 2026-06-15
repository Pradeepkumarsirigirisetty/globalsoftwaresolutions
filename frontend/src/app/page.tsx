'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap, Users, Award, Clock, ChevronRight, Star,
  Monitor, Code, BookOpen, Palette, Database, Cpu,
  CheckCircle, Phone, MapPin, ArrowRight, Play
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import CourseCard from '@/components/ui/CourseCard';
import SectionHeader from '@/components/ui/SectionHeader';
import api from '@/lib/api';
import type { Course, Testimonial } from '@/lib/types';
import { INSTITUTE_ADDRESS, INSTITUTE_PHONE1, INSTITUTE_PHONE2, WHATSAPP_NUMBER } from '@/lib/constants';

const stats = [
  { value: '500+', label: 'Students Trained', icon: Users },
  { value: '15+', label: 'Courses Offered', icon: BookOpen },
  { value: '10+', label: 'Years Experience', icon: Award },
  { value: '95%', label: 'Placement Rate', icon: GraduationCap },
];

const features = [
  {
    icon: Users,
    title: 'Experienced Trainers',
    desc: 'Learn from industry professionals with years of teaching and practical experience.',
    color: 'blue',
  },
  {
    icon: Monitor,
    title: 'Practical Learning',
    desc: 'Hands-on training on modern computers with real-world projects and assignments.',
    color: 'purple',
  },
  {
    icon: Award,
    title: 'Certification Support',
    desc: 'Receive recognized certificates upon course completion to boost your resume.',
    color: 'green',
  },
  {
    icon: Clock,
    title: 'Flexible Batches',
    desc: 'Morning, afternoon and evening batches to fit your personal schedule.',
    color: 'amber',
  },
  {
    icon: GraduationCap,
    title: 'Job Guidance',
    desc: 'Career counseling and job placement assistance for all our students.',
    color: 'pink',
  },
  {
    icon: CheckCircle,
    title: 'Affordable Fees',
    desc: 'Quality education at the most competitive prices. Installment options available.',
    color: 'teal',
  },
];

const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'bg-blue-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'bg-purple-100' },
  green: { bg: 'bg-green-50', text: 'text-green-600', icon: 'bg-green-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'bg-amber-100' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', icon: 'bg-pink-100' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', icon: 'bg-teal-100' },
};

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, tRes] = await Promise.all([
          api.get('/courses?active=true'),
          api.get('/testimonials'),
        ]);
        setCourses(cRes.data.slice(0, 6));
        setTestimonials(tRes.data.slice(0, 4));
      } catch {
        // Use fallback data if API not connected
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PublicLayout>
      {/* ─── HERO ─── */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        <div className="container-custom relative z-10 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm font-semibold px-4 py-2 rounded-full border border-white/20 mb-6 backdrop-blur-sm">
                  <GraduationCap className="w-4 h-4" />
                  Premier Computer Training Institute
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Learn Skills.<br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 to-yellow-200">
                    Build Careers.
                  </span>
                </h1>
                <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                  Global Software Solutions — your gateway to computer education in Chodavaram. Professional training with practical hands-on experience.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/admission" className="btn-white px-10 py-4 text-base">
                    Apply Now <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/courses" className="btn-ghost px-10 py-4 text-base">
                    <Play className="w-5 h-5" />
                    View Courses
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Floating cards */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-6 items-end relative">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="glass rounded-2xl p-5 w-72 shadow-2xl border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">500+ Graduates</p>
                    <p className="text-white/70 text-xs">Successfully placed</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                className="glass rounded-2xl p-5 w-72 lg:-translate-x-12 shadow-2xl border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">4.9 / 5 Rating</p>
                    <p className="text-white/70 text-xs">Student satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <p className="text-xs font-medium">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1.5 h-2.5 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="stat-card flex flex-col items-center text-center py-8"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-4xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge badge-blue mb-4">About Us</span>
              <h2 className="section-title mb-5">
                Empowering Students with<br />
                <span className="gradient-text">Digital Skills</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Global Software Solutions is the leading computer training institute in Venkannapalem, Chodavaram. With over 10 years of experience, we have transformed hundreds of students into skilled IT professionals.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                We offer a wide range of courses from basic computer literacy to advanced programming, all delivered by experienced trainers with practical, hands-on methodology.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Computer Training', 'Computer Sales', 'Internet Services', 'Xerox & Printing'].map(tag => (
                  <span key={tag} className="bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/about" className="btn-primary">
                Learn More About Us <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: '15+', label: 'Courses', icon: '📚', color: 'from-blue-500 to-blue-700' },
                { num: '10+', label: 'Years Experience', icon: '🏆', color: 'from-amber-400 to-amber-600' },
                { num: '500+', label: 'Students', icon: '👨‍🎓', color: 'from-green-500 to-green-700' },
                { num: '100%', label: 'Practical Training', icon: '💻', color: 'from-purple-500 to-purple-700' },
              ].map((item) => (
                <div key={item.label} className={`bg-linear-to-br ${item.color} rounded-2xl p-6 text-white text-center`}>
                  <p className="text-3xl mb-1">{item.icon}</p>
                  <p className="text-3xl font-black">{item.num}</p>
                  <p className="text-white/80 text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── COURSES ─── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Our Courses"
            title="Popular Courses"
            subtitle="Industry-relevant courses designed to give you practical skills and boost your career prospects."
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          ) : (
            /* Fallback static courses when API not connected */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'DCA', category: 'Computer Fundamentals', duration: '6 Months', level: 'Beginner', emoji: '🖥️', desc: 'Diploma in Computer Applications covering MS Office, Internet, and basic programming.', slug: 'dca' },
                { name: 'PGDCA', category: 'Computer Fundamentals', duration: '1 Year', level: 'Intermediate', emoji: '📱', desc: 'Post Graduate Diploma covering advanced computer applications and programming.', slug: 'pgdca' },
                { name: 'Tally', category: 'Office Productivity', duration: '2 Months', level: 'Beginner', emoji: '📊', desc: 'TallyPrime for accounting, GST, and financial management.', slug: 'tally' },
                { name: 'Java', category: 'Programming', duration: '3 Months', level: 'Intermediate', emoji: '💻', desc: 'Java programming from basics to advanced including Core Java and JDBC.', slug: 'java' },
                { name: 'Hardware & Networking', category: 'Hardware', duration: '3 Months', level: 'Beginner', emoji: '🔧', desc: 'Computer hardware assembly, troubleshooting, and network configuration.', slug: 'hardware-networking' },
                { name: 'Photoshop', category: 'Design', duration: '2 Months', level: 'Beginner', emoji: '🎨', desc: 'Adobe Photoshop for photo editing, digital art, and graphic design.', slug: 'photoshop' },
              ].map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden card-hover group flex flex-col h-full"
                >
                  {/* Card Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0 relative">
                    <span className="text-7xl">{c.emoji}</span>
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-blue">{c.category}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`badge ${c.level === 'Beginner' ? 'badge-green' : c.level === 'Intermediate' ? 'badge-amber' : 'badge-red'}`}>{c.level}</span>
                    </div>
                  </div>
                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-7">
                    <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">{c.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">{c.desc}</p>
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-sm text-slate-400 font-medium mt-auto mb-6 pt-4 border-t border-slate-100">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>{c.duration}</span>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link href="/admission" className="btn-primary text-sm py-3 flex-1">
                        Apply Now
                      </Link>
                      <Link href={`/courses/${c.slug}`} className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-700 text-sm font-semibold transition-all">
                        Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/courses" className="btn-secondary text-base px-8 py-4">
              View All Courses <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <SectionHeader
            badge="Why Choose Us"
            title="The Global Software Advantage"
            subtitle="We go beyond just teaching — we prepare you for a successful career in technology."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-7 hover:bg-white/15 transition-all group"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-white/30 transition-colors">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{feature.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionHeader
            badge="Student Reviews"
            title="What Our Students Say"
            subtitle="Real stories from our graduates who have transformed their careers with our training."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(testimonials.length > 0 ? testimonials : [
              { id: 1, name: 'Ravi Kumar', course: 'DCA', message: 'Global Software Solutions gave me the skills to get my first job. Excellent practical training!', rating: 5 },
              { id: 2, name: 'Lakshmi Devi', course: 'Tally', message: 'Completed Tally course here and now working as an accountant. Affordable fees and excellent teaching!', rating: 5 },
              { id: 3, name: 'Suresh Reddy', course: 'Hardware', message: 'Best institute in Chodavaram area. Got placed as Hardware Engineer after completing the course.', rating: 5 },
              { id: 4, name: 'Priya Naidu', course: 'Photoshop', message: 'Creative and practical training. Learned Photoshop from scratch and now freelancing.', rating: 4 },
            ] as any[]).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="testimonial-card"
              >
                <div className="flex items-center gap-1 mb-3 stars">
                  {Array(t.rating).fill(0).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{t.message}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-blue-600 text-xs">{t.course}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials" className="btn-secondary px-10 py-4">View All Testimonials</Link>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ready to Start Your Journey?
              </h2>
              <p className="text-blue-100 text-center text-lg mb-8 max-w-xl mx-auto">
                Join hundreds of successful students. Apply today and take the first step towards a rewarding career in technology.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/admission" className="btn-white px-10 py-4 text-base">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </Link>
                <a href={`tel:${INSTITUTE_PHONE1}`} className="btn-ghost px-10 py-4 text-base">
                  <Phone className="w-5 h-5" /> Call: {INSTITUTE_PHONE1}
                </a>
              </div>

              {/* Address */}
              <p className="text-blue-200 text-sm mt-8 flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> {INSTITUTE_ADDRESS}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
