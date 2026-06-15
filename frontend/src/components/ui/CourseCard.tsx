import Link from 'next/link';
import { Clock, Signal, ArrowRight } from 'lucide-react';
import type { Course } from '@/lib/types';

const categoryColors: Record<string, string> = {
  'Computer Fundamentals': 'bg-blue-100 text-blue-700',
  Programming: 'bg-purple-100 text-purple-700',
  'Office Productivity': 'bg-green-100 text-green-700',
  Design: 'bg-pink-100 text-pink-700',
  Database: 'bg-amber-100 text-amber-700',
  Hardware: 'bg-slate-100 text-slate-700',
};

const categoryGradients: Record<string, string> = {
  'Computer Fundamentals': 'from-blue-50 via-blue-100 to-indigo-100',
  Programming: 'from-purple-50 via-purple-100 to-violet-100',
  'Office Productivity': 'from-green-50 via-green-100 to-emerald-100',
  Design: 'from-pink-50 via-pink-100 to-rose-100',
  Database: 'from-amber-50 via-amber-100 to-orange-100',
  Hardware: 'from-slate-50 via-slate-100 to-gray-100',
};

const categoryIcons: Record<string, string> = {
  'Computer Fundamentals': '🖥️',
  Programming: '💻',
  'Office Productivity': '📊',
  Design: '🎨',
  Database: '🗄️',
  Hardware: '🔧',
};

export default function CourseCard({ course }: { course: Course }) {
  const colorClass = categoryColors[course.category] || 'bg-blue-100 text-blue-700';
  const gradient = categoryGradients[course.category] || 'from-blue-50 via-blue-100 to-indigo-100';
  const icon = categoryIcons[course.category] || '📚';

  return (
    <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden card-hover group flex flex-col h-full">

      {/* ── Image / Icon Header ── */}
      <div className={`relative h-52 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden flex-shrink-0`}>
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-7xl drop-shadow-sm">{icon}</span>
        )}

        {/* Badges overlaid on the image */}
        <div className="absolute top-4 left-4">
          <span className={`badge text-xs font-bold ${colorClass}`}>{course.category}</span>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={`badge text-xs font-bold ${
              course.level === 'Beginner'
                ? 'badge-green'
                : course.level === 'Intermediate'
                ? 'badge-amber'
                : 'badge-red'
            }`}
          >
            {course.level}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-8">

        {/* Title */}
        <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">
          {course.name}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">
          {course.description}
        </p>

        {/* ── Meta row ── */}
        <div className="mt-auto flex items-center gap-5 text-sm text-slate-400 font-medium pb-5 mb-5 border-b border-slate-100">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            {course.duration}
          </span>
          <span className="flex items-center gap-2">
            <Signal className="w-4 h-4 text-blue-400" />
            {course.level}
          </span>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex gap-3">
          <Link
            href={`/admission?course=${course.id}`}
            className="btn-primary text-sm py-3 flex-1"
          >
            Apply Now
          </Link>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-700 text-sm font-semibold transition-all"
          >
            Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
