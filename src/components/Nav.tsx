import { useState, useEffect } from 'react';

const sections = ['hero', 'burden', 'ethnicity', 'risk', 'survival', 'projections'];

export default function Nav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const cy = window.innerHeight / 2;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= cy && r.bottom > cy) {
            setActive(id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[900] bg-ink/92 backdrop-blur-md border-b border-rule/12 px-6 md:px-12 h-[52px] flex items-center justify-between">
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ghost">SG Cardiac Report · 2024</div>
      <div className="hidden md:flex gap-[2px]">
        {sections.map(id => (
          <a
            key={id}
            href={`#${id}`}
            className={`font-mono text-[9px] tracking-[0.15em] uppercase px-3.5 py-1.5 border border-transparent transition-colors duration-200 ${active === id ? 'text-red border-red/35' : 'text-ghost hover:text-paper hover:border-rule/25'}`}
          >
            {id === 'hero' ? 'Overview' : id === 'risk' ? 'Risk Factors' : id === 'projections' ? 'Outlook' : id}
          </a>
        ))}
      </div>
    </nav>
  );
}
