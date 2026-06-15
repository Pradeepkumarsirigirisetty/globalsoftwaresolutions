'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Save, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    instituteName: 'Global Software Solutions',
    tagline: 'Learn Skills. Build Careers.',
    address: 'Venkannapalem, Chodavaram, Andhra Pradesh',
    phone1: '8186072193',
    phone2: '7658968047',
    email: '',
    whatsapp: '918186072193',
    facebook: '',
    instagram: '',
    youtube: '',
  });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    api
      .get('/settings')
      .then((r) => { if (r.data) setSettings((prev) => ({ ...prev, ...r.data })); })
      .catch(() => {})
      .finally(() => setLoadingSettings(false));
  }, []);

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      await api.put('/settings', settings);
      toast.success('Settings saved!');
    } catch { toast.error('Failed to save'); } finally { setSavingSettings(false); }
  };

  const changePw = async () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error("Passwords don't match"); return; }
    if (pwForm.newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setSavingPw(true);
    try {
      await api.put('/auth/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      toast.success('Password changed!');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch { toast.error('Incorrect current password'); } finally { setSavingPw(false); }
  };

  const fields = [
    { key: 'instituteName', label: 'Institute Name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'address', label: 'Address' },
    { key: 'phone1', label: 'Phone 1' },
    { key: 'phone2', label: 'Phone 2' },
    { key: 'email', label: 'Email' },
    { key: 'whatsapp', label: 'WhatsApp (with country code)' },
    { key: 'facebook', label: 'Facebook URL' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'youtube', label: 'YouTube URL' },
  ];

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 text-sm">Manage site-wide settings and contact information.</p>
      </div>

      {/* Site Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h3 className="text-base font-bold text-slate-900 mb-5">Site Information</h3>
        <div className="space-y-6">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="form-label">{f.label}</label>
              <input
                value={(settings as any)[f.key] || ''}
                onChange={(e) => setSettings((p) => ({ ...p, [f.key]: e.target.value }))}
                className="form-input"
                disabled={loadingSettings}
              />
            </div>
          ))}
        </div>
        <button onClick={saveSettings} disabled={savingSettings || loadingSettings} className="btn-primary mt-6 px-8 py-2.5">
          <Save className="w-4 h-4" /> {savingSettings ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" /> Change Password
        </h3>
        <div className="space-y-6">
          {[
            { key: 'currentPassword', label: 'Current Password' },
            { key: 'newPassword', label: 'New Password' },
            { key: 'confirmPassword', label: 'Confirm New Password' },
          ].map((f) => (
            <div key={f.key}>
              <label className="form-label">{f.label}</label>
              <input
                type="password"
                value={(pwForm as any)[f.key]}
                onChange={(e) => setPwForm((p) => ({ ...p, [f.key]: e.target.value }))}
                className="form-input"
                placeholder="••••••••"
              />
            </div>
          ))}
        </div>
        <button onClick={changePw} disabled={savingPw} className="btn-primary mt-6 px-8 py-2.5">
          <Lock className="w-4 h-4" /> {savingPw ? 'Changing...' : 'Change Password'}
        </button>
      </div>
    </div>
  );
}
