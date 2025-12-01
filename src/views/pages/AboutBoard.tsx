import React from 'react';

const AboutBoard: React.FC = () => {
  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray-900">Board of Director</h1>
        <p className="mt-4 text-brand-gray-700 max-w-3xl">
          Meet our board providing strategic oversight and accountability. This section can be populated
          with profiles, photos, and bios of board members. Let me know the content source and format you prefer
          (CMS, static JSON, or markdown), and I’ll wire it up.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards to be replaced with real data */}
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="border rounded-lg p-4 shadow-sm">
            <div className="h-32 bg-gray-100 rounded-md mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold">Director Name {i}</h3>
            <p className="text-sm text-brand-gray-600">Brief bio or role description goes here.</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default AboutBoard;