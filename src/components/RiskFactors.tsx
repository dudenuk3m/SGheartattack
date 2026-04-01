import { motion, animate } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

function AnimatedPct({ target }: { target: number }) {
  const [value, setValue] = useState('0');
  const ref = useRef(null);
  
  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.5,
      onUpdate(v) { setValue(Math.round(v).toString()); }
    });
    return () => controls.stop();
  }, [target]);

  return <span ref={ref}>{value}%</span>;
}

export default function RiskFactors() {
  return (
    <section id="risk" className="px-8 md:px-20 py-15 md:py-25 relative bg-paper text-ink border-t border-rule/10 light">
      <div className="font-mono text-[9px] tracking-[0.28em] uppercase flex items-center gap-4 mb-5 text-red after:content-[''] after:flex-[0_0_40px] after:h-[1px] after:bg-current after:opacity-40">
        03 — Risk Factors
      </div>
      <h2 className="font-serif text-[clamp(36px,5vw,62px)] leading-[0.95] tracking-[-0.01em] mb-3.5 text-ink">
        The modifiable burden
      </h2>
      <p className="font-sans italic text-[clamp(15px,1.6vw,18px)] leading-[1.65] max-w-[560px] mb-12 text-muted">
        Most heart attacks in Singapore are preventable. These are the co-morbidities found in admitted MI patients — each of which is modifiable with earlier intervention.
      </p>

      <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-3 md:grid-cols-5 gap-2.5 my-5">
        {[
          { name: 'Hypertension', pct: 84, color: 'var(--color-red)', bg: '#B01A1A' },
          { name: 'Dyslipidemia', pct: 63, color: 'var(--color-amber)', bg: '#B5651D' },
          { name: 'Diabetes', pct: 55, color: '#5A8ABE', bg: '#2A4A6A' },
          { name: 'Obesity', pct: 42, color: 'var(--color-teal)', bg: '#2A6B5A' },
          { name: 'Smoking', pct: 37, color: 'var(--color-muted)', bg: '#5A4E3C' }
        ].map((r, i) => (
          <div key={i} className="card border border-rule/12 p-4.5 text-center transition-all duration-250 hover:border-rule/30 cursor-default relative overflow-hidden bg-black/5">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${r.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute bottom-0 left-0 right-0 opacity-12"
              style={{ backgroundColor: r.bg }}
            />
            <span className="font-serif text-[32px] font-black block mb-1" style={{ color: r.color }}>
              <AnimatedPct target={r.pct} />
            </span>
            <div className="font-mono text-[8px] tracking-[0.12em] uppercase text-muted">{r.name}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-9">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted mb-4">Risk factor prevalence — MI patients vs general population</div>
          <div className="relative w-full h-[260px]">
            <Bar
              data={{
                labels: ['Hypertension','Dyslipidemia','Diabetes','Obesity','Smoking'],
                datasets: [
                  { label: 'MI patients', data: [84,63,55,42,37], backgroundColor: 'rgba(176,26,26,.72)', borderRadius: 2 },
                  { label: 'General population', data: [24,36,14,38,10], backgroundColor: 'rgba(42,74,106,.55)', borderRadius: 2 }
                ]
              }}
              options={{
                responsive: true, maintainAspectRatio: false, indexAxis: 'y',
                scales: {
                  x: { grid: { color: 'rgba(0,0,0,.06)' }, ticks: { color: 'rgba(90,78,60,.7)' }, max: 100 },
                  y: { grid: { display: false }, ticks: { color: 'rgba(90,78,60,.7)', font: { size: 10 } } }
                },
                plugins: {
                  legend: { display: true, labels: { color: 'rgba(90,78,60,.7)', boxWidth: 12, padding: 14, font: { size: 10 } } },
                  tooltip: { backgroundColor: '#F5F0E8', titleColor: '#0F0E0C', bodyColor: '#5A4E3C', borderColor: 'rgba(0,0,0,.1)', borderWidth: 1, callbacks: { label: (v: any) => `${v.dataset.label}: ${v.raw}%` } }
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted mb-5">Age at onset — by sex</div>
          <div className="flex justify-center gap-5 text-[12px] text-muted mb-3">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-[#6B5A8B] inline-block" />Female</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-red inline-block" />Male</span>
          </div>
          
          <div className="flex flex-col gap-1.5">
            {[
              { age: '75+', fw: '88%', mw: '72%' },
              { age: '65–74', fw: '70%', mw: '85%' },
              { age: '55–64', fw: '42%', mw: '68%' },
              { age: '45–54', fw: '22%', mw: '38%' },
              { age: '<45', fw: '10%', mw: '16%' }
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1 h-[14px] flex justify-end overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: row.fw }} viewport={{ once: true }} transition={{ duration: 1.3, delay: 0.4, ease: [0.4, 0, 0.2, 1] }} className="h-full bg-[#6B5A8B]" />
                </div>
                <div className="font-mono text-[9px] text-ghost w-[46px] text-center shrink-0">{row.age}</div>
                <div className="flex-1 h-[14px] overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: row.mw }} viewport={{ once: true }} transition={{ duration: 1.3, delay: 0.4, ease: [0.4, 0, 0.2, 1] }} className="h-full bg-red" />
                </div>
              </div>
            ))}
          </div>

          <div className="border-l-[2.5px] border-l-red px-6 py-4 my-6">
            <p className="font-serif italic text-[clamp(17px,2vw,22px)] leading-[1.5] mb-2 text-ink">
              Males present 13 years earlier on average. The 65.1 vs 78.4 year median age gap suggests women's protective effect from oestrogen is real — but transient.
            </p>
            <cite className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted not-italic">SMIR 2020 · National Heart Centre Singapore</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
