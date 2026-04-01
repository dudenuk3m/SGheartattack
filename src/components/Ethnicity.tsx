import { motion } from 'motion/react';
import { Doughnut } from 'react-chartjs-2';

export default function Ethnicity() {
  return (
    <section id="ethnicity" className="px-8 md:px-20 py-15 md:py-25 relative border-t border-rule/10">
      <div className="font-mono text-[9px] tracking-[0.28em] uppercase flex items-center gap-4 mb-5 text-[#D4952A] after:content-[''] after:flex-[0_0_40px] after:h-[1px] after:bg-current after:opacity-40">
        02 — Ethnic Disparities
      </div>
      <h2 className="font-serif text-[clamp(36px,5vw,62px)] leading-[0.95] tracking-[-0.01em] mb-3.5 text-paper">
        Not all communities face the same risk
      </h2>
      <p className="font-sans italic text-[clamp(15px,1.6vw,18px)] leading-[1.65] max-w-[560px] mb-12 text-ghost">
        Singapore's ethnic diversity exposes a stark cardiac fault line. South Indians face three times the coronary heart disease risk of the Chinese baseline, driven by insulin resistance, abdominal obesity, and thrombogenic factors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-5">Relative coronary risk vs Chinese baseline</div>
          
          <div className="flex flex-col gap-4">
            {[
              { label: 'South Indians', mult: '3.0×', pct: '100%', color: 'var(--color-red)' },
              { label: 'Malays', mult: '2.0×', pct: '66%', color: '#D4952A' },
              { label: 'Chinese', mult: '1.0×', pct: '33%', color: 'var(--color-steel)' }
            ].map((eth, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="font-sans text-[15px] w-[120px] shrink-0">{eth.label}</div>
                <div className="flex-1 h-[22px] bg-white/5 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: eth.pct }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full flex items-center pl-2.5"
                    style={{ backgroundColor: eth.color }}
                  >
                    <span className="font-mono text-[11px] font-medium text-white/80 whitespace-nowrap">{eth.mult}</span>
                  </motion.div>
                </div>
                <div className="font-serif text-[22px] font-bold w-[60px] text-right shrink-0" style={{ color: eth.color }}>
                  {eth.mult.replace('.0', '')}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-red/5 border border-red/25 border-l-2 border-l-red p-5 mt-6">
            <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-red mb-2">Mechanism</div>
            <div className="text-[14px] leading-[1.75] text-ghost">
              Indians and Malays have higher rates of central adiposity at lower BMI thresholds, greater insulin resistance, and more atherogenic lipid profiles than Chinese at equivalent body weights. Singapore's Chinese-calibrated BMI cut-offs historically under-identified metabolic risk in these communities.
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-4">MI incidence breakdown by ethnicity</div>
          <div className="relative w-full h-[280px]">
            <Doughnut
              data={{
                labels: ['Chinese','Malay','Indian','Other'],
                datasets: [{
                  data: [62.4, 20.8, 13.1, 3.7],
                  backgroundColor: ['rgba(42,74,106,.75)','rgba(181,101,29,.75)','rgba(176,26,26,.75)','rgba(90,78,60,.5)'],
                  borderColor: ['rgba(42,74,106,.5)','rgba(181,101,29,.5)','rgba(176,26,26,.5)','rgba(90,78,60,.3)'],
                  borderWidth: 1, hoverOffset: 8
                }]
              }}
              options={{
                responsive: true, maintainAspectRatio: false, cutout: '62%',
                plugins: {
                  legend: { display: true, position: 'right', labels: { color: 'rgba(200,184,154,.65)', boxWidth: 12, padding: 14, font: { size: 10 } } },
                  tooltip: { backgroundColor: '#141210', titleColor: '#EDE4CC', bodyColor: 'rgba(200,184,154,.7)', borderColor: 'rgba(200,184,154,.2)', borderWidth: 1, callbacks: { label: (v: any) => `${v.label}: ${v.raw}% of MI cases` } }
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
