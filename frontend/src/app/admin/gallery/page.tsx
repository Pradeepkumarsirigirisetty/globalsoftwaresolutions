'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { Gallery } from '@/lib/types';
import { Trash2, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['classroom', 'training', 'certificates', 'events', 'general'];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', imageUrl: '', category: 'general' });
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const load = async () => {
    try { const r = await api.get('/gallery'); setImages(r.data); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.imageUrl) { toast.error('Image URL required'); return; }
    setSaving(true);
    try {
      await api.post('/gallery', form);
      toast.success('Image added');
      setShowAdd(false);
      setForm({ title: '', imageUrl: '', category: 'general' });
      load();
    } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  const del = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    try { await api.delete(`/gallery/${id}`); toast.success('Deleted'); load(); } catch { toast.error('Failed'); }
  };

  const filtered = activeCategory === 'all' ? images : images.filter((i) => i.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gallery</h2>
          <p className="text-slate-500 text-sm">{images.length} images</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary py-2.5 px-5">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
              activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(8).fill(0).map((_, i) => <div key={i} className="aspect-square bg-slate-100 rounded-2xl animate-pulse" />)
        ) : (
          filtered.map((img) => (
            <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200">
              <img src={img.imageUrl} alt={img.title || ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <button
                  onClick={() => del(img.id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-xl transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-3">
                <p className="text-white text-xs font-medium capitalize">{img.category}</p>
                {img.title && <p className="text-white/80 text-xs truncate">{img.title}</p>}
              </div>
            </div>
          ))
        )}
        {!loading && filtered.length === 0 && (
          <div className="col-span-4 text-center py-12 text-slate-400">No images in this category</div>
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-bold text-lg">Add Gallery Image</h3>
              <button onClick={() => setShowAdd(false)}><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="form-label">Image URL *</label>
                <input value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} className="form-input" placeholder="https://..." />
              </div>
              <div>
                <label className="form-label">Title</label>
                <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="form-input" placeholder="Optional title" />
              </div>
              <div>
                <label className="form-label">Category</label>
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="form-input">
                  {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={add} disabled={saving} className="btn-primary flex-1 justify-center">{saving ? 'Adding...' : 'Add Image'}</button>
                <button onClick={() => setShowAdd(false)} className="btn-secondary px-6">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
