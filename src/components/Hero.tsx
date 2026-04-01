import { motion, animate } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

function Counter({ target, suffix = '', decimals = 0 }: { target: number, suffix?: string, decimals?: number }) {
  const [value, setValue] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.5,
      onUpdate(v) {
        setValue(v.toFixed(decimals));
      }
    });
    return () => controls.stop();
  }, [target, decimals]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-end px-8 md:px-20 py-20 relative overflow-hidden">
      <div className="hero-grid-bg absolute inset-0" />
      <div className="hero-scanline absolute left-0 right-0 h-[1px]" />

      <div className="relative z-10">
        <div className="font-mono text-[9px] tracking-[0.28em] uppercase text-ghost mb-5 flex items-center gap-5 before:content-[''] before:w-8 before:h-[1px] before:bg-red">
          Singapore Heart Attack Statistics 2024 — An Interactive Data Report
        </div>
        <h1 className="font-serif text-[clamp(56px,8vw,108px)] leading-[0.92] tracking-[-0.02em] text-paper mb-2">
          Thirty-one<br /><em className="text-red not-italic font-serif">hearts each day.</em>
        </h1>
        <p className="font-sans italic text-[clamp(16px,1.8vw,22px)] text-ghost max-w-[500px] leading-relaxed mb-12">
          A data portrait of Singapore's cardiac crisis — who it strikes, the ethnic fault lines, and the projections that make it urgent.
        </p>

        <div className="flex flex-col md:flex-row gap-5 md:gap-0 border-t border-rule/15 pt-8">
          <div className="flex-1 md:pr-8 md:border-r border-rule/10 md:mr-8 pb-5 md:pb-0 border-b md:border-b-0">
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-1">Heart attacks per day</div>
            <div className="font-serif text-[clamp(36px,5vw,56px)] leading-none text-red mb-1">
              <Counter target={31} suffix="/day" />
            </div>
            <div className="text-[13px] text-muted leading-relaxed">11,631 cases recorded in 2020 (Singapore Myocardial Infarction Registry)</div>
          </div>
          <div className="flex-1 md:pr-8 md:border-r border-rule/10 md:mr-8 pb-5 md:pb-0 border-b md:border-b-0">
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-1">30-day case fatality</div>
            <div className="font-serif text-[clamp(36px,5vw,56px)] leading-none text-paper mb-1">
              <Counter target={9.2} suffix="%" decimals={1} />
            </div>
            <div className="text-[13px] text-muted leading-relaxed">Down from 12.1% in 2010 — but females still face higher rates than males</div>
          </div>
          <div className="flex-1 md:pr-8 md:border-r border-rule/10 md:mr-8 pb-5 md:pb-0 border-b md:border-b-0">
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-1">Share of all SG deaths</div>
            <div className="font-serif text-[clamp(36px,5vw,56px)] leading-none text-amber mb-1">
              <Counter target={30.5} suffix="%" decimals={1} />
            </div>
            <div className="text-[13px] text-muted leading-relaxed">Cardiovascular disease remains Singapore's leading cause of death cluster</div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ghost mb-1">Median age at onset</div>
            <div className="font-serif text-[clamp(36px,5vw,56px)] leading-none text-paper mb-1">
              <Counter target={69.9} suffix=" yrs" decimals={1} />
            </div>
            <div className="text-[13px] text-muted leading-relaxed">Males present earlier (65.1 yrs) than females (78.4 yrs) on average</div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 font-mono text-[8px] tracking-[0.18em] uppercase text-ghost"
      >
        <div className="scroll-arrow" />
        Explore
      </motion.div>
    </section>
  );
}
