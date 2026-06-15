'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Users, BookOpen, Images, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0, courses: 0, gallery: 0, testimonials: 0,
    pending: 0, approved: 0, rejected: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [admRes, courseRes, gallRes, testRes] = await Promise.all([
          api.get('/admissions?limit=5'),
          api.get('/courses'),
          api.get('/gallery'),
          api.get('/testimonials?all=true'),
        ]);
        const admissions = admRes.data.admissions || [];
        setStats({
          students: admRes.data.total || 0,
          courses: courseRes.data.length,
          gallery: gallRes.data.length,
          testimonials: testRes.data.length,
          pending: admissions.filter((a: any) => a.status === 'pending').length,
          approved: admissions.filter((a: any) => a.status === 'approved').length,
          rejected: admissions.filter((a: any) => a.status === 'rejected').length,
        });
        setRecentAdmissions(admissions);
      } catch {}
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Applications', value: stats.students, icon: Users, color: 'blue', href: '/admin/admissions' },
    { label: 'Active Courses', value: stats.courses, icon: BookOpen, color: 'green', href: '/admin/courses' },
    { label: 'Gallery Images', value: stats.gallery, icon: Images, color: 'purple', href: '/admin/gallery' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'amber', href: '/admin/testimonials' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    amber: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((s) => (
          <Link key={s.label} href={s.href} className="stat-card group cursor-pointer">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorMap[s.color]}`}>
                <s.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900">{loading ? '--' : s.value}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">{s.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Admission Status */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { label: 'Pending', value: stats.pending, icon: Clock, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
          { label: 'Approved', value: stats.approved, icon: CheckCircle, bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
          { label: 'Rejected', value: stats.rejected, icon: XCircle, bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
        ].map((item) => (
          <div key={item.label} className={`${item.bg} border ${item.border} rounded-2xl p-7 flex items-center gap-5`}>
            <item.icon className={`w-10 h-10 ${item.text}`} />
            <div>
              <p className={`text-3xl font-black ${item.text}`}>{loading ? '--' : item.value}</p>
              <p className="text-slate-600 text-sm font-medium mt-1">{item.label} Applications</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Admissions */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-lg">Recent Applications</h2>
          <Link href="/admin/admissions" className="text-blue-600 text-sm font-semibold hover:text-blue-800">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Student', 'Course', 'Status', 'Date'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-8 py-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      <td colSpan={4} className="px-6 py-4">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
              ) : recentAdmissions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-400">
                    No applications yet
                  </td>
                </tr>
              ) : (
                recentAdmissions.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-50">
                    <td className="px-8 py-5">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{adm.fullName}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{adm.mobile}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-slate-700 text-sm">{adm.course?.name || 'N/A'}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`badge ${
                          adm.status === 'approved'
                            ? 'badge-green'
                            : adm.status === 'rejected'
                            ? 'badge-red'
                            : 'badge-amber'
                        }`}
                      >
                        {adm.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-slate-500 text-sm">
                        {new Date(adm.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
