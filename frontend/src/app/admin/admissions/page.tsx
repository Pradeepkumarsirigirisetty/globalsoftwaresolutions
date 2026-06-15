'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { Admission } from '@/lib/types';
import { CheckCircle, XCircle, Eye, Search, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Admission | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (statusFilter) params.append('status', statusFilter);
      const r = await api.get(`/admissions?${params}`);
      setAdmissions(r.data.admissions || []);
      setTotal(r.data.total || 0);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [statusFilter]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/admissions/${id}/status`, { status });
      toast.success(`Application ${status}`);
      load();
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status: status as any } : null);
    } catch { toast.error('Failed to update'); }
  };

  const deleteAdmission = async (id: number) => {
    try {
      await api.delete(`/admissions/${id}`);
      toast.success('Application deleted successfully');
      load();
    } catch {
      toast.error('Failed to delete application');
    }
  };

  const filtered = admissions.filter(
    (a) => !search || a.fullName.toLowerCase().includes(search.toLowerCase()) || a.mobile.includes(search)
  );

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Student Applications</h2>
        <p className="text-slate-500 text-sm mt-1">{total} total applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or mobile..."
            className="form-input pl-12 py-3"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-input py-3 w-auto"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Student', 'Mobile', 'Course', 'Batch', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}><td colSpan={7} className="px-6 py-5"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td></tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-slate-400">No applications found</td></tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4"><p className="font-semibold text-slate-900 text-sm">{a.fullName}</p></td>
                    <td className="px-6 py-4"><a href={`tel:${a.mobile}`} className="text-blue-600 text-sm">{a.mobile}</a></td>
                    <td className="px-6 py-4"><span className="text-slate-700 text-sm">{a.course?.name || `ID:${a.courseId}`}</span></td>
                    <td className="px-6 py-4"><span className="text-slate-500 text-sm">{a.preferredBatch}</span></td>
                    <td className="px-6 py-4">
                      <span className={`badge ${a.status === 'approved' ? 'badge-green' : a.status === 'rejected' ? 'badge-red' : 'badge-amber'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4"><span className="text-slate-500 text-sm">{new Date(a.createdAt).toLocaleDateString('en-IN')}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => setSelected(a)} className="p-2 rounded-xl hover:bg-blue-50 text-blue-600"><Eye className="w-4 h-4" /></button>
                        {a.status !== 'approved' && (
                          <button onClick={() => updateStatus(a.id, 'approved')} className="p-2 rounded-xl hover:bg-green-50 text-green-600"><CheckCircle className="w-4 h-4" /></button>
                        )}
                        {a.status !== 'rejected' && (
                          <button onClick={() => updateStatus(a.id, 'rejected')} className="p-2 rounded-xl hover:bg-red-50 text-red-500"><XCircle className="w-4 h-4" /></button>
                        )}
                        <button 
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete the application for ${a.fullName}?`)) {
                              deleteAdmission(a.id);
                            }
                          }} 
                          className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-lg">
            <div className="flex items-center justify-between px-8 py-6 border-b">
              <h3 className="font-bold text-xl">Application Details</h3>
              <button onClick={() => setSelected(null)} className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500">✕</button>
            </div>
            <div className="px-8 py-6 space-y-4 overflow-y-auto max-h-[70vh]">
              {selected.photoUrl && (
                <img src={selected.photoUrl} alt="Student" className="w-24 h-24 rounded-2xl object-cover mb-4" />
              )}
              {[
                ['Name', selected.fullName],
                ['Mobile', selected.mobile],
                ['Email', selected.email || 'N/A'],
                ['Date of Birth', selected.dob],
                ['Qualification', selected.qualification],
                ['Course', selected.course?.name || String(selected.courseId)],
                ['Preferred Batch', selected.preferredBatch],
                ['Address', selected.address],
                ['Status', selected.status],
                ['Applied On', new Date(selected.createdAt).toLocaleDateString('en-IN')],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-4 py-1">
                  <span className="text-slate-500 text-sm w-36 flex-shrink-0 font-medium">{k}</span>
                  <span className="text-slate-900 text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 px-8 pb-8">
              {selected.status !== 'approved' && (
                <button onClick={() => { updateStatus(selected.id, 'approved'); setSelected(null); }} className="btn-primary flex-1 justify-center py-3">Approve</button>
              )}
              {selected.status !== 'rejected' && (
                <button onClick={() => { updateStatus(selected.id, 'rejected'); setSelected(null); }} className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition-colors">Reject</button>
              )}
              <button onClick={() => setSelected(null)} className="flex-1 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
