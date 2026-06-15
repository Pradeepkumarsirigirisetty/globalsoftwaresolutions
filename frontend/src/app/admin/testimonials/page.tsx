'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { Testimonial } from '@/lib/types';
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react';
import toast from 'react-hot-toast';

const emptyForm = { name: '', course: '', message: '', rating: 5, photoUrl: '' };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { const r = await api.get('/testimonials?all=true'); setItems(r.data); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, course: t.course, message: t.message, rating: t.rating, photoUrl: t.photoUrl || '' });
    setEditId(t.id); setShowModal(true);
  };

  const save = async () => {
    if (!form.name || !form.message) { toast.error('Fill required fields'); return; }
    setSaving(true);
    try {
      if (editId) { await api.put(`/testimonials/${editId}`, form); toast.success('Updated'); }
      else { await api.post('/testimonials', form); toast.success('Created'); }
      setShowModal(false); load();
    } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/testimonials/${id}`); toast.success('Deleted'); load(); } catch { toast.error('Failed'); }
  };

  const toggle = async (t: Testimonial) => {
    try { await api.put(`/testimonials/${t.id}`, { isActive: !t.isActive }); load(); } catch {}
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Testimonials</h2>
          <p className="text-slate-500 text-sm">{items.length} total</p>
        </div>
        <button onClick={openAdd} className="btn-primary py-2.5 px-5">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />)
        ) : (
          items.map((t) => (
            <div key={t.id} className={`bg-white rounded-2xl border p-5 ${t.isActive ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-blue-600 text-xs">{t.course}</p>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => toggle(t)}
                    className={`text-xs px-2 py-1 rounded-lg font-semibold ${t.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}
                  >
                    {t.isActive ? 'Active' : 'Hidden'}
                  </button>
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array(t.rating).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" />)}
              </div>
              <p className="text-slate-600 text-sm line-clamp-2">{t.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-bold text-lg">{editId ? 'Edit' : 'Add'} Testimonial</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Student Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Course</label>
                  <input value={form.course} onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))} className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Message *</label>
                <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className="form-input" rows={4} />
              </div>
              <div>
                <label className="form-label">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, rating: r }))}
                      className={`w-9 h-9 rounded-xl border-2 font-bold text-sm transition-all ${
                        form.rating >= r ? 'bg-amber-400 border-amber-400 text-white' : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="form-label">Photo URL</label>
                <input value={form.photoUrl} onChange={(e) => setForm((p) => ({ ...p, photoUrl: e.target.value }))} className="form-input" placeholder="https://..." />
              </div>
              <div className="flex gap-3">
                <button onClick={save} disabled={saving} className="btn-primary flex-1 justify-center">{saving ? 'Saving...' : 'Save'}</button>
                <button onClick={() => setShowModal(false)} className="btn-secondary px-6">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
