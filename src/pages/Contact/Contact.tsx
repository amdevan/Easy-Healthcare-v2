import React, { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import Button from '@/components/ui/Button';
import { submitContact } from '@/controllers/api';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactFormState, string>>;

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { message: string }>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (state: ContactFormState): FieldErrors => {
    const e: FieldErrors = {};
    if (!state.name.trim()) e.name = 'Please enter your full name.';
    if (!state.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = 'Please enter a valid email.';
    if (!state.subject.trim()) e.subject = 'Please add a subject.';
    if (!state.message.trim()) e.message = 'Please write a message.';
    if (state.phone && state.phone.length > 20) e.phone = 'Phone number seems too long.';
    return e;
  };

  const isValid = useMemo(() => Object.keys(validate(form)).length === 0, [form]);

  const handleChange = (field: keyof ContactFormState) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: ev.target.value }));
    // live-validate on change
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const currentErrors = validate(form);
    setErrors(currentErrors);
    setSubmitError(null);
    setSubmitted(null);
    if (Object.keys(currentErrors).length > 0) return;
    setSubmitting(true);
    try {
      const res = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSubmitted(res);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const { data: pageData } = usePageContent('contact');
  
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const contactBlock = pageData?.content?.find(b => b.type === 'contact_info');
  const formBlock = pageData?.content?.find(b => b.type === 'form_section');

  const title = heroBlock?.data?.title || "Contact Us";
  const desc = heroBlock?.data?.description;

  const contactPhone = contactBlock?.data?.phone || "+977 1-4510101";
  const contactEmail = contactBlock?.data?.email || "support@easyhealthcare101.com";
  const contactAddress = contactBlock?.data?.address || "Kathmandu, Nepal";
  const contactHours = contactBlock?.data?.hours || "Mon–Fri: 9:00–18:00\nSat: 10:00–16:00";
  const contactMapUrl = contactBlock?.data?.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.087931694395!2d85.3239606!3d27.7122984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a8b6b1c2a9%3A0x3b2b4c8a2b1b!2sKathmandu!5e0!3m2!1sen!2snp!4v1700000000000";

  const formLabels = formBlock?.data?.labels;
  const formPlaceholders = formBlock?.data?.placeholders;
  const formMessages = formBlock?.data?.messages;

  return (
    <section className="py-12 lg:py-20 bg-brand-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-0">
          <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-500 p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
            <p className="mt-3 text-white/90">
              {desc ? desc : (
                <>
                We’re here to help with appointments, services, and membership. Call us at <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="underline font-semibold">{contactPhone}</a> or send a message below.
                </>
              )}
            </p>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <aside className="space-y-6">
              <div className="rounded-xl border border-brand-gray-200 bg-white p-5 border-t-4 border-blue-600">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-blue-50 p-2 text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-gray-900">Support</p>
                    <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="mt-1 block text-brand-blue">{contactPhone}</a>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-brand-gray-200 bg-white p-5 border-t-4 border-emerald-600">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-emerald-50 p-2 text-emerald-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-gray-900">General Queries</p>
                    <a href={`mailto:${contactEmail}`} className="mt-1 block text-brand-blue">{contactEmail}</a>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-brand-gray-200 bg-white p-5 border-t-4 border-amber-600">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-amber-50 p-2 text-amber-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-gray-900">Working Hours</p>
                    <p className="mt-1 text-sm text-brand-gray-700 whitespace-pre-line">{contactHours}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-brand-gray-200 bg-white p-5 border-t-4 border-rose-600">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-rose-50 p-2 text-rose-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-gray-900">Location</p>
                    <p className="mt-1 text-sm text-brand-gray-700">{contactAddress}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-brand-gray-200">
                <iframe
                  title="Easy Healthcare Location"
                  aria-label="Map showing Easy Healthcare location in Kathmandu"
                  className="w-full h-72 md:h-80 lg:h-96"
                  src={contactMapUrl}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>

            <div className="lg:col-span-2 max-w-2xl mx-auto bg-white rounded-xl p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
                <div className="md:col-span-1">
                  <label htmlFor="name" className="block text-base font-medium text-brand-gray-700">{formLabels?.name || 'Full Name'}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className="mt-1 w-full rounded-lg border border-brand-gray-300 bg-brand-gray-50 px-4 py-2.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    autoComplete="name"
                    placeholder={formPlaceholders?.name || "Jane Doe"}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="email" className="block text-base font-medium text-brand-gray-700">{formLabels?.email || 'Email'}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="mt-1 w-full rounded-lg border border-brand-gray-300 bg-brand-gray-50 px-4 py-2.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    autoComplete="email"
                    placeholder={formPlaceholders?.email || "jane@example.com"}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="phone" className="block text-base font-medium text-brand-gray-700">{formLabels?.phone || 'Phone (optional)'}</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className="mt-1 w-full rounded-lg border border-brand-gray-300 bg-brand-gray-50 px-4 py-2.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    autoComplete="tel"
                    placeholder={formPlaceholders?.phone || "(555) 123-4567"}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="subject" className="block text-base font-medium text-brand-gray-700">{formLabels?.subject || 'Subject'}</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className="mt-1 w-full rounded-lg border border-brand-gray-300 bg-brand-gray-50 px-4 py-2.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    autoComplete="off"
                    placeholder={formPlaceholders?.subject || "How can we help?"}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-base font-medium text-brand-gray-700">{formLabels?.message || 'Message'}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange('message')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows={6}
                    className="mt-1 w-full rounded-lg border border-brand-gray-300 bg-brand-gray-50 px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    placeholder={formPlaceholders?.message || "Share any details you'd like us to know..."}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <div className="md:col-span-2 flex items-center gap-3">
                  <Button type="submit" variant="primary" size="lg" disabled={submitting || !isValid} aria-label="Submit contact form">
                    {submitting ? (formLabels?.submitting || 'Sending…') : (formLabels?.submit || 'Send Message')}
                  </Button>
                  {submitted && (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm text-green-700">{formMessages?.success || submitted.message}</span>
                  )}
                  {submitError && (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm text-red-700">{formMessages?.error || submitError}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
