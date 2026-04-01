import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Line, Bar } from 'react-chartjs-2';

export default function Burden() {
  const [activeTab, setActiveTab] = useState('annual');

  const personGrid = useMemo(() => {
    const types = [...Array(9).fill('dead'), ...Array(15).fill('dis'), ...Array(76).fill('ok')];
    for (let i = types.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [types[i], types[j]] = [types[j], types[i]];
    }
    return types;
  }, []);

  const cols: Record<string, string> = { dead: '#B01A1A', dis: '#B5651D', ok: '#2A6B5A' };

  return (
    <section id="burden" className="px-8 md:px-20 py-15 md:py-25 relative bg-[#141210] border-t border-rule/10">
      <div className="font-mono text-[9px] tracking-[0.28em] uppercase flex items-center gap-4 mb-5 text-red after:content-[''] after:flex-[0_0_40px] after:h-[1px] after:bg-current after:opacity-40">
        01 — Incidence & Burden
      </div>
      <h2 className="font-serif text-[clamp(36px,5vw,62px)] leading-[0.95] tracking-[-0.01em] mb-3.5 text-paper">
        The scale of the problem
      </h2>
      <p className="font-sans italic text-[clamp(15px,1.6vw,18px)] leading-[1.65] max-w-[560px] mb-12 text-ghost">
        Singapore's heart attack incidence has risen 58% since 2010. Each data point in the visualisations below represents a real patient pathway.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-9">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-3">Each figure = 1% of 100 MI patients admitted</div>
          <div className="grid grid-cols-[repeat(25,1fr)] gap-[3px] mb-2">
            {personGrid.map((t, i) => (
              <div key={i} className="aspect-[1/1.4]">
                <svg viewBox="0 0 14 20" fill={cols[t]} className="w-full h-full block">
                  <circle cx="7" cy="5" r="3.5" />
                  <path d="M1 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                </svg>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-2 text-[13px] text-ghost">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red rounded-[1px]" />Die ≤30 days (~9)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber rounded-[1px]" />Significant disability (~15)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-teal rounded-[1px]" />Functional recovery (~76)</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex gap-1 mb-7 border-b border-rule/12">
            {[
              { id: 'annual', label: 'Annual cases' },
              { id: 'cfr', label: 'Fatality rate' },
              { id: 'daily', label: 'Daily admissions' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-[9px] tracking-[0.15em] uppercase px-4.5 py-2.5 bg-transparent border-none transition-colors duration-200 border-b-2 -mb-[1px] ${activeTab === tab.id ? 'text-paper border-red' : 'text-ghost border-transparent hover:text-paper'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full h-[240px]">
            {activeTab === 'annual' && (
              <Line
                data={{
                  labels: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'],
                  datasets: [{
                    label: 'Annual MI Cases',
                    data: [7344,7680,7920,8210,8510,8890,9340,9820,10280,10890,11631],
                    borderColor: '#B01A1A', backgroundColor: 'rgba(176,26,26,.08)',
                    tension: 0.4, fill: true, pointBackgroundColor: '#B01A1A',
                    pointRadius: 3, pointHoverRadius: 6
                  }]
                }}
                options={{
                  responsive: true, maintainAspectRatio: false,
                  scales: {
                    x: { grid: { color: 'rgba(200,184,154,.06)' }, ticks: { color: 'rgba(200,184,154,.45)' } },
                    y: { grid: { color: 'rgba(200,184,154,.06)' }, ticks: { color: 'rgba(200,184,154,.45)' } }
                  },
                  plugins: { tooltip: { backgroundColor: '#141210', titleColor: '#EDE4CC', bodyColor: 'rgba(200,184,154,.7)', borderColor: 'rgba(200,184,154,.2)', borderWidth: 1 } }
                }}
              />
            )}
            {activeTab === 'cfr' && (
              <Line
                data={{
                  labels: ['2010','2012','2014','2016','2018','2020'],
                  datasets: [
                    { label: 'Overall', data: [12.1,11.6,10.9,10.2,9.8,9.2], borderColor: '#D4952A', backgroundColor: 'rgba(212,149,42,.08)', tension: 0.4, fill: true, pointRadius: 3, pointHoverRadius: 6 },
                    { label: 'Male', data: [11.2,10.7,9.9,9.3,8.8,8.5], borderColor: '#5A8ABE', backgroundColor: 'transparent', tension: 0.4, pointRadius: 2, pointHoverRadius: 5, borderDash: [4,3] },
                    { label: 'Female', data: [15.8,15.1,14.3,13.6,12.9,12.2], borderColor: '#B01A1A', backgroundColor: 'transparent', tension: 0.4, pointRadius: 2, pointHoverRadius: 5, borderDash: [4,3] }
                  ]
                }}
                options={{
                  responsive: true, maintainAspectRatio: false,
                  scales: {
                    x: { grid: { color: 'rgba(200,184,154,.06)' }, ticks: { color: 'rgba(200,184,154,.45)' } },
                    y: { grid: { color: 'rgba(200,184,154,.06)' }, ticks: { color: 'rgba(200,184,154,.45)' }, title: { display: true, text: 'CFR %', color: 'rgba(200,184,154,.4)' } }
                  },
                  plugins: {
                    legend: { display: true, labels: { color: 'rgba(200,184,154,.6)', boxWidth: 12, padding: 16, font: { size: 10 } } },
                    tooltip: { backgroundColor: '#141210', titleColor: '#EDE4CC', bodyColor: 'rgba(200,184,154,.7)', borderColor: 'rgba(200,184,154,.2)', borderWidth: 1 }
                  }
                }}
              />
            )}
            {activeTab === 'daily' && (
              <Bar
                data={{
                  labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                  datasets: [{ data: [34,32,31,30,33,26,24], backgroundColor: ['rgba(176,26,26,.7)','rgba(176,26,26,.6)','rgba(176,26,26,.55)','rgba(176,26,26,.5)','rgba(176,26,26,.65)','rgba(181,101,29,.5)','rgba(181,101,29,.45)'], borderRadius: 2 }]
                }}
                options={{
                  responsive: true, maintainAspectRatio: false,
                  scales: {
                    x: { grid: { display: false }, ticks: { color: 'rgba(200,184,154,.45)' } },
                    y: { grid: { color: 'rgba(200,184,154,.06)' }, ticks: { color: 'rgba(200,184,154,.45)' }, title: { display: true, text: 'Admissions', color: 'rgba(200,184,154,.4)' } }
                  },
                  plugins: { tooltip: { backgroundColor: '#141210', titleColor: '#EDE4CC', bodyColor: 'rgba(200,184,154,.7)', borderColor: 'rgba(200,184,154,.2)', borderWidth: 1, callbacks: { label: (v: any) => `${v.raw} avg admissions/day` } } }
                }}
              />
            )}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { label: 'Annual cases 2020', val: '11,631', desc: 'Up from 7,344 in 2010', accent: 'var(--color-red)', valColor: 'var(--color-paper)' },
          { label: 'Per 100,000 population', val: '201.3', desc: 'Age-standardised incidence rate', accent: '#D4952A', valColor: '#D4952A' },
          { label: '% rise since 2010', val: '+58%', desc: 'Absolute case volume increase', accent: 'var(--color-teal)', valColor: 'var(--color-paper)' },
          { label: 'STEMI vs NSTEMI', val: '47/53', desc: '% split; NSTEMI now majority', accent: 'var(--color-steel)', valColor: 'var(--color-paper)' }
        ].map((c, i) => (
          <div key={i} className="card group bg-white/5 border border-rule/10 p-6 transition-all duration-250 hover:border-rule/25 hover:bg-white/10 hover:-translate-y-0.5 relative overflow-hidden" style={{ '--accent': c.accent } as any}>
            <div className="font-mono text-[8.5px] tracking-[0.18em] uppercase mb-1.5 text-ghost">{c.label}</div>
            <span className="font-serif text-[clamp(44px,7vw,72px)] leading-none font-black block mb-1.5" style={{ color: c.valColor }}>{c.val}</span>
            <div className="text-[13px] leading-[1.6] text-ghost">{c.desc}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
