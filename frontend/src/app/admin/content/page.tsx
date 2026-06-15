'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get('/content')
      .then((r) => { setContent(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put('/content', content);
      toast.success('Content updated!');
    } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  const sections = [
    { key: 'hero_title', label: 'Hero Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
    { key: 'about_title', label: 'About Section Title', type: 'text' },
    { key: 'about_content', label: 'About Content', type: 'textarea' },
    { key: 'contact_address', label: 'Contact Address', type: 'text' },
    { key: 'contact_phone1', label: 'Contact Phone 1', type: 'text' },
    { key: 'contact_phone2', label: 'Contact Phone 2', type: 'text' },
    { key: 'footer_text', label: 'Footer Text', type: 'textarea' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Website Content</h2>
        <p className="text-slate-500 text-sm">Manage the editable text sections of the website.</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
        {sections.map((s) => (
          <div key={s.key}>
            <label className="form-label">{s.label}</label>
            {s.type === 'textarea' ? (
              <textarea
                value={content[s.key] || ''}
                onChange={(e) => setContent((p) => ({ ...p, [s.key]: e.target.value }))}
                className="form-input"
                rows={3}
              />
            ) : (
              <input
                value={content[s.key] || ''}
                onChange={(e) => setContent((p) => ({ ...p, [s.key]: e.target.value }))}
                className="form-input"
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={save} disabled={saving} className="btn-primary px-8 py-3">
        <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Content'}
      </button>
    </div>
  );
}
