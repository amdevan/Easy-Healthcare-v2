import React, { useEffect, useState } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { listBoardMembers, type BoardMemberDto } from '@/controllers/api';

type Member = BoardMemberDto;

const BoardMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listBoardMembers({ active: true, per_page: 100 });
      setMembers(res.data || []);
    } catch (e: any) {
      try {
        const agg = await fetch('/api/frontend');
        const aj = await agg.json();
        const list: Member[] = aj.boardMembers || [];
        setMembers(list);
      } catch {
        setMembers([]);
        setError('Failed to load Board Members');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resolveImage = (m: any) => {
    const viaBackend = m.photo_url as string | undefined;
    if (viaBackend && viaBackend.length > 0) return viaBackend;
    const p = (m.photo_path as string | undefined) || '';
    return p.startsWith('http') ? p : p ? `/storage/${p}` : 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=400&h=500';
  };

  return (
    <div className="py-24 bg-white" id="board-members">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-brand-blue font-bold tracking-wide uppercase text-sm mb-3">Leadership</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Board of Directors</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Guided by experienced leaders committed to healthcare accessibility, quality, and patient satisfaction.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] rounded-2xl bg-gray-100 mb-6" />
                <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">No board members found</div>
            ) : members.map((member) => (
              <div key={member.id} className="group relative flex flex-col">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-6 relative">
                  <img
                    src={resolveImage(member)}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = resolveImage(member); }}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkBlue/90 via-brand-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {member.email ? (
                        <a href={`mailto:${member.email}`} className="hover:text-brand-yellow transition-colors p-2 hover:bg-white/10 rounded-full"><Mail className="w-5 h-5" /></a>
                      ) : null}
                      <a href="#" className="hover:text-brand-yellow transition-colors p-2 hover:bg-white/10 rounded-full"><Linkedin className="w-5 h-5" /></a>
                      <a href="#" className="hover:text-brand-yellow transition-colors p-2 hover:bg-white/10 rounded-full"><Twitter className="w-5 h-5" /></a>
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-brand-blue font-medium mb-3">{member.role}</p>
                <div
                  className="text-gray-500 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: member.bio ?? '' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardMembers;
