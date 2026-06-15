'use client';
import { useState, useEffect } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import api from '@/lib/api';
import type { Testimonial } from '@/lib/types';
import { Star } from 'lucide-react';

const FALLBACK: Testimonial[] = [
  { id: 1, name: 'Ravi Kumar', course: 'DCA', message: 'Global Software Solutions gave me the skills to get my first job. The trainers are very patient and teach very practically. Highly recommended!', rating: 5, isActive: true, createdAt: '' },
  { id: 2, name: 'Lakshmi Devi', course: 'Tally', message: 'I completed Tally course here and now working as an accountant. Affordable fees and excellent teaching quality!', rating: 5, isActive: true, createdAt: '' },
  { id: 3, name: 'Suresh Reddy', course: 'Hardware & Networking', message: 'Best institute in Chodavaram area. Got placed as Hardware Engineer after completing the course. Thank you GSS!', rating: 5, isActive: true, createdAt: '' },
  { id: 4, name: 'Priya Naidu', course: 'Photoshop', message: 'Creative and practical training. Learned Photoshop from scratch and now doing freelance design work.', rating: 4, isActive: true, createdAt: '' },
  { id: 5, name: 'Venkat Rao', course: 'Java', message: 'Very good programming training. The faculty explains each concept clearly with real examples. Loved it!', rating: 5, isActive: true, createdAt: '' },
  { id: 6, name: 'Sita Devi', course: 'MS Office', message: 'Perfect for beginners. I learned MS Office completely and got a job at a local office. Very thankful!', rating: 5, isActive: true, createdAt: '' },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/testimonials')
      .then((res) => {
        if (res.data.length > 0) setTestimonials(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <PublicLayout>
      <section className="hero-gradient pt-44 pb-20 md:pt-48 md:pb-24">
        <div className="container-custom text-center relative z-10">
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            Student Testimonials
          </h1>
          <p className="text-blue-100 text-center text-lg">Real stories from our graduates.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="flex items-center gap-1 mb-3 stars">
                  {Array(t.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  {Array(5 - t.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-slate-300" />
                    ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-5 italic">"{t.message}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-blue-600 text-sm">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
