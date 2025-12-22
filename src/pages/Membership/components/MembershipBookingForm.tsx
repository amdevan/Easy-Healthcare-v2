import React, { useState, useEffect } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { CountryCodeSelect } from '@/components/ui/CountryCodeSelect';

interface MembershipBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    id: string;
    name: string;
    price: number;
  } | null;
}

const MembershipBookingForm: React.FC<MembershipBookingFormProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [isForSelf, setIsForSelf] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    booking_name: '',
    booking_email: '',
    booking_phone: '',
    relation: '',
    member_name: '',
    member_email: '',
    member_phone: '',
    member_address: '',
    booking_phone_code: '+977',
    member_phone_code: '+977',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !selectedPlan) return null;

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
        plan_type: selectedPlan.id,
        is_for_self: isForSelf,
        booking_name: isForSelf ? undefined : formData.booking_name,
        booking_email: isForSelf ? undefined : formData.booking_email,
        booking_phone: isForSelf ? undefined : `${formData.booking_phone_code}${formData.booking_phone}`,
        relation: isForSelf ? undefined : formData.relation,
        name: formData.member_name,
        email: formData.member_email,
        phone: `${formData.member_phone_code}${formData.member_phone}`,
        address: formData.member_address,
      };

      const response = await fetch('/api/memberships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit membership request');
      }

      setSuccess(true);
    } catch (err: any) {
      console.error('Membership booking error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
          <p className="text-slate-600 mb-8">
            Thank you for choosing the {selectedPlan.name}. Our team will contact you shortly to finalize your membership.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              onClose();
            }}
            className="w-full py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8 relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900">Complete Your Membership</h2>
          <p className="text-slate-500 mt-1">
            You selected <span className="font-semibold text-teal-600">{selectedPlan.name}</span> (${selectedPlan.price}/year)
          </p>
        </div>

        {error && (
          <div className="mx-8 mt-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-start gap-3">
            <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Toggle Section */}
          <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between">
            <span className="font-medium text-slate-700">Who is this membership for?</span>
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
              <button
                type="button"
                onClick={() => setIsForSelf(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isForSelf ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Myself
              </button>
              <button
                type="button"
                onClick={() => setIsForSelf(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  !isForSelf ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Someone Else
              </button>
            </div>
          </div>

          {/* Booking Person Details (Only if not for self) */}
          {!isForSelf && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm">1</span>
                Your Details (Booking Person)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="booking_name"
                    required={!isForSelf}
                    value={formData.booking_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Relation to Member</label>
                  <select
                    name="relation"
                    required={!isForSelf}
                    value={formData.relation}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Relation</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="booking_email"
                    required={!isForSelf}
                    value={formData.booking_email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="w-[140px] flex-shrink-0">
                      <CountryCodeSelect
                        value={formData.booking_phone_code}
                        onChange={(code) => setFormData(prev => ({ ...prev, booking_phone_code: code }))}
                      />
                    </div>
                    <input
                      type="tel"
                      name="booking_phone"
                      required={!isForSelf}
                      value={formData.booking_phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Member Details */}
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm">{isForSelf ? '1' : '2'}</span>
              {isForSelf ? 'Your Details' : 'Member Details (For Whom)'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  name="member_name"
                  required
                  value={formData.member_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Address</label>
                <input
                  type="text"
                  name="member_address"
                  value={formData.member_address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="Street Address, City"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="member_email"
                  required
                  value={formData.member_email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <div className="flex gap-2">
                  <div className="w-[140px] flex-shrink-0">
                    <CountryCodeSelect
                      value={formData.member_phone_code}
                      onChange={(code) => setFormData(prev => ({ ...prev, member_phone_code: code }))}
                    />
                  </div>
                  <input
                    type="tel"
                    name="member_phone"
                    required
                    value={formData.member_phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="98XXXXXXXX"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembershipBookingForm;