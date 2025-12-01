import React from 'react';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import CoreValues from './components/CoreValues';
import Ecosystem from './components/Ecosystem';
import Impact from './components/Impact';
import FutureDirection from './components/FutureDirection';
import CTA from './components/CTA';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-slate-50">
      <main className="flex-grow">
        <Hero />
        <OurStory />
        <CoreValues />
        <Ecosystem />
        <Impact />
        <FutureDirection />
        <CTA />
      </main>
    </div>
  );
};

export default App;