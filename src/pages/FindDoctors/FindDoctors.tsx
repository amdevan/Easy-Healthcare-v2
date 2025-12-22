import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchDoctors, fetchSpecialties, DoctorDto, SpecialtyDto, getDoctor, DoctorDetailDto, createAppointment, fetchDoctorAvailability, fetchServerTime, fetchPaymentSettings, PaymentSettings } from '@/controllers/api';
import { usePageContent } from '@/hooks/usePageContent';
import { CountryCodeSelect } from '@/components/ui/CountryCodeSelect';
import { resolveSrc } from '@/utils/url';
import { MapPin, Stethoscope, Clock, Search, Briefcase, Building, Video, Home } from 'lucide-react';

type Doctor = {
  id: number;
  name: string;
  location: string;
  experienceYears: number;
  rating: number;
  specialization?: string | null;
  nmcNo?: string | null;
  photoUrl?: string | null;
  appointmentType?: string[] | null;
  position?: string | null;
  consultationFeeClinic?: number | null;
  consultationFeeOnline?: number | null;
  consultationFeeHome?: number | null;
  hospitals?: string[] | null;
};

const toSlug = (s: string) => s
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

const toDoctor = (d: DoctorDto): Doctor => ({
  id: d.id,
  name: d.name,
  location: d.location ?? '',
  experienceYears: d.experience_years ?? 0,
  rating: Number.isFinite(Number(d.rating)) ? Number(d.rating) : 0,
  photoUrl: d.profile_photo_path ? resolveSrc(d.profile_photo_path) : (d.profile_photo_url ?? null),
  specialization: d.specialization ?? null,
  nmcNo: d.nmc_no ?? null,
  appointmentType: d.appointment_type ?? null,
  position: d.position ?? null,
  consultationFeeClinic: d.consultation_fee_clinic,
  consultationFeeOnline: d.consultation_fee_online,
  consultationFeeHome: d.consultation_fee_home,
  hospitals: d.hospitals,
});


