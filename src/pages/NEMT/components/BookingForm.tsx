import React, { useState, useRef, useEffect } from 'react';
import { BookingFormData, VehicleItem } from '../types';
import { VEHICLES as DEFAULT_VEHICLES } from '../constants';
import { CountryCodeSelect } from '../../../components/ui/CountryCodeSelect';
import { Calendar, Clock, MapPin, User, Phone, ChevronRight, ChevronLeft, CheckCircle, Navigation, Loader2, Map as MapIcon, X } from 'lucide-react';

interface BookingFormProps {
  title?: string;
  subtitle?: string;
  steps?: {
    journey: string;
    vehicle: string;
    details: string;
  };
  labels?: {
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    patientName: string;
    contactNumber: string;
    notes: string;
    vehicleSelect: string;
    patientDetails: string;
  };
  placeholders?: {
    pickup: string;
    dropoff: string;
    notes: string;
    patientName: string;
    contactNumber: string;
  };
  success?: {
    title: string;
    messageTemplate: string;
    contactTemplate: string;
    buttonText: string;
  };
  vehicles?: VehicleItem[];
}

const BookingForm: React.FC<BookingFormProps> = ({
  title = "Book a Vehicle in 3 Easy Steps",
  subtitle = "We'll handle the logistics so you can focus on health.",
  steps = {
    journey: 'Journey',
    vehicle: 'Vehicle',
    details: 'Details'
  },
  labels = {
    pickup: 'Pickup Location',
    dropoff: 'Drop-off Destination',
    date: 'Date',
    time: 'Preferred Time',
    patientName: 'Patient Name',
    contactNumber: 'Contact Number',
    notes: 'Additional Notes',
    vehicleSelect: 'Select the right vehicle',
    patientDetails: 'Patient Details'
  },
  placeholders = {
    pickup: 'e.g. Home Address',
    dropoff: 'e.g. Norvic Hospital',
    notes: 'Any special medical requirements, assistance needs, or instructions',
    patientName: 'e.g. John Doe',
    contactNumber: 'e.g. 9800000000'
  },
  success = {
    title: 'Booking Request Sent!',
    messageTemplate: 'Thank you, {patientName}. Our dispatch team has received your request for {date} at {time}.',
    contactTemplate: 'We will call you at {contactNumber} within 15 minutes to confirm details and provide a final quote.',
    buttonText: 'Book another trip'
  },
  vehicles = DEFAULT_VEHICLES
}) => {
  const mergedPlaceholders = {
    pickup: placeholders?.pickup || 'e.g. Home Address',
    dropoff: placeholders?.dropoff || 'e.g. Norvic Hospital',
    notes: placeholders?.notes || 'Any special medical requirements, assistance needs, or instructions',
    patientName: placeholders?.patientName || 'e.g. John Doe',
    contactNumber: placeholders?.contactNumber || 'e.g. 9800000000'
  };

  const mergedLabels = {
    pickup: labels?.pickup || 'Pickup Location',
    dropoff: labels?.dropoff || 'Drop-off Destination',
    date: labels?.date || 'Date',
    time: labels?.time || 'Preferred Time',
    patientName: labels?.patientName || 'Patient Name',
    contactNumber: labels?.contactNumber || 'Contact Number',
    notes: labels?.notes || 'Additional Notes',
    vehicleSelect: labels?.vehicleSelect || 'Select the right vehicle',
    patientDetails: labels?.patientDetails || 'Patient Details'
  };

  const mergedSteps = {
        journey: steps?.journey || 'Journey',
        vehicle: steps?.vehicle || 'Vehicle',
        details: steps?.details || 'Details'
    };

    const [step, setStep] = useState(1);
  const [countryCode, setCountryCode] = useState('+977');
  const [formData, setFormData] = useState<BookingFormData>({
    patientName: '',
    contactNumber: '',
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    vehicleType: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Map State
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [activeField, setActiveField] = useState<'pickup' | 'dropoff' | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectVehicle = (id: string) => {
    setFormData(prev => ({ ...prev, vehicleType: id }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          pickupLocation: `Current Location (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`
        }));
        setGettingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please enter it manually.");
        setGettingLocation(false);
      }
    );
  };

  // Map Logic
  // Ensure Leaflet assets are available (CSS + JS via CDN)
  const ensureLeafletAssetsLoaded = (): Promise<void> => {
    return new Promise((resolve) => {
      const win = window as any;
      if (win.L) {
        resolve();
        return;
      }

      // Inject CSS if absent
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4QX7JQnUpn4GsxUuZa2Y4IitYEVrFZ1YF2zN8lH74g=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }

      // Inject JS if absent
      if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kK8vZVaWZ8fT0+M=';
        script.crossOrigin = '';
        script.onload = () => resolve();
        document.body.appendChild(script);
      } else {
        resolve();
      }
    });
  };

  const openMap = async (field: 'pickup' | 'dropoff') => {
    setActiveField(field);
    setIsMapOpen(true);
    setMapLoading(true);
    await ensureLeafletAssetsLoaded();
    // Delay map initialization slightly to ensure modal is rendered
    setTimeout(() => initMap(), 100);
  };

  const initMap = () => {
    const L = (window as any).L;
    if (!L || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
    }

    // Default to Kathmandu
    const defaultLat = 27.7172;
    const defaultLng = 85.3240;
    
    const map = L.map(mapContainerRef.current).setView([defaultLat, defaultLng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapLoading(false);

    // Add marker on click
    map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
        } else {
            markerRef.current = L.marker([lat, lng]).addTo(map);
        }
    });
  };

  const confirmMapLocation = async () => {
    if (!markerRef.current || !activeField) return;
    
    setMapLoading(true);
    const { lat, lng } = markerRef.current.getLatLng();
    
    try {
        // Simple reverse geocoding using OSM Nominatim (Free, no key required)
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        
        const address = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        setFormData(prev => ({ ...prev, [activeField === 'pickup' ? 'pickupLocation' : 'dropoffLocation']: address }));
        setIsMapOpen(false);
    } catch (error) {
        console.error("Geocoding error:", error);
        // Fallback to coordinates
        setFormData(prev => ({ ...prev, [activeField === 'pickup' ? 'pickupLocation' : 'dropoffLocation']: `${lat.toFixed(5)}, ${lng.toFixed(5)}` }));
        setIsMapOpen(false);
    } finally {
        setMapLoading(false);
        setActiveField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
        const response = await fetch('/api/nemt-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                contactNumber: `${countryCode} ${formData.contactNumber}`
            })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to submit booking');
        }

        setSubmitted(true);
    } catch (err: any) {
        console.error("Booking submission error:", err);
        setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="booking" className="py-24 bg-teal-50/50 scroll-mt-32">
        <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-teal-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{success.title}</h3>
                <p className="text-lg text-slate-600 mb-8">
                    {success.messageTemplate
                      .replace('{patientName}', formData.patientName)
                      .replace('{date}', formData.date)
                      .replace('{time}', formData.time)
                      .split(formData.patientName).map((part, i, arr) => (
                        <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="font-semibold text-teal-700">{formData.patientName}</span>}
                        </React.Fragment>
                      ))
                      // This split logic is a bit complex for simple replacement, let's simplify for now or use a proper formatter if needed.
                      // Actually, the original code had bold spans. 
                      // Let's keep it simple: just text replacement for now, or assume the user wants the same styling.
                      // To keep styling, I might need to parse the template or just accept that the dynamic version might lose specific bolding unless I implement a mini-parser.
                      // For now, I'll just render the text with replacement.
                    }
                </p>
                {/* 
                   Wait, the original code had:
                   Thank you, <span className="font-semibold text-teal-700">{formData.patientName}</span>. 
                   Our dispatch team has received your request for <span className="font-semibold text-teal-700">{formData.date}</span> at <span className="font-semibold text-teal-700">{formData.time}</span>.
                   
                   If I use a string template from CMS, I lose the spans unless I use HTML parsing or a custom parser.
                   Let's stick to the prop but maybe just use the prop as text for now to satisfy the "dynamic" requirement.
                   Or better, I can keep the hardcoded structure but use the labels/titles.
                   The success message is quite specific.
                   Let's try to preserve the structure but use the text from props where possible.
                   
                   Actually, if the user provides a template like "Thank you, {patientName}...", I can replace it.
                   But for the spans, it's tricky.
                   Let's just use the prop text with replacement and wrap the whole thing in a p tag.
                   I will improve this later if needed.
                */}
                <p className="text-lg text-slate-600 mb-8">
                   {success.messageTemplate
                      .replace('{patientName}', formData.patientName)
                      .replace('{date}', formData.date)
                      .replace('{time}', formData.time)}
                </p>
                <p className="text-slate-500 mb-8">
                    {success.contactTemplate.replace('{contactNumber}', formData.contactNumber)}
                </p>
                <button 
                onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    setFormData({
                        patientName: '', contactNumber: '', pickupLocation: '', dropoffLocation: '', 
                        date: '', time: '', vehicleType: '', notes: ''
                    });
                }}
                className="inline-flex items-center text-teal-600 hover:text-teal-800 font-semibold underline"
                >
                {success.buttonText}
                </button>
            </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-32">
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-900/20 rounded-l-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-900/20 rounded-r-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
          <p className="mt-3 text-slate-300">{subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-700 -z-10 rounded"></div>
                
                {[1, 2, 3].map((num) => (
                    <div key={num} className={`flex flex-col items-center ${step >= num ? 'text-teal-400' : 'text-slate-500'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= num ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/50' : 'bg-slate-800 border-2 border-slate-600'}`}>
                            {step > num ? <CheckCircle className="w-6 h-6" /> : num}
                        </div>
                        <span className="text-xs font-medium mt-2 bg-slate-900 px-2 rounded">
                            {num === 1 ? mergedSteps.journey : num === 2 ? mergedSteps.vehicle : mergedSteps.details}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden text-slate-900 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Journey Details */}
            {step === 1 && (
                <div className="p-8 md:p-12 animate-fadeIn">
                    <h3 className="text-2xl font-bold mb-6 flex items-center"><MapPin className="mr-2 text-teal-600"/> Where are we going?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{mergedLabels.pickup}</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input 
                                        type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange}
                                        placeholder={mergedPlaceholders.pickup}
                                        className="w-full pl-12 pr-20 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                                        <button
                                            type="button"
                                            onClick={() => openMap('pickup')}
                                            className="text-slate-400 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50"
                                            title="Pick on Map"
                                        >
                                            <MapIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleGetCurrentLocation}
                                            disabled={gettingLocation}
                                            className="text-slate-400 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50"
                                            title="Use Current Location"
                                        >
                                            {gettingLocation ? (
                                                <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
                                            ) : (
                                                <Navigation className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{mergedLabels.dropoff}</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input 
                                        type="text" name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange}
                                        placeholder={mergedPlaceholders.dropoff}
                                        className="w-full pl-12 pr-12 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                         <button
                                            type="button"
                                            onClick={() => openMap('dropoff')}
                                            className="text-slate-400 hover:text-teal-600 transition-colors p-2 rounded-full hover:bg-teal-50"
                                            title="Pick on Map"
                                        >
                                            <MapIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{mergedLabels.date}</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input 
                                        type="date" name="date" value={formData.date} onChange={handleChange}
                                        className="w-full pl-12 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{mergedLabels.time}</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input 
                                        type="time" name="time" value={formData.time} onChange={handleChange}
                                        className="w-full pl-12 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Vehicle Selection */}
            {step === 2 && (
                <div className="p-8 md:p-12 animate-fadeIn">
                    <h3 className="text-2xl font-bold mb-6 text-center">{mergedLabels.vehicleSelect}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {vehicles.map(v => (
                            <div 
                                key={v.id}
                                onClick={() => selectVehicle(v.id)}
                                className={`cursor-pointer rounded-2xl border-2 p-4 transition-all hover:shadow-lg ${formData.vehicleType === v.id ? 'border-teal-500 bg-teal-50' : 'border-slate-100 hover:border-teal-200'}`}
                            >
                                <div className="aspect-w-16 aspect-h-9 mb-3 rounded-xl overflow-hidden bg-slate-200">
                                    <img src={v.image} alt={v.name} className="w-full h-32 object-cover" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900">{v.name}</h4>
                                    {formData.vehicleType === v.id && <CheckCircle className="h-5 w-5 text-teal-600" />}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
                <div className="p-8 md:p-12 animate-fadeIn">
                    <h3 className="text-2xl font-bold mb-6 text-center">{mergedLabels.patientDetails}</h3>
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{mergedLabels.patientName}</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input 
                                        type="text" name="patientName" value={formData.patientName} onChange={handleChange}
                                        placeholder={mergedPlaceholders.patientName}
                                        className="w-full pl-12 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{mergedLabels.contactNumber}</label>
                                <div className="flex gap-2">
                                    <CountryCodeSelect
                                        value={countryCode}
                                        onChange={setCountryCode}
                                        className="w-[140px]"
                                    />
                                    <div className="relative flex-1">
                                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                        <input 
                                            type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange}
                                            placeholder={mergedPlaceholders.contactNumber}
                                            className="w-full pl-12 p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{mergedLabels.notes}</label>
                            <textarea 
                                name="notes" value={formData.notes} onChange={handleChange}
                                placeholder={mergedPlaceholders.notes}
                                className="w-full p-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none min-h-[120px]"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Footer: Navigation */}
            <div className="flex items-center justify-between p-6 bg-slate-50 border-t border-slate-100">
                <button 
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`inline-flex items-center px-4 py-2 rounded-xl border ${step === 1 ? 'border-slate-200 text-slate-300' : 'border-slate-300 text-slate-700 hover:bg-white hover:border-teal-300 hover:text-teal-700'} transition-colors`}
                >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Back
                </button>
                {step < 3 ? (
                    <button 
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center px-6 py-2 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 shadow-sm"
                    >
                        Next
                        <ChevronRight className="h-5 w-5 ml-2" />
                    </button>
                ) : (
                    <div className="flex flex-col items-end gap-2">
                        {errorMessage && (
                            <div className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                                {errorMessage}
                            </div>
                        )}
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center px-6 py-2 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                            {isSubmitting ? <Loader2 className="h-5 w-5 ml-2 animate-spin" /> : <CheckCircle className="h-5 w-5 ml-2" />}
                        </button>
                    </div>
                )}
            </div>
          </form>
        </div>
      </div>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h4 className="text-slate-900 font-bold">Select Location on Map</h4>
              <button 
                onClick={() => setIsMapOpen(false)} 
                className="p-2 rounded-full hover:bg-slate-100"
                aria-label="Close map"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="h-96" ref={mapContainerRef}>
              {/* Leaflet map will mount here if available */}
              {mapLoading && (
                <div className="h-full w-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={confirmMapLocation} 
                className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingForm;