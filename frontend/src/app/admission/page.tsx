'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PublicLayout from '@/components/layout/PublicLayout';
import api from '@/lib/api';
import type { Course } from '@/lib/types';
import { CheckCircle, Upload, User, BookOpen, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import { BATCH_TIMES } from '@/lib/constants';

const QUALIFICATIONS = ['10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Post Graduate', 'Other'];

function AdmissionForm() {
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get('course');

  const [courses, setCourses] = useState<Course[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    dob: '',
    qualification: '',
    address: '',
    courseId: courseIdParam || '',
    preferredBatch: '',
    photoUrl: '',
  });

  useEffect(() => {
    api
      .get('/courses?active=true')
      .then((res) => setCourses(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.mobile ||
      !formData.dob ||
      !formData.qualification ||
      !formData.address ||
      !formData.courseId ||
      !formData.preferredBatch
    ) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/admissions', { ...formData, courseId: parseInt(formData.courseId) });
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch {
      toast.error('Submission failed. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 pt-40">
        <div className="bg-white rounded-3xl p-16 text-center max-w-md w-full shadow-xl mx-6">
          <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Application Submitted!</h2>
          <p className="text-slate-600 leading-relaxed mb-10">
            Thank you for applying to Global Software Solutions. Our team will contact you shortly to confirm your admission and batch details.
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <p className="text-blue-800 text-sm font-semibold">What happens next?</p>
            <ul className="text-blue-700 text-sm mt-3 space-y-2">
              <li>✓ Our team reviews your application</li>
              <li>✓ You receive a call within 24 hours</li>
              <li>✓ Batch timing confirmed with you</li>
              <li>✓ You join your first class!</li>
            </ul>
          </div>
          <a href="/" className="btn-primary w-full justify-center py-4">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 first-section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge badge-blue mb-5">Student Admission</span>
            <h1 className="section-title mb-4">Apply for Admission</h1>
            <p className="section-subtitle text-center mx-auto">
              Fill in the form below and our team will get in touch with you shortly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-10 md:p-14 shadow-sm border border-slate-100 space-y-10"
          >
            {/* Personal Details */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600" /> Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Mobile Number *</label>
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="form-input"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Date of Birth *</label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Qualification *</label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select qualification</option>
                    {QUALIFICATIONS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="form-label">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your full address"
                  className="form-input"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Course Details */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-600" /> Course Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Course Interested *</label>
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.length > 0 ? (
                      courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="1">Computer Basics</option>
                        <option value="2">DCA</option>
                        <option value="3">PGDCA</option>
                        <option value="4">Tally</option>
                        <option value="5">Java</option>
                        <option value="6">Hardware & Networking</option>
                        <option value="7">MS Office</option>
                        <option value="8">Photoshop</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="form-label">Preferred Batch *</label>
                  <select
                    name="preferredBatch"
                    value={formData.preferredBatch}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select batch timing</option>
                    {BATCH_TIMES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
                <Camera className="w-6 h-6 text-blue-600" /> Photo Upload (Optional)
              </h3>
              <div className="flex items-center gap-8">
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden flex-shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-10 h-10 text-slate-400" />
                  )}
                </div>
                <div>
                  <label className="btn-secondary cursor-pointer text-sm py-3 px-6">
                    <Upload className="w-4 h-4" /> Choose Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-slate-500 text-sm mt-3">Upload a clear passport-size photo. Max 2MB.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center py-5 text-lg"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function AdmissionPage() {
  return (
    <PublicLayout>
      <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
        <AdmissionForm />
      </Suspense>
    </PublicLayout>
  );
}
