import React, { useState } from 'react';
import { usePageContent } from '@/hooks/usePageContent';
import { resolveSrc } from '@/utils/url';
import { getIcon } from '@/utils/iconMapper';
import { Pill, Stethoscope, Truck, Heart, Store, ShieldCheck } from 'lucide-react';

type ViewState = 'HOME' | 'SHOP' | 'UPLOAD';

interface PrescriptionUploadProps {
  title?: string;
  subtitle?: string;
  labels?: {
    remove?: string;
    selectFile?: string;
    supported?: string;
    name?: string;
    phone?: string;
    address?: string;
    email?: string;
    next?: string;
    submit?: string;
    uploading?: string;
  };
  placeholders?: {
    name?: string;
    phone?: string;
    address?: string;
    email?: string;
  };
  messages?: {
    success?: string;
    steps?: {
      step1?: string;
      step2?: string;
      step3?: string;
    };
  };
}

const PrescriptionUpload: React.FC<PrescriptionUploadProps> = ({ 
  title, subtitle, labels, placeholders, messages 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [step, setStep] = useState<'SELECT' | 'DETAILS'>('SELECT');
  const [details, setDetails] = useState({ name: '', phone: '', address: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadStatus('idle');
      setStep('SELECT');
      setErrors({});
    }
  };

  const handleNext = () => {
    if (!file) return;
    setStep('DETAILS');
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!details.name.trim()) newErrors.name = 'Name is required';
    if (!details.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?\d{7,15}$/.test(details.phone.trim())) newErrors.phone = 'Enter a valid phone number';
    if (!details.address.trim()) newErrors.address = 'Address is required';
    // Email is optional; validate only if provided
    if (details.email.trim() && !/^\S+@\S+\.\S+$/.test(details.email.trim())) newErrors.email = 'Enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpload = () => {
    if (!file) return;
    if (step !== 'DETAILS') return;
    if (!validateDetails()) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('success');
      setTimeout(() => {
        setFile(null);
        setPreview(null);
        setUploadStatus('idle');
        setStep('SELECT');
        setDetails({ name: '', phone: '', address: '', email: '' });
        setErrors({});
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-100 my-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">{title || "Upload Prescription"}</h2>
        <p className="text-slate-500 mt-2">
          {subtitle || "Upload a clear photo of your doctor's prescription. Our pharmacists will verify and process your order."}
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors relative">
          {preview ? (
            <div className="relative w-full h-64">
              <img
                src={preview}
                alt="Prescription Preview"
                className="w-full h-full object-contain rounded-md"
              />
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setUploadStatus('idle');
                  setStep('SELECT');
                  setDetails({ name: '', phone: '', address: '', email: '' });
                  setErrors({});
                }}
                className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-md text-red-600 hover:text-red-700"
              >
                {labels?.remove || "Remove"}
              </button>
            </div>
          ) : (
            <>
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="bg-blue-50 text-brand-blue font-semibold px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                  {labels?.selectFile || "Select a file"}
                </span>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
              <p className="mt-2 text-sm text-slate-400">{labels?.supported || "Supported: JPG, PNG, PDF"}</p>
            </>
          )}
        </div>

        {step === 'DETAILS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">{labels?.name || "Full Name"}</label>
                <input
                  type="text"
                  value={details.name}
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  className={`mt-1 w-full rounded-md border ${errors.name ? 'border-red-300' : 'border-slate-300'} p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                  placeholder={placeholders?.name || "Enter your name"}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">{labels?.phone || "Phone Number"}</label>
                <input
                  type="tel"
                  value={details.phone}
                  onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                  className={`mt-1 w-full rounded-md border ${errors.phone ? 'border-red-300' : 'border-slate-300'} p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                  placeholder={placeholders?.phone || "e.g. +9779812345678"}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">{labels?.address || "Address"}</label>
              <input
                type="text"
                value={details.address}
                onChange={(e) => setDetails({ ...details, address: e.target.value })}
                className={`mt-1 w-full rounded-md border ${errors.address ? 'border-red-300' : 'border-slate-300'} p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                placeholder={placeholders?.address || "Street, City, District"}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">{labels?.email || "Email (optional)"}</label>
              <input
                type="email"
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                className={`mt-1 w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-slate-300'} p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue`}
                placeholder={placeholders?.email || "you@example.com"}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
        )}

        {uploadStatus === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center justify-center gap-2">
            <span>{messages?.success || "Prescription uploaded successfully! We will contact you shortly."}</span>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-3">
            {step === 'SELECT' && (
              <button
                onClick={handleNext}
                disabled={!file}
                className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  !file
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-brand-blue text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {labels?.next || "Next"}
              </button>
            )}
            {step === 'DETAILS' && (
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  !file || isUploading
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-brand-blue text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isUploading ? (labels?.uploading || "Uploading...") : (labels?.submit || "Submit Prescription")}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-500">
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 font-bold">1</div>
          <p>{messages?.steps?.step1 || "Upload clear image"}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 font-bold">2</div>
          <p>{messages?.steps?.step2 || "Pharmacist verifies"}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 font-bold">3</div>
          <p>{messages?.steps?.step3 || "Delivery to Doorstep"}</p>
        </div>
      </div>
    </div>
  );
};

const Pharmacy: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const { data: pageData } = usePageContent('pharmacy');
  const heroBlock = pageData?.content?.find(b => b.type === 'hero_section');
  const featuresBlock = pageData?.content?.find(b => b.type === 'features_list');
  const comingSoonBlock = pageData?.content?.find(b => b.type === 'coming_soon_section');
  const uploadBlock = pageData?.content?.find(b => b.type === 'upload_section');

  const uploadProps = {
    title: uploadBlock?.data?.title,
    subtitle: uploadBlock?.data?.description,
    labels: uploadBlock?.data?.labels,
    placeholders: uploadBlock?.data?.placeholders,
    messages: uploadBlock?.data?.messages
  };
  
  const heroImg = heroBlock?.data?.image 
    ? resolveSrc(heroBlock.data.image) 
    : 'https://plus.unsplash.com/premium_photo-1661405904187-b701d10b6e37?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0';

  const scrollToUpload = () => {
    const element = document.getElementById('upload-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView('UPLOAD');
    }
  };

  const renderIcon = (iconName: string) => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className="h-6 w-6" /> : <Heart className="h-6 w-6" />;
  };

  const ComingSoonSection = ({ isPage = false }: { isPage?: boolean }) => {
    const title = comingSoonBlock?.data?.title || "Online Pharmacy Store Coming Soon";
    const description = comingSoonBlock?.data?.description || "We are building a comprehensive digital pharmacy experience. Soon you will be able to browse thousands of OTC medicines, wellness products, and medical devices directly from our app.";
    const features = comingSoonBlock?.data?.features || [
      { title: 'Complete Range', description: 'Access to a full inventory of prescription and OTC medications.', icon: 'pill', color: 'bg-blue-50 text-blue-600' },
      { title: '100% Authentic', description: 'Directly sourced from authorized distributors with quality assurance.', icon: 'shield-check', color: 'bg-green-50 text-green-600' },
      { title: 'Express Delivery', description: 'Fast doorstep delivery with real-time tracking integration.', icon: 'truck', color: 'bg-orange-50 text-orange-600' }
    ];

    return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center ${isPage ? 'py-16' : 'py-24'}`}>
      {isPage && (
        <div className="absolute top-4 left-4">
          <button onClick={() => setView('HOME')} className="text-slate-500 hover:text-brand-blue font-semibold">← Back to Home</button>
        </div>
      )}
      <div className="bg-blue-50 p-8 rounded-full mb-8 ring-8 ring-blue-50/50">
        <Store className="w-20 h-20 text-brand-blue" />
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
        {title.includes('Coming Soon') ? (
            <>
                {title.replace(' Coming Soon', '')} <span className="text-brand-blue">Coming Soon</span>
            </>
        ) : title}
      </h2>
      <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        {features.map((feature: any, idx: number) => (
          <div key={idx} className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${feature.color || 'bg-blue-50 text-blue-600'}`}>
               {renderIcon(feature.icon)} 
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-500">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-900 text-white rounded-2xl p-8 max-w-3xl w-full flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="text-left">
          <h4 className="text-xl font-bold mb-1">Need Medicine Urgently?</h4>
          <p className="text-slate-300">You can still upload your prescription for immediate processing.</p>
        </div>
        <button
          onClick={isPage ? () => setView('UPLOAD') : scrollToUpload}
          className="px-6 py-3 bg-brand-blue hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap shadow-lg"
        >
          Upload Prescription
        </button>
      </div>
    </div>
  );
  };

  const HomeView = () => {
    const featuresTitle = featuresBlock?.data?.title || "A better way to get your healthcare";
    const featuresSubtitle = featuresBlock?.data?.subtitle || "Why Choose Us";
    const featuresList = featuresBlock?.data?.features || [
        { title: 'Pharmacist Verified', description: 'Every order is reviewed by a licensed pharmacist for safety and interactions.', icon: 'stethoscope' },
        { title: 'Fast Delivery', description: 'Quick home delivery within Kathmandu Valley and express options for nearby districts.', icon: 'truck' },
        { title: 'EasyCare 365', description: 'Automated refills for chronic conditions so you never run out of medicine.', icon: 'pill' }
    ];

    return (
    <div>
      <div className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className="bg-brand-blue p-2 rounded-lg mr-2">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <span className="font-bold text-2xl text-slate-800 tracking-tight">Easy<span className="text-brand-blue">Health</span></span>
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                  {heroBlock?.data?.title ? (
                    heroBlock.data.title
                  ) : (
                    <>
                      <span className="block xl:inline">Medicines, delivered</span>{' '}
                      <span className="block text-brand-blue xl:inline">safely to your doorstep.</span>
                    </>
                  )}
                </h1>
                <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {heroBlock?.data?.description || "Easy Health Care connects you to licensed pharmacies for fast, verified, and safe medicine delivery. Upload your prescription or shop OTC essentials today."}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button onClick={scrollToUpload} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue hover:bg-blue-700 md:py-4 md:text-lg transition-all">
                      Upload Prescription
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button onClick={() => setView('SHOP')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-blue bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg transition-all">
                      Shop Medicines
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={heroImg}
            alt="Online pharmacy ordering on device"
            loading="eager"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/pharmacy/1600/900'; }}
          />
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-base text-primary-600 font-semibold tracking-wide uppercase">{featuresSubtitle}</p>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {featuresTitle}
            </h3>
          </div>
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {featuresList.map((feature: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-blue text-white">
                  {renderIcon(feature.icon)}
                </div>
                <dt className="mt-4 text-lg leading-6 font-medium text-slate-900">{feature.title}</dt>
                <dd className="mt-2 text-base text-slate-500">
                  {feature.description}
                </dd>
              </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 border-t border-slate-200">
        <ComingSoonSection />
      </div>

      <div id="upload-section" className="bg-slate-50 pb-24 px-4">
        <PrescriptionUpload {...uploadProps} />
      </div>
    </div>
  );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {view === 'HOME' && <HomeView />}
        {view === 'SHOP' && (
          <div className="relative min-h-[60vh] flex items-center justify-center">
            <ComingSoonSection isPage={true} />
          </div>
        )}
        {view === 'UPLOAD' && (
          <div className="relative">
            <div className="absolute top-4 left-4 z-10">
              <button onClick={() => setView('HOME')} className="text-slate-500 hover:text-brand-blue font-semibold">← Back to Home</button>
            </div>
            <PrescriptionUpload {...uploadProps} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmacy;
