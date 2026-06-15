'use client';
import { useState } from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import { MapPin, Phone, Clock, Send, MessageCircle } from 'lucide-react';
import { INSTITUTE_ADDRESS, INSTITUTE_PHONE1, INSTITUTE_PHONE2, WHATSAPP_NUMBER } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', mobile: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Message sent! We will contact you soon.');
    setForm({ name: '', mobile: '', message: '' });
    setSending(false);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="hero-gradient pt-44 pb-20 md:pt-52 md:pb-28">
        <div className="container-custom relative z-10 text-center">
          <span className="badge bg-white/15 text-white border border-white/25 mb-5">Contact Us</span>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-5"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', letterSpacing: '-0.02em' }}
          >
            Get In Touch
          </h1>
          <p className="text-blue-100 text-center text-lg md:text-xl leading-relaxed mx-auto max-w-xl">
            We&apos;d love to hear from you. Reach out and we&apos;ll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">

            {/* ── Left: Contact Info ── */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}>
                  Contact Information
                </h2>
                <p className="text-slate-500 text-base leading-relaxed">
                  Visit us, call us, or send a message. We&apos;re here to help you start your learning journey.
                </p>
              </div>

              {/* Info Cards */}
              <div className="flex flex-col gap-4">
                {/* Location */}
                <div className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-base mb-1">Our Location</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{INSTITUTE_ADDRESS}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-base mb-2">Phone Numbers</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`tel:${INSTITUTE_PHONE1}`}
                        className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> {INSTITUTE_PHONE1}
                      </a>
                      <a
                        href={`tel:${INSTITUTE_PHONE2}`}
                        className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> {INSTITUTE_PHONE2}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-base mb-1">Working Hours</p>
                    <p className="text-slate-500 text-sm mb-0.5">Monday – Saturday: <span className="text-slate-700 font-semibold">8:00 AM – 8:00 PM</span></p>
                    <p className="text-slate-400 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button — <a> styled as a button */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello, I want to know about courses at Global Software Solutions`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>

              {/* Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '280px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30571.37543690484!2d82.92999999999999!3d17.7199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37b05ad5b2d89b%3A0x6e02d9a32aff7ef0!2sChodavaram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Global Software Solutions Location"
                />
              </div>
            </div>

            {/* ── Right: Contact Form ── */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-100/80">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}>
                  Send a Message
                </h2>
                <p className="text-slate-500 text-sm">Fill in the form below and we&apos;ll get back to you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="form-label">Your Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Mobile Number *</label>
                  <input
                    value={form.mobile}
                    onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
                    placeholder="10-digit mobile number"
                    className="form-input"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="How can we help you?"
                    className="form-input"
                    rows={5}
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full py-4 text-base"
                  style={{ opacity: sending ? 0.7 : 1 }}
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>

              {/* Quick call option */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <p className="text-slate-500 text-sm">Prefer to call?</p>
                <a
                  href={`tel:${INSTITUTE_PHONE1}`}
                  className="inline-flex items-center gap-2 text-blue-700 font-bold text-sm hover:text-blue-900 transition-colors"
                >
                  <Phone className="w-4 h-4" /> {INSTITUTE_PHONE1}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
