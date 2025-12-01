import React from 'react';

const ManagementTeam: React.FC = () => {
  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-gray-900">Management Team</h1>
        <p className="mt-4 text-brand-gray-700 max-w-3xl">
          Our leadership team drives execution across clinical, digital, operations, and partnerships.
          Replace this placeholder with real team profiles, roles, and responsibilities.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="border rounded-lg p-4 shadow-sm">
            <div className="h-32 bg-gray-100 rounded-md mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold">Leader Name {i}</h3>
            <p className="text-sm text-brand-gray-600">Role and short bio snippet.</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ManagementTeam;