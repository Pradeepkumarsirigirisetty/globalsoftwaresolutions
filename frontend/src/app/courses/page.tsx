'use client';
import { useState, useEffect } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import CourseCard from '@/components/ui/CourseCard';
import api from '@/lib/api';
import type { Course } from '@/lib/types';
import { Search, ChevronDown, BookOpen, X } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Computer Fundamentals',
  'Programming',
  'Office Productivity',
  'Design',
  'Database',
  'Hardware',
];

const CATEGORY_ICONS: Record<string, string> = {
  'All': '📚',
  'Computer Fundamentals': '🖥️',
  'Programming': '💻',
  'Office Productivity': '📊',
  'Design': '🎨',
  'Database': '🗄️',
  'Hardware': '🔧',
};

const FALLBACK_COURSES: Course[] = [
  { id: 1, name: 'Computer Basics', slug: 'computer-basics', category: 'Computer Fundamentals', description: 'Learn the foundational concepts of computers, operating systems, and basic digital literacy.', duration: '1 Month', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 2, name: 'DCA', slug: 'dca', category: 'Computer Fundamentals', description: 'Diploma in Computer Applications covering MS Office, Internet, and basic programming.', duration: '6 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 3, name: 'PGDCA', slug: 'pgdca', category: 'Computer Fundamentals', description: 'Post Graduate Diploma in Computer Applications for advanced computer skills.', duration: '1 Year', level: 'Intermediate', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 4, name: 'DTP', slug: 'dtp', category: 'Computer Fundamentals', description: 'Desktop Publishing course covering CorelDraw and publishing tools.', duration: '3 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 5, name: 'Typing', slug: 'typing', category: 'Computer Fundamentals', description: 'Telugu and English typing for government job aspirants.', duration: '2 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 6, name: 'C Language', slug: 'c-language', category: 'Programming', description: 'Foundation programming course in C language covering data structures and algorithms.', duration: '2 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 7, name: 'C++', slug: 'c-plus-plus', category: 'Programming', description: 'Object-oriented programming with C++ including classes and polymorphism.', duration: '2 Months', level: 'Intermediate', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 8, name: 'Java', slug: 'java', category: 'Programming', description: 'Java programming from basics to advanced including Core Java and JDBC.', duration: '3 Months', level: 'Intermediate', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 9, name: 'VB', slug: 'vb', category: 'Programming', description: 'Visual Basic programming for Windows application development.', duration: '2 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 10, name: 'MS Office', slug: 'ms-office', category: 'Office Productivity', description: 'Complete Microsoft Office suite training including Word, Excel, PowerPoint and Access.', duration: '2 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 11, name: 'Tally', slug: 'tally', category: 'Office Productivity', description: 'Tally ERP 9 and TallyPrime for accounting, GST, and financial management.', duration: '2 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 12, name: 'Photoshop', slug: 'photoshop', category: 'Design', description: 'Adobe Photoshop for photo editing, digital art, and graphic design.', duration: '2 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 13, name: 'AutoCAD', slug: 'autocad', category: 'Design', description: '2D and 3D CAD design for engineering and architecture.', duration: '3 Months', level: 'Intermediate', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 14, name: 'Oracle', slug: 'oracle', category: 'Database', description: 'Oracle database management including SQL, PL/SQL, and database administration.', duration: '3 Months', level: 'Intermediate', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
  { id: 15, name: 'Hardware & Networking', slug: 'hardware-networking', category: 'Hardware', description: 'Computer hardware assembly, troubleshooting, and network setup.', duration: '3 Months', level: 'Beginner', syllabus: [], careerPaths: [], isActive: true, createdAt: '' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(FALLBACK_COURSES);
  const [filtered, setFiltered] = useState<Course[]>(FALLBACK_COURSES);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    api
      .get('/courses?active=true')
      .then((res) => {
        if (res.data.length > 0) {
          setCourses(res.data);
          setFiltered(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let result = courses;
    if (activeCategory !== 'All') result = result.filter((c) => c.category === activeCategory);
    if (search)
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(result);
  }, [activeCategory, search, courses]);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="hero-gradient pt-52 pb-28 md:pt-56 md:pb-32">
        <div className="container-custom relative z-10 text-center">
          <span className="badge bg-white/15 text-white border border-white/25 mb-5 inline-flex gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> All Courses
          </span>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-5"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', letterSpacing: '-0.02em' }}
          >
            Our Courses
          </h1>
          <p className="text-blue-100 text-center text-lg md:text-xl leading-relaxed mx-auto max-w-xl">
            {filtered.length}+ professional courses designed for your career growth.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">

          {/* ── Search & Filter Bar ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              {!search && (
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              )}
              <input
                type="text"
                placeholder="Search courses by name or topic…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`form-input py-3.5 text-sm transition-all ${search ? 'pl-4 pr-10' : 'pl-14 pr-4'}`}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-full sm:w-64 flex items-center justify-between gap-3 bg-white border-2 border-slate-200 hover:border-blue-400 rounded-xl px-5 py-3.5 text-sm font-semibold text-slate-700 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{CATEGORY_ICONS[activeCategory]}</span>
                  <span>{activeCategory === 'All' ? 'All Categories' : activeCategory}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Panel */}
              {dropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-64 bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden py-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-all text-left ${
                          activeCategory === cat
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className="text-base w-6 text-center">{CATEGORY_ICONS[cat]}</span>
                        <span>{cat === 'All' ? 'All Categories' : cat}</span>
                        {activeCategory === cat && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results count */}
          <p className="text-slate-500 text-sm font-medium mb-8">
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && (
              <span className="ml-2 text-blue-600">in &quot;{activeCategory}&quot;</span>
            )}
          </p>

          {/* Course Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((course) => (
                <div key={course.id} className="h-full">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-slate-700 font-semibold text-lg mb-2">No courses found</p>
              <p className="text-slate-500 text-sm">
                Try a different search term or{' '}
                <button
                  onClick={() => { setSearch(''); setActiveCategory('All'); }}
                  className="text-blue-600 font-semibold underline underline-offset-2 hover:text-blue-800"
                >
                  clear all filters
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
