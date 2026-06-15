'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { Course } from '@/lib/types';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['Computer Fundamentals', 'Programming', 'Office Productivity', 'Design', 'Database', 'Hardware'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const emptyForm = { name: '', category: '', description: '', duration: '', level: 'Beginner', imageUrl: '', eligibility: '', syllabus: '', careerPaths: '' };

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { const r = await api.get('/courses'); setCourses(r.data); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
  const openEdit = (c: Course) => {
    setForm({
      name: c.name, category: c.category, description: c.description,
      duration: c.duration, level: c.level, imageUrl: c.imageUrl || '',
      eligibility: c.eligibility || '',
      syllabus: (c.syllabus as string[]).join('\n'),
      careerPaths: (c.careerPaths as string[]).join('\n'),
    });
    setEditId(c.id); setShowModal(true);
  };

  const save = async () => {
    if (!form.name || !form.category || !form.description || !form.duration) { toast.error('Fill required fields'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        syllabus: form.syllabus.split('\n').filter(Boolean),
        careerPaths: form.careerPaths.split('\n').filter(Boolean),
      };
      if (editId) { await api.put(`/courses/${editId}`, payload); toast.success('Course updated'); }
      else { await api.post('/courses', payload); toast.success('Course created'); }
      setShowModal(false); load();
    } catch { toast.error('Failed to save'); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success('Deleted');
      load();
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Failed to delete course';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Courses</h2>
          <p className="text-slate-500 text-sm mt-1">{courses.length} total courses</p>
        </div>
        <button onClick={openAdd} className="btn-primary py-3 px-6">
          <Plus className="w-5 h-5" /> Add Course
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Course Name', 'Category', 'Duration', 'Level', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-8 py-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array(5).fill(0).map((_, i) => <tr key={i}><td colSpan={6} className="px-8 py-5"><div className="h-4 bg-slate-100 rounded animate-pulse" /></td></tr>)
              ) : courses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-8 py-5"><p className="font-semibold text-slate-900 text-sm">{c.name}</p></td>
                  <td className="px-8 py-5"><span className="badge badge-blue text-xs">{c.category}</span></td>
                  <td className="px-8 py-5"><span className="text-slate-600 text-sm">{c.duration}</span></td>
                  <td className="px-8 py-5"><span className="text-slate-600 text-sm">{c.level}</span></td>
                  <td className="px-8 py-5"><span className={`badge ${c.isActive ? 'badge-green' : 'badge-red'}`}>{c.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-8 py-5">
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(c)} className="p-2.5 rounded-xl hover:bg-blue-50 text-blue-600 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(c.id)} className="p-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
              <h3 className="text-xl font-bold">{editId ? 'Edit Course' : 'Add New Course'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2.5 hover:bg-slate-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="form-label">Course Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="form-input" placeholder="e.g. Advanced Java" />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="form-input">
                    <option value="">Select</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Level</label>
                  <select value={form.level} onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))} className="form-input">
                    {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Duration *</label>
                  <input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} className="form-input" placeholder="e.g. 3 Months" />
                </div>
                <div>
                  <label className="form-label">Eligibility</label>
                  <input value={form.eligibility} onChange={(e) => setForm((p) => ({ ...p, eligibility: e.target.value }))} className="form-input" placeholder="e.g. 10th Pass" />
                </div>
                <div className="col-span-2">
                  <label className="form-label">Description *</label>
                  <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="form-input" rows={3} />
                </div>
                <div className="col-span-2">
                  <label className="form-label">Syllabus (one topic per line)</label>
                  <textarea value={form.syllabus} onChange={(e) => setForm((p) => ({ ...p, syllabus: e.target.value }))} className="form-input" rows={4} placeholder="Topic 1&#10;Topic 2&#10;Topic 3" />
                </div>
                <div className="col-span-2">
                  <label className="form-label">Career Paths (one per line)</label>
                  <textarea value={form.careerPaths} onChange={(e) => setForm((p) => ({ ...p, careerPaths: e.target.value }))} className="form-input" rows={3} placeholder="Job Role 1&#10;Job Role 2" />
                </div>
                <div className="col-span-2">
                  <label className="form-label">Image URL</label>
                  <input value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} className="form-input" placeholder="https://..." />
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center py-3.5">
                  <Check className="w-5 h-5" /> {saving ? 'Saving...' : editId ? 'Update Course' : 'Create Course'}
                </button>
                <button onClick={() => setShowModal(false)} className="btn-secondary px-8 py-3.5">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
