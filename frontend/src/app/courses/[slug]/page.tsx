'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PublicLayout from '@/components/layout/PublicLayout';
import api from '@/lib/api';
import type { Course } from '@/lib/types';
import { Clock, Signal, ArrowRight, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/courses/${slug}`)
      .then((res) => setCourse(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </PublicLayout>
    );
  }

  if (!course) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">📚</p>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Course Not Found</h2>
            <p className="text-slate-500 mb-6">The course you're looking for doesn't exist.</p>
            <Link href="/courses" className="btn-primary">
              Back to Courses
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="hero-gradient pt-44 pb-16 md:pt-48 md:pb-20">
        <div className="container-custom relative z-10">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="badge bg-white/20 text-white border border-white/20">{course.category}</span>
            <span className="badge bg-white/20 text-white border border-white/20">{course.level}</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            {course.name}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">{course.description}</p>
          <div className="flex flex-wrap gap-6 mt-6 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" /> {course.duration}
            </span>
            <span className="flex items-center gap-2">
              <Signal className="w-5 h-5" /> {course.level}
            </span>
            {course.eligibility && (
              <span className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" /> {course.eligibility}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Syllabus */}
              {course.syllabus && (course.syllabus as string[]).length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" /> Course Syllabus
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(course.syllabus as string[]).map((topic, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-slate-700 text-sm font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Paths */}
              {course.careerPaths && (course.careerPaths as string[]).length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-blue-600" /> Career Opportunities
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {(course.careerPaths as string[]).map((path, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100"
                      >
                        {path}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-blue-600 rounded-2xl p-6 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-5">Enroll in this Course</h3>
                <div className="space-y-3 mb-6">
                  {[
                    ['Duration', course.duration],
                    ['Level', course.level],
                    ['Eligibility', course.eligibility || 'Open to All'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-2 border-b border-blue-500">
                      <span className="text-blue-200 text-sm">{k}</span>
                      <span className="font-semibold text-sm">{v}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/admission?course=${course.id}`} className="btn-white w-full justify-center">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="mt-3 block text-center text-blue-200 hover:text-white text-sm transition-colors"
                >
                  Have questions? Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
