import React, { useState } from 'react';
import { Check, Users, Megaphone, Mail, Leaf, User, Phone, MapPin } from 'lucide-react';
import { submitVolunteer } from '@/controllers/api';

interface VolunteerFormProps {
  title?: string;
  subtitle?: string;
  successTitle?: string;
  successMessage?: string;
  labels?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    submit?: string;
  };
  placeholders?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({
  title,
  subtitle,
  successTitle,
  successMessage,
  labels,
  placeholders
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
    };

    try {
        await submitVolunteer(data);
        setSubmitted(true);
    } catch (error) {
        console.error(error);
        alert('Failed to submit form. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="volunteer" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-green-600" /></div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">{successTitle || "Thanks for joining!"}</h3>
            <p className="text-lg text-slate-600 mb-8">{successMessage || "We will reach out with upcoming events and roles."}</p>
            <button onClick={() => setSubmitted(false)} className="text-teal-600 font-semibold hover:underline">Submit another response</button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="volunteer" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900">{title || "Volunteer With Us"}</h3>
            <p className="text-slate-600">{subtitle || "Support screenings, registrations, logistics, and awareness. Together we amplify impact."}</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl border p-4 flex items-center gap-3"><Users className="h-5 w-5 text-teal-600" /><span className="text-slate-700">On-ground support</span></div>
              <div className="rounded-2xl border p-4 flex items-center gap-3"><Megaphone className="h-5 w-5 text-teal-600" /><span className="text-slate-700">Awareness drives</span></div>
              <div className="rounded-2xl border p-4 flex items-center gap-3"><Mail className="h-5 w-5 text-teal-600" /><span className="text-slate-700">Coordination</span></div>
              <div className="rounded-2xl border p-4 flex items-center gap-3"><Leaf className="h-5 w-5 text-teal-600" /><span className="text-slate-700">Wellness circles</span></div>
            </div>
          </div>
          <div>
            <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-teal-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{labels?.name || "Full Name"}</label>
                  <div className="relative"><User className="absolute left-3 top-3 text-slate-400" size={18} /><input required name="name" type="text" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder={placeholders?.name || "Jane Doe"} /></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{labels?.phone || "Phone Number"}</label>
                  <div className="relative"><Phone className="absolute left-3 top-3 text-slate-400" size={18} /><input required name="phone" type="tel" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder={placeholders?.phone || "(555) 000-0000"} /></div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{labels?.email || "Email Address"}</label>
                  <div className="relative"><Mail className="absolute left-3 top-3 text-slate-400" size={18} /><input required name="email" type="email" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder={placeholders?.email || "jane@example.com"} /></div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{labels?.address || "Address"}</label>
                  <div className="relative"><MapPin className="absolute left-3 top-3 text-slate-400" size={18} /><input name="address" type="text" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder={placeholders?.address || "123 Main St, City"} /></div>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-70">{isSubmitting ? 'Submitting...' : (labels?.submit || "Submit")}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerForm;
