import React from 'react';
import Editable from '@/components/ui/Editable';
import { resolveSrc } from '@/utils/url';

interface DownloadAppProps {
  title?: string;
  description?: string;
  cta_text?: string;
  google_play_badge?: string;
  app_store_badge?: string;
  image?: string;
}

const DownloadApp: React.FC<DownloadAppProps> = ({ title, description, cta_text, google_play_badge, app_store_badge, image }) => {
  const googleBadge = google_play_badge ? resolveSrc(google_play_badge) : 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';
  const appleBadge = app_store_badge ? resolveSrc(app_store_badge) : 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg';
  const mockupSrc = image ? resolveSrc(image) : null;

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-cyan-50 rounded-2xl p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Editable tag="h2" id="download-app-title" className="text-4xl font-extrabold text-brand-gray-900">
                  {title || "Download the Easy Healthcare 101 App"}
              </Editable>
              <Editable tag="p" id="download-app-desc" className="mt-4 text-lg text-brand-gray-500">
                {description || "Access video consultation with top doctors on the Easy Healthcare 101 app. Connect with doctors online, available 24/7, from the comfort of your home."}
              </Editable>
              <div className="mt-8">
                <Editable tag="p" id="download-app-cta" className="font-semibold text-brand-gray-700">
                    {cta_text || "Get the link to download the app"}
                </Editable>
                <div className="mt-3 flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">+977</span>
                    <input type="tel" placeholder="Enter phone number" className="flex-1 w-full p-3 border border-gray-300 rounded-r-md focus:ring-brand-blue focus:border-brand-blue"/>
                  </div>
                  <button className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-md hover:bg-brand-blue-dark transition-colors whitespace-nowrap">Send SMS</button>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a href="#" className="inline-block"><img src={googleBadge} alt="Get it on Google Play" className="h-12"/></a>
                <a href="#" className="inline-block"><img src={appleBadge} alt="Download on the App Store" className="h-12"/></a>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
                {mockupSrc ? (
                    <img src={mockupSrc} alt="App Mockup" className="max-w-xs drop-shadow-2xl" />
                ) : (
                    <div className="w-64 h-auto bg-white p-4 rounded-3xl shadow-2xl transform -rotate-12">
                        <div className="bg-gray-100 h-full w-full rounded-2xl flex flex-col justify-center items-center">
                            <div className="w-16 h-16 bg-brand-cyan-light rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <p className="mt-2 font-bold text-brand-blue">Easy Healthcare</p>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
