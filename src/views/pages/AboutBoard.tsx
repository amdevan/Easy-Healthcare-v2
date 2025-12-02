import React from 'react';
import Hero from '../../../vendor/board-of-director/components/Hero';
import BoardMembers from '../../../vendor/board-of-director/components/BoardMembers';
import Governance from '../../../vendor/board-of-director/components/Governance';

const AboutBoard: React.FC = () => {
  return (
    <main className="bg-white">
      <Hero />
      <section id="board-members" className="scroll-mt-10">
        <BoardMembers />
      </section>
      <section id="governance">
        <Governance />
      </section>
    </main>
  );
};

export default AboutBoard;