const FindDoctors: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [specialties, setSpecialties] = useState<SpecialtyDto[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctorDetail, setDoctorDetail] = useState<DoctorDetailDto | null>(null);
  const [patientName, setPatientName] = useState('');
  const [countryCode, setCountryCode] = useState('+977');
  const [phone, setPhone] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingStep, setBookingStep] = useState<'details' | 'payment'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'clinic' | 'esewa' | 'khalti' | 'fonepay' | 'stripe'>('clinic');
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [appointmentTypeError, setAppointmentTypeError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const routerLocation = useLocation();
  useEffect(() => {
    const sp = new URLSearchParams(routerLocation.search);
    const q = sp.get('q') || '';
    const loc = sp.get('location') || '';
    const spec = sp.get('specialty') || '';
    if (q) setQuery(q);
    if (loc) setLocation(loc);
    if (spec) setSpecialty(spec);
  }, [routerLocation.search]);

  const today = useMemo(() => {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }, []);
  const maxDay = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }, []);
  const nextQuarter = useMemo(() => {
    const d = new Date();
    const minutes = d.getMinutes();
    const next = Math.ceil(minutes / 15) * 15;
    if (next === 60) {
      d.setHours(d.getHours() + 1);
      d.setMinutes(0);
    } else {
      d.setMinutes(next);
    }
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }, []);
  const [serverToday, setServerToday] = useState<string | null>(null);
  const [serverNextQuarter, setServerNextQuarter] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    fetchPaymentSettings()
      .then(settings => {
        if (!ignore) setPaymentSettings(settings);
      })
      .catch(console.error);

    Promise.all([
      fetchDoctors({ location: location || undefined, q: query || undefined }),
      fetchSpecialties(),
    ])
      .then(([docRes, specRes]) => {
        if (ignore) return;
        setDoctors(docRes.data.map(toDoctor));
        setSpecialties(specRes);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => { ignore = true; };
  }, [query, location]);

  const filtered = useMemo(() => {
    return doctors.filter(d => {
      const matchesQuery = query
        ? d.name.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesLocation = location ? d.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesSpecialty = specialty
        ? (d.specialization ? d.specialization.toLowerCase().includes(specialty.toLowerCase()) : false)
        : true;
      return matchesQuery && matchesLocation && matchesSpecialty;
    });
  }, [query, location, specialty, doctors]);

  const { data: pageData } = usePageContent('find-doctors');
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const heroTitle = heroBlock?.data?.title || "Find Doctors Near You";
  const heroSubtitle = heroBlock?.data?.description || "Search for top-rated specialists and book appointments with ease.";
  const heroImage = heroBlock?.data?.image ? resolveSrc(heroBlock.data.image) : undefined;

  return (
    <section className="py-12 lg:py-20 bg-brand-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden relative">
          {heroImage && (
             <div className="absolute inset-0 h-48 md:h-64 w-full">
                <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90"></div>
             </div>
          )}
          <div className="p-6 md:p-8 relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray-900">{heroTitle}</h1>
            <p className="mt-3 text-brand-gray-600">{heroSubtitle}</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z" /></svg>
              </span>
              <input value={query} onChange={e => setQuery(e.target.value)} className="flex-1 p-3 focus:outline-none" placeholder="Search by name" />
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18l-4.95-4.95a7 7 0 010-9.9zM10 9a2 2 0 100 4 2 2 0 000-4z" /></svg>
              </span>
              <input value={location} onChange={e => setLocation(e.target.value)} className="flex-1 p-3 focus:outline-none" placeholder="Location" />
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z" /></svg>
              </span>
              <input
                list="find-specialty-list"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="All Specialities"
                className="flex-1 p-3 focus:outline-none"
                aria-label="Filter by speciality"
              />
              <datalist id="find-specialty-list">
                {specialties.map((s) => (
                  <option key={s.id} value={s.name} />
                ))}
              </datalist>
            </div>
          </div>

          {loading && (
            <div className="mt-6 text-brand-gray-600">Loading doctors...</div>
          )}
          {error && (
            <div className="mt-6 text-red-600">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(d => (
              <div key={d.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-slate-100 shadow-md">
                        {d.photoUrl ? (
                          <img src={d.photoUrl} alt={d.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        ) : (
                          <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                          </div>
                        )}
                      </div>
                      {/* Active indicator could go here */}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                         <h3 className="text-lg font-bold text-slate-900 truncate leading-tight mb-1 group-hover:text-teal-600 transition-colors">{d.name}</h3>
                         {d.appointmentType && d.appointmentType.length > 0 && (
                           <div className="flex flex-shrink-0 gap-1 mt-1">
                             {d.appointmentType.map(type => {
                                let Icon = Building;
                                if (type === 'Online') Icon = Video;
                                if (type === 'Home Visit') Icon = Home;
                                return (
                                  <span key={type} className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-50 text-teal-600 border border-teal-100" title={type}>
                                    <Icon className="w-3.5 h-3.5" />
                                  </span>
                                );
                             })}
                           </div>
                         )}
                      </div>
                      
                      {d.position && (
                        <div className="flex items-center gap-1.5 text-slate-600 mb-1">
                          <Briefcase className="w-3.5 h-3.5 flex-shrink-0 text-teal-500" />
                          <p className="text-xs font-medium truncate">{d.position}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-slate-600 mb-1">
                        <Stethoscope className="w-3.5 h-3.5 flex-shrink-0 text-teal-500" />
                        <p className="text-xs font-medium truncate">{d.specialization || 'General Practitioner'}</p>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600 mb-1">
                        <Building className="w-3.5 h-3.5 flex-shrink-0 text-teal-500" />
                        <p className="text-xs font-medium truncate">
                          {d.hospitals && d.hospitals.length > 0 ? d.hospitals.join(', ') : 'Hospital not specified'}
                        </p>
                      </div>

                      {d.nmcNo && (
                        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide mb-2">NMC: {d.nmcNo}</p>
                      )}

                      <div className="flex flex-col gap-1.5 mt-1">
                         <div className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                          <span className="text-xs font-medium truncate">{d.experienceYears} Years Experience</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                          <span className="text-xs font-medium truncate">{d.location || 'Location not specified'}</span>
                        </div>


                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 rounded-xl shadow-lg shadow-teal-500/20 transition-all transform active:scale-95"
                      onClick={async () => {
                        setSelectedDoctor(d);
                        setBookingOpen(true);
                        setBookingStep('details');
                        setPaymentMethod('clinic');
                        setPhone('');
                        setCountryCode('+977');
                        setAppointmentType('');
                        setActionError(null);
                        setSuccessMsg(null);
                        let serverDate = today;
                        let fetchedServerDate: string | null = null;
                        let fetchedServerNextQuarter: string | null = null;
                        try {
                          const t = await fetchServerTime();
                          const dt = new Date(t.now);
                          const m = String(dt.getMonth() + 1).padStart(2, '0');
                          const day = String(dt.getDate()).padStart(2, '0');
                          const computedServerDate = `${dt.getFullYear()}-${m}-${day}`;
                          const mins = dt.getMinutes();
                          const next = Math.ceil(mins / 15) * 15;
                          if (next === 60) {
                            dt.setHours(dt.getHours() + 1);
                            dt.setMinutes(0);
                          } else {
                            dt.setMinutes(next);
                          }
                          const hh = String(dt.getHours()).padStart(2, '0');
                          const mm = String(dt.getMinutes()).padStart(2, '0');
                          const computedTime = `${hh}:${mm}`;
                          
                          fetchedServerDate = computedServerDate;
                          fetchedServerNextQuarter = computedTime; // Store time for filtering
                          
                          setDate(computedServerDate);
                          setTime(computedTime);
                          setServerToday(computedServerDate);
                          setServerNextQuarter(computedTime);
                        } catch (e) {
                           // fallback
                           const dt = new Date();
                           const m = String(dt.getMonth() + 1).padStart(2, '0');
                           const day = String(dt.getDate()).padStart(2, '0');
                           fetchedServerDate = `${dt.getFullYear()}-${m}-${day}`;
                           setDate(fetchedServerDate);
                           
                           // Fallback time
                           const mins = dt.getMinutes();
                           const next = Math.ceil(mins / 15) * 15;
                           if (next === 60) {
                             dt.setHours(dt.getHours() + 1);
                             dt.setMinutes(0);
                           } else {
                             dt.setMinutes(next);
                           }
                           const hh = String(dt.getHours()).padStart(2, '0');
                           const mm = String(dt.getMinutes()).padStart(2, '0');
                           const fallbackTime = `${hh}:${mm}`;
                           fetchedServerNextQuarter = fallbackTime;
                           
                           setServerToday(fetchedServerDate);
                           setServerNextQuarter(fallbackTime);
                        }
                        
                        // Prefetch slots
                        setSlotsLoading(true);
                        try {
                           const res = await fetchDoctorAvailability(d.id, fetchedServerDate || today);
                           const allSlots = res.slots || [];
                           
                           // Filter past slots if date is today
                           const currentNextQuarter = fetchedServerNextQuarter; 
                           const filteredSlots = (fetchedServerDate && fetchedServerDate === (serverToday || fetchedServerDate))
                             ? allSlots.filter(s => s >= (currentNextQuarter || '00:00'))
                             : allSlots;
                             
                           setSlots(filteredSlots);
                           if (!time && filteredSlots.length > 0) {
                               setTime(filteredSlots[0]);
                           }
                        } catch {
                           setSlots([]);
                        } finally {
                           setSlotsLoading(false);
                        }
                      }}
                    >
                      Book Now
                    </button>
                    <button
                      className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
                      onClick={() => navigate(`/find-doctors/${toSlug(d.name)}`)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {profileOpen && selectedDoctor && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-4">
                    {(doctorDetail?.profile_photo_url || selectedDoctor.photoUrl) ? (
                      <img src={(doctorDetail?.profile_photo_url as string) || (selectedDoctor.photoUrl as string) || ''} alt={selectedDoctor.name} className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <span className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v2a6 6 0 006 6 6 6 0 006-6V8a6 6 0 00-6-6z" /></svg>
                      </span>
                    )}
                    <span>{selectedDoctor.name}</span>
                  </h2>
                  <button className="text-gray-500" onClick={() => { setProfileOpen(false); setDoctorDetail(null); }}>&times;</button>
                </div>
                <div className="mt-4 space-y-2">
                  {actionLoading && <div className="text-brand-gray-600">Loading profile...</div>}
                  {actionError && <div className="text-red-600">{actionError}</div>}
                  {!actionLoading && (
                    <div className="space-y-3">
                      {(doctorDetail?.specialization || doctorDetail?.hospital_name || selectedDoctor.location) && (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-brand-gray-500">Specialization</div>
                            <div className="text-brand-gray-800">{doctorDetail?.specialization || '-'}</div>
                          </div>
                          <div>
                            <div className="text-brand-gray-500">Hospital</div>
                            <div className="text-brand-gray-800">
                              {doctorDetail?.hospitals && doctorDetail.hospitals.length > 0 
                                ? doctorDetail.hospitals.join(', ') 
                                : doctorDetail?.hospital_name || '-'}
                            </div>
                          </div>
                          <div>
                            <div className="text-brand-gray-500">Location</div>
                            <div className="text-brand-gray-800">{selectedDoctor.location || '-'}</div>
                          </div>
                          <div>
                            <div className="text-brand-gray-500">Experience</div>
                            <div className="text-brand-gray-800">{selectedDoctor.experienceYears} yrs</div>
                          </div>
                        </div>
                      )}
                      
                      {doctorDetail?.content && (
                        <div className="space-y-1">
                          <div className="text-brand-gray-900 font-semibold">Professional Journey</div>
                          <div className="prose max-w-none text-brand-gray-700">
                            <span dangerouslySetInnerHTML={{ __html: doctorDetail.content }} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-semibold bg-gray-100 text-brand-gray-700 rounded-md" onClick={() => { setProfileOpen(false); setDoctorDetail(null); }}>Close</button>
                    <button
                      className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue rounded-md hover:bg-brand-blue-dark"
                      onClick={async () => {
                        setProfileOpen(false);
                        if (selectedDoctor) {
                          setBookingOpen(true);
                          setBookingStep('details');
                          setPaymentMethod('clinic');
                          setPhone('');
                          setCountryCode('+977');
                          setAppointmentType('');
                          setActionError(null);
                          setSuccessMsg(null);
                          let serverDate = today;
                          let fetchedServerDate: string | null = null;
                          let fetchedServerNextQuarter: string | null = null;
                          try {
                            const t = await fetchServerTime();
                            const dt = new Date(t.now);
                            const m = String(dt.getMonth() + 1).padStart(2, '0');
                            const day = String(dt.getDate()).padStart(2, '0');
                            const computedServerDate = `${dt.getFullYear()}-${m}-${day}`;
                            const mins = dt.getMinutes();
                            const next = Math.ceil(mins / 15) * 15;
                            if (next === 60) {
                              dt.setHours(dt.getHours() + 1);
                              dt.setMinutes(0);
                            } else {
                              dt.setMinutes(next);
                            }
                            const hh = String(dt.getHours()).padStart(2, '0');
                            const mm = String(dt.getMinutes()).padStart(2, '0');
                            const computedServerNextQuarter = `${hh}:${mm}`;
                            serverDate = computedServerDate;
                            fetchedServerDate = computedServerDate;
                            fetchedServerNextQuarter = computedServerNextQuarter;
                            setServerToday(computedServerDate);
                            setServerNextQuarter(computedServerNextQuarter);
                          } catch {}
                          setDate(serverDate);
                          setTime('');
                          setSlotsLoading(true);
                          try {
                            const res = await fetchDoctorAvailability(selectedDoctor.id, serverDate);
                            const allSlots = res.slots || [];
                            const filteredSlots = fetchedServerDate && serverDate === fetchedServerDate
                              ? allSlots.filter(s => s >= ((fetchedServerNextQuarter as string) || nextQuarter))
                              : allSlots;
                            setSlots(filteredSlots);
                            setTime(filteredSlots[0] || '');
                          } catch (e) {
                            setSlots([]);
                          } finally {
                            setSlotsLoading(false);
                          }
                        }
                      }}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {bookingOpen && selectedDoctor && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center gap-4">
                    {selectedDoctor.photoUrl ? (
                      <img src={selectedDoctor.photoUrl} alt={selectedDoctor.name} className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <span className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v2a6 6 0 006 6 6 6 0 006-6V8a6 6 0 00-6-6z" /></svg>
                      </span>
                    )}
                    <span>Book with {selectedDoctor.name}</span>
                  </h2>
                  <button className="text-gray-500" onClick={() => { setBookingOpen(false); setPatientName(''); setPhone(''); setCountryCode('+977'); setAppointmentType(''); setDate(''); setTime(''); setNotes(''); setActionError(null); }}>&times;</button>
                </div>
                <div className="mt-4 space-y-3">
                  {actionError && <div className="text-red-600">{actionError}</div>}
                  {successMsg && <div className="text-green-600">{successMsg}</div>}
                  
                  {bookingStep === 'details' ? (
                    <>
                      <input
                        value={patientName}
                        onChange={e => { setPatientName(e.target.value); setNameError(null); }}
                        className={`w-full border rounded-md p-2 ${nameError ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Your name"
                      />
                      {nameError && <div className="text-red-600 text-sm">{nameError}</div>}
 
                       <div className="flex gap-2">
                         <CountryCodeSelect
                           value={countryCode}
                           onChange={setCountryCode}
                           className="w-[140px]"
                         />
                         <input
                           value={phone}
                           onChange={e => { setPhone(e.target.value); setPhoneError(null); }}
                           className={`flex-1 border rounded-md p-2 ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                           placeholder="Phone number"
                         />
                       </div>
                       {phoneError && <div className="text-red-600 text-sm">{phoneError}</div>}
 
                       {selectedDoctor.appointmentType && selectedDoctor.appointmentType.length > 0 && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-gray-700">Appointment Type</label>
                          <select
                            value={appointmentType}
                            onChange={e => { setAppointmentType(e.target.value); setAppointmentTypeError(null); }}
                            className={`w-full border rounded-md p-2 ${appointmentTypeError ? 'border-red-500' : 'border-gray-300'}`}
                          >
                            <option value="">Select type</option>
                            {selectedDoctor.appointmentType.map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                          {appointmentTypeError && <div className="text-red-600 text-sm">{appointmentTypeError}</div>}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="date"
                          value={date}
                          min={today}
                          max={maxDay}
                          onChange={async e => {
                            const val = e.target.value;
                            setDate(val);
                            setDateError(null);
                            if (selectedDoctor) {
                              setSlotsLoading(true);
                              try {
                                const res = await fetchDoctorAvailability(selectedDoctor.id, val);
                                const allSlots = res.slots || [];
                                const filteredSlots = serverToday && val === serverToday
                                  ? allSlots.filter(s => s >= (serverNextQuarter || nextQuarter))
                                  : allSlots;
                                setSlots(filteredSlots);
                                setTime(filteredSlots[0] || '');
                              } catch (err) {
                                setSlots([]);
                              } finally {
                                setSlotsLoading(false);
                              }
                            }
                          }}
                          className={`border rounded-md p-2 ${dateError ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <input
                          type="time"
                          value={time}
                          step={900}
                          min={date && serverToday && date === serverToday ? (serverNextQuarter || nextQuarter) : undefined}
                          onChange={e => { setTime(e.target.value); setTimeError(null); }}
                          className={`border rounded-md p-2 ${timeError ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {slotsLoading && <span className="text-brand-gray-600 text-sm">Loading slots...</span>}
                        {!slotsLoading && slots.length === 0 && (
                          <span className="text-brand-gray-600 text-sm">No slots available for selected date</span>
                        )}
                        {!slotsLoading && slots.map(s => (
                          <button
                            key={s}
                            type="button"
                            className={`px-3 py-1 rounded-md border ${time === s ? 'bg-brand-blue text-white border-brand-blue' : 'bg-gray-100 text-brand-gray-700 border-gray-200'}`}
                            onClick={() => { setTime(s); setTimeError(null); }}
                          >{s}</button>
                        ))}
                      </div>
                      {dateError && <div className="text-red-600 text-sm">{dateError}</div>}
                      {timeError && <div className="text-red-600 text-sm">{timeError}</div>}
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" placeholder="Notes (optional)" rows={3} />
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h3 className="font-semibold text-slate-800 mb-2">Booking Summary</h3>
                        <div className="text-sm text-slate-600 space-y-1">
                          <p><span className="font-medium text-slate-700">Doctor:</span> {selectedDoctor.name}</p>
                          <p><span className="font-medium text-slate-700">Date:</span> {date} at {time}</p>
                          <p><span className="font-medium text-slate-700">Patient:</span> {patientName}</p>
                          {appointmentType && <p><span className="font-medium text-slate-700">Type:</span> {appointmentType}</p>}
                          {(() => {
                            const fee = appointmentType === 'Online' ? selectedDoctor.consultationFeeOnline
                              : appointmentType === 'In-Clinic' ? selectedDoctor.consultationFeeClinic
                              : appointmentType === 'Home Visit' ? selectedDoctor.consultationFeeHome
                              : null;
                            
                            if (fee) {
                              return (
                                <div className="border-t border-slate-200 my-2 pt-2 flex justify-between font-bold text-slate-800">
                                  <span>Consultation Fee</span>
                                  <span>NPR {fee}</span>
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-800 mb-3">Select Payment Method</h3>
                        <div className="space-y-2">
                          {appointmentType === 'In-Clinic' && (
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'clinic' ? 'border-brand-blue bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                              <input type="radio" name="payment" value="clinic" checked={paymentMethod === 'clinic'} onChange={() => setPaymentMethod('clinic')} className="mr-3" />
                              <span className="font-medium text-slate-700">Pay at Clinic</span>
                            </label>
                          )}
                          
                          {paymentSettings?.esewa?.enabled && (
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'esewa' ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                              <input type="radio" name="payment" value="esewa" checked={paymentMethod === 'esewa'} onChange={() => setPaymentMethod('esewa')} className="mr-3" />
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-700">eSewa Mobile Wallet</span>
                                <span className="text-xs text-slate-500">Instant payment via eSewa</span>
                              </div>
                            </label>
                          )}

                          {paymentSettings?.khalti?.enabled && (
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'khalti' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                              <input type="radio" name="payment" value="khalti" checked={paymentMethod === 'khalti'} onChange={() => setPaymentMethod('khalti')} className="mr-3" />
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-700">Khalti Digital Wallet</span>
                                <span className="text-xs text-slate-500">Instant payment via Khalti</span>
                              </div>
                            </label>
                          )}

                          {paymentSettings?.fonepay?.enabled && (
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'fonepay' ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                              <input type="radio" name="payment" value="fonepay" checked={paymentMethod === 'fonepay'} onChange={() => setPaymentMethod('fonepay')} className="mr-3" />
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-700">Fonepay</span>
                                <span className="text-xs text-slate-500">Instant payment via Fonepay</span>
                              </div>
                            </label>
                          )}

                          {paymentSettings?.stripe?.enabled && (
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'stripe' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                              <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} className="mr-3" />
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-700">Stripe / Card</span>
                                <span className="text-xs text-slate-500">Credit/Debit Card payment</span>
                              </div>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button 
                    className="px-4 py-2 text-sm font-semibold bg-gray-100 text-brand-gray-700 rounded-md" 
                    onClick={() => { 
                      if (bookingStep === 'payment') {
                        setBookingStep('details');
                      } else {
                        setBookingOpen(false); 
                        setPatientName(''); setPhone(''); setAppointmentType(''); setDate(''); setTime(''); setNotes(''); setActionError(null);
                      }
                    }}
                  >
                    {bookingStep === 'payment' ? 'Back' : 'Cancel'}
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue rounded-md hover:bg-brand-blue-dark"
                    disabled={actionLoading}
                    onClick={async () => {
                      setActionError(null);
                      if (bookingStep === 'details') {
                        if (!patientName) { setNameError('Please enter your name'); return; }
                        if (!phone) { setPhoneError('Please enter your phone number'); return; }
                        if (selectedDoctor.appointmentType && selectedDoctor.appointmentType.length > 0 && !appointmentType) {
                           setAppointmentTypeError('Please select appointment type'); return;
                        }
                        if (!date) { setDateError('Please choose a date'); return; }
                        if (!time) { setTimeError('Please choose a time'); return; }
                        
                        setBookingStep('payment');
                        if (appointmentType && appointmentType !== 'In-Clinic' && paymentMethod === 'clinic') {
                           if (paymentSettings?.esewa?.enabled) setPaymentMethod('esewa');
                           else if (paymentSettings?.khalti?.enabled) setPaymentMethod('khalti');
                           else if (paymentSettings?.fonepay?.enabled) setPaymentMethod('fonepay');
                           else if (paymentSettings?.stripe?.enabled) setPaymentMethod('stripe');
                           else {
                               setActionError("Online payment is required for this appointment type but no gateway is active.");
                               return;
                           }
                        }
                      } else {
                        const scheduled = new Date(`${date}T${time}`);
                        const iso = scheduled.toISOString();
                        setActionLoading(true);
                        try {
                          const paymentNote = `Payment Method: ${
                            paymentMethod === 'clinic' ? 'Pay at Clinic' : 
                            paymentMethod === 'esewa' ? 'eSewa' : 
                            paymentMethod === 'khalti' ? 'Khalti' : 
                            paymentMethod === 'fonepay' ? 'Fonepay' : 'Stripe'
                          }`;
                          const finalNotes = notes ? `${notes}\n\n${paymentNote}` : paymentNote;
                          
                          await createAppointment({ 
                             patient_name: patientName, 
                             doctor_id: selectedDoctor.id, 
                             scheduled_at: iso, 
                             notes: finalNotes,
                             phone: `${countryCode} ${phone}`,
                             appointment_type: appointmentType || undefined
                          });
                          setSuccessMsg('Appointment requested successfully');
                          setTimeout(() => {
                            setBookingOpen(false);
                            setSuccessMsg(null);
                            setPatientName(''); setPhone(''); setCountryCode('+977'); setAppointmentType(''); setDate(''); setTime(''); setNotes('');
                          }, 1200);
                        } catch (e: any) {
                          setActionError(e.message || 'Failed to book appointment');
                        } finally {
                          setActionLoading(false);
                        }
                      }
                    }}
                  >
                    {actionLoading ? 'Processing...' : (bookingStep === 'details' ? 'Next' : 'Confirm & Book')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </section>
  );
};

export default FindDoctors;
