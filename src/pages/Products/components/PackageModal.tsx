import React, { useState, useEffect } from 'react';
import { HealthPackage } from '../types';
import { X, CheckCircle2, Check, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { CountryCodeSelect } from '@/components/ui/CountryCodeSelect';

interface PackageModalProps {
  selected: HealthPackage | null;
  onClose: () => void;
}

const PackageModal: React.FC<PackageModalProps> = ({ selected, onClose }) => {
  const [isForSelf, setIsForSelf] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    booking_name: '',
    booking_email: '',
    booking_phone: '',
    relation: '',
    patient_name: '',
    email: '',
    phone: '',
    address: '',
    booking_phone_code: '+977',
    phone_code: '+977',
  });

  useEffect(() => {
     if (selected) {
         document.body.style.overflow = 'hidden';
     } else {
         document.body.style.overflow = 'unset';
     }
     return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  if (!selected) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        package_name: selected.name,
        is_for_self: isForSelf,
        booking_name: isForSelf ? undefined : formData.booking_name,
        booking_email: isForSelf ? undefined : formData.booking_email,
        booking_phone: isForSelf ? undefined : `${formData.booking_phone_code}${formData.booking_phone}`,
        relation: isForSelf ? undefined : formData.relation,
        patient_name: formData.patient_name,
        email: formData.email,
        phone: `${formData.phone_code}${formData.phone}`,
        address: formData.address,
      };

      const response = await fetch('/api/package-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
         const data = await response.json();
         throw new Error(data.message || 'Failed to submit request');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center animate-in zoom-in-95">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600 mb-8">
                    Thank you for choosing <strong>{selected.name}</strong>. Our team will contact you shortly.
                </p>
                <Button variant="primary" className="w-full justify-center" onClick={onClose}>Close</Button>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
               <CheckCircle2 size={32} />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-gray-900">{selected.name}</h3>
               <p className="text-gray-500">Rs. {selected.price.toLocaleString()}</p>
            </div>
          </div>

          {!showForm ? (
            <>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Package Includes:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                        {selected.features.map((f, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                    You are about to request the <strong>{selected.name}</strong>. Please confirm your details to proceed.
                </p>
                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 justify-center" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" className="flex-1 justify-center" onClick={() => setShowForm(true)}>Proceed to Book</Button>
                </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                        {error}
                    </div>
                )}
                
                 <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between">
                    <span className="font-medium text-slate-700">Who is this for?</span>
                    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                      <button type="button" onClick={() => setIsForSelf(true)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isForSelf ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Myself</button>
                      <button type="button" onClick={() => setIsForSelf(false)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${!isForSelf ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Someone Else</button>
                    </div>
                  </div>

                  {!isForSelf && (
                    <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <h4 className="font-semibold text-slate-900">Your Details (Booking Person)</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-700">Name</label>
                                <input type="text" name="booking_name" required value={formData.booking_name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-700">Relation</label>
                                <select name="relation" required value={formData.relation} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                                    <option value="">Select Relation</option>
                                    <option value="parent">Parent</option>
                                    <option value="child">Child</option>
                                    <option value="spouse">Spouse</option>
                                    <option value="sibling">Sibling</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-700">Email</label>
                                <input type="email" name="booking_email" required value={formData.booking_email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-700">Phone</label>
                                <div className="flex gap-2">
                                    <div className="w-[100px] shrink-0"><CountryCodeSelect value={formData.booking_phone_code} onChange={(c) => setFormData(p => ({...p, booking_phone_code: c}))} /></div>
                                    <input type="tel" name="booking_phone" required value={formData.booking_phone} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                  )}

                  <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900">{isForSelf ? 'Your Details' : 'Patient Details'}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-medium text-slate-700">Full Name</label>
                                <input type="text" name="patient_name" required value={formData.patient_name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Full Name" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-medium text-slate-700">Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Street Address" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-700">Email</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="email@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-700">Phone</label>
                                <div className="flex gap-2">
                                    <div className="w-[100px] shrink-0"><CountryCodeSelect value={formData.phone_code} onChange={(c) => setFormData(p => ({...p, phone_code: c}))} /></div>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Phone Number" />
                                </div>
                            </div>
                        </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1 justify-center" onClick={() => setShowForm(false)}>Back</Button>
                      <Button type="submit" variant="primary" className="flex-1 justify-center" disabled={loading}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
                      </Button>
                  </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
