import { motion } from 'motion/react';
import { Line, Bar } from 'react-chartjs-2';

export default function Projections() {
  return (
    <section id="projections" className="px-8 md:px-20 py-15 md:py-25 relative bg-[#141210] border-t border-rule/10">
      <div className="font-mono text-[9px] tracking-[0.28em] uppercase flex items-center gap-4 mb-5 text-[#D4952A] after:content-[''] after:flex-[0_0_40px] after:h-[1px] after:bg-current after:opacity-40">
        05 — Outlook to 2050
      </div>
      <h2 className="font-serif text-[clamp(36px,5vw,62px)] leading-[0.95] tracking-[-0.01em] mb-3.5 text-paper">
        The numbers ahead are worse
      </h2>
      <p className="font-sans italic text-[clamp(15px,1.6vw,18px)] leading-[1.65] max-w-[560px] mb-12 text-ghost">
        Lancet Regional Health modelling (2023) projects Singapore's MI incidence to rise dramatically by 2050 — driven not by ageing alone, but by the compounding of obesity, diabetes, and hypertension rates.
      </p>

      <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-2 md:grid-cols-4 gap-[3px] bg-rule/10 my-5">
        {[
          { val: '+194%', label: 'MI incidence rise', desc: '482 → 1,418 per 100,000 by 2050', color: 'var(--color-red)' },
          { val: '+880%', label: 'Obesity attributable', desc: 'Largest single driver of projected increase', color: '#D4952A' },
          { val: '+249%', label: 'Hypertension burden', desc: 'Driven by ageing + dietary sodium', color: '#5A8ABE' },
          { val: '$8.1B', label: 'CVD economic burden', desc: 'USD per year — current annual cost', color: 'var(--color-teal)' }
        ].map((p, i) => (
          <div key={i} className="bg-[#141210] p-5 text-center">
            <span className="font-serif text-[36px] font-black block leading-none mb-1" style={{ color: p.color }}>{p.val}</span>
            <div className="font-mono text-[7.5px] tracking-[0.12em] uppercase text-ghost mb-1">{p.label}</div>
            <div className="text-[12px] leading-[1.5] text-[#4A4038]">{p.desc}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-4">Projected MI burden trajectory — 2020–2050</div>
          <div className="relative w-full h-[240px]">
            <Line
              data={{
                labels: ['2020','2025','2030','2035','2040','2045','2050'],
                datasets: [
                  { label: 'Baseline scenario', data: [482,540,620,730,880,1080,1418], borderColor: '#B01A1A', backgroundColor: 'rgba(176,26,26,.1)', fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 6 },
                  { label: 'Optimistic (intervention)', data: [482,510,560,610,660,700,740], borderColor: '#2A6B5A', backgroundColor: 'transparent', tension: 0.4, borderDash: [5,3], pointRadius: 2, pointHoverRadius: 5 }
                ]
              }}
              options={{
                responsive: true, maintainAspectRatio: false,
                scales: {
                  x: { grid: { color: 'rgba(200,184,154,.06)' }, ticks: { color: 'rgba(200,184,154,.45)' } },
                  y: { grid: { color: 'rgba(200,184,154,.06)' }, ticks: { color: 'rgba(200,184,154,.45)' }, title: { display: true, text: 'Per 100,000', color: 'rgba(200,184,154,.4)' } }
                },
                plugins: {
                  legend: { display: true, labels: { color: 'rgba(200,184,154,.6)', boxWidth: 12, padding: 14, font: { size: 10 } } },
                  tooltip: { backgroundColor: '#141210', titleColor: '#EDE4CC', bodyColor: 'rgba(200,184,154,.7)', borderColor: 'rgba(200,184,154,.2)', borderWidth: 1 }
                }
              }}
            />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-4">Comorbidity burden projection</div>
          <div className="relative w-full h-[240px]">
            <Bar
              data={{
                labels: ['Obesity','Hypertension','Diabetes','Dyslipidemia','Smoking'],
                datasets: [
                  { label: '2020 %', data: [38,24,14,36,10], backgroundColor: 'rgba(42,74,106,.5)', borderRadius: 2 },
                  { label: '2050 projected %', data: [50,60,38,54,8], backgroundColor: 'rgba(176,26,26,.65)', borderRadius: 2 }
                ]
              }}
              options={{
                responsive: true, maintainAspectRatio: false,
                scales: {
                  x: { grid: { display: false }, ticks: { color: 'rgba(200,184,154,.4)', font: { size: 9 } } },
                  y: { grid: { color: 'rgba(200,184,154,.06)' }, ticks: { color: 'rgba(200,184,154,.4)' }, max: 80 }
                },
                plugins: {
                  legend: { display: true, labels: { color: 'rgba(200,184,154,.6)', boxWidth: 12, padding: 14, font: { size: 10 } } },
                  tooltip: { backgroundColor: '#141210', titleColor: '#EDE4CC', bodyColor: 'rgba(200,184,154,.7)', borderColor: 'rgba(200,184,154,.2)', borderWidth: 1 }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className="border-l-[2.5px] border-l-red px-6 py-4 mt-10">
        <p className="font-serif italic text-[clamp(17px,2vw,22px)] leading-[1.5] mb-2 text-paper">
          "Singapore's cardiac future is not written. The projections assume current trends persist — but hypertension control, weight management, and earlier diabetes detection could substantially bend these curves."
        </p>
        <cite className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost not-italic">Lancet Regional Health — West Pacific, 2023 · National Heart Centre Singapore</cite>
      </div>
    </section>
  );
}
