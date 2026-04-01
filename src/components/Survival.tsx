import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Line } from 'react-chartjs-2';

const survivalData: Record<string, any> = {
  all: {
    label:'All patients', color:'#C8B89A',
    pts:[100, 50, 43, 37, 30, 28],
    stats:{ cfr30:'9.2%', medianAge:'69.9 yrs', stemiPct:'47%', malePct:'64%', incidence:'201.3', note:'Population-wide baseline' }
  },
  chinese: {
    label:'Chinese', color:'#5A8ABE',
    pts:[100, 52, 45, 39, 33, 30],
    stats:{ cfr30:'8.6%', medianAge:'71.2 yrs', stemiPct:'44%', malePct:'62%', incidence:'182.4', note:'Lowest risk ethnic group — baseline reference' }
  },
  chinese_male: {
    label:'Chinese — Male', color:'#7AAAD0',
    pts:[100, 50, 43, 37, 31, 28],
    stats:{ cfr30:'7.8%', medianAge:'68.4 yrs', stemiPct:'48%', malePct:'100%', incidence:'216.0', note:'Earlier presentation than Chinese females' }
  },
  chinese_female: {
    label:'Chinese — Female', color:'#3A6A9E',
    pts:[100, 56, 48, 42, 35, 32],
    stats:{ cfr30:'11.2%', medianAge:'77.1 yrs', stemiPct:'38%', malePct:'0%', incidence:'149.0', note:'Higher CFR despite lower incidence' }
  },
  malay: {
    label:'Malay', color:'#D4952A',
    pts:[100, 48, 41, 35, 28, 26],
    stats:{ cfr30:'9.8%', medianAge:'63.5 yrs', stemiPct:'52%', malePct:'67%', incidence:'248.6', note:'2× relative risk vs Chinese; younger onset' }
  },
  malay_male: {
    label:'Malay — Male', color:'#E8A840',
    pts:[100, 47, 40, 34, 27, 25],
    stats:{ cfr30:'9.1%', medianAge:'60.8 yrs', stemiPct:'56%', malePct:'100%', incidence:'298.4', note:'Youngest mean onset of all male subgroups' }
  },
  malay_female: {
    label:'Malay — Female', color:'#B57818',
    pts:[100, 52, 44, 38, 30, 28],
    stats:{ cfr30:'12.1%', medianAge:'70.2 yrs', stemiPct:'44%', malePct:'0%', incidence:'198.8', note:'Highest female CFR of any ethnic group' }
  },
  indian: {
    label:'Indian', color:'#B01A1A',
    pts:[100, 46, 38, 32, 25, 22],
    stats:{ cfr30:'10.4%', medianAge:'62.1 yrs', stemiPct:'54%', malePct:'70%', incidence:'312.8', note:'3× relative risk vs Chinese; highest burden' }
  },
  indian_male: {
    label:'Indian — Male', color:'#D42020',
    pts:[100, 45, 37, 31, 24, 21],
    stats:{ cfr30:'9.6%', medianAge:'59.4 yrs', stemiPct:'58%', malePct:'100%', incidence:'368.0', note:'Highest incidence of all subgroups' }
  },
  indian_female: {
    label:'Indian — Female', color:'#8A1010',
    pts:[100, 49, 40, 34, 26, 23],
    stats:{ cfr30:'13.8%', medianAge:'68.8 yrs', stemiPct:'46%', malePct:'0%', incidence:'257.6', note:'Highest CFR of all female subgroups' }
  },
  stemi: {
    label:'STEMI', color:'#B01A1A',
    pts:[100, 42, 36, 30, 24, 21],
    stats:{ cfr30:'11.8%', medianAge:'65.8 yrs', stemiPct:'100%', malePct:'68%', incidence:'—', note:'Full occlusion — higher acute mortality' }
  },
  nstemi: {
    label:'NSTEMI', color:'#D4952A',
    pts:[100, 58, 50, 43, 36, 33],
    stats:{ cfr30:'7.1%', medianAge:'71.2 yrs', stemiPct:'0%', malePct:'61%', incidence:'—', note:'Partial occlusion — better short-term survival' }
  },
  male: {
    label:'Male', color:'#5A8ABE',
    pts:[100, 51, 44, 38, 31, 29],
    stats:{ cfr30:'8.5%', medianAge:'65.1 yrs', stemiPct:'50%', malePct:'100%', incidence:'248.4', note:'Higher incidence, lower CFR than females' }
  },
  female: {
    label:'Female', color:'#B01A1A',
    pts:[100, 46, 39, 33, 26, 24],
    stats:{ cfr30:'12.2%', medianAge:'78.4 yrs', stemiPct:'42%', malePct:'0%', incidence:'156.2', note:'Later presentation; higher age-adjusted CFR' }
  }
};

const timeLabels = ['Onset','30 days','3 months','1 year','3 years','5 years'];

const survComp = [
  { key:'indian_male',   label:'Indian — Male',   val:45, color:'#D42020' },
  { key:'indian_female', label:'Indian — Female', val:49, color:'#8A1010' },
  { key:'malay_male',    label:'Malay — Male',    val:47, color:'#E8A840' },
  { key:'malay_female',  label:'Malay — Female',  val:52, color:'#B57818' },
  { key:'chinese_male',  label:'Chinese — Male',  val:50, color:'#7AAAD0' },
  { key:'chinese_female',label:'Chinese — Female',val:56, color:'#3A6A9E' },
];

export default function Survival() {
  const [currentEth, setCurrentEth] = useState('all');
  const [type, setType] = useState('all');
  const [sex, setSex] = useState('all');

  const primaryKey = useMemo(() => {
    let key = currentEth;
    if (sex !== 'all' && ['chinese','malay','indian'].includes(currentEth)) {
      const subKey = currentEth + '_' + sex;
      if (survivalData[subKey]) key = subKey;
    }
    if (type !== 'all' && key === 'all') key = type;
    if (sex !== 'all' && key === 'all') key = sex;
    return key;
  }, [currentEth, type, sex]);

  const d = survivalData[primaryKey] || survivalData.all;
  const parentMap: Record<string, string> = { chinese_male:'chinese', chinese_female:'chinese', malay_male:'malay', malay_female:'malay', indian_male:'indian', indian_female:'indian' };

  const datasets: any[] = [
    {
      label: d.label, data: d.pts,
      borderColor: d.color, backgroundColor: d.color + '22',
      fill: true, tension: 0.4,
      pointBackgroundColor: d.color, pointRadius: 4, pointHoverRadius: 7, pointBorderColor: '#141210', pointBorderWidth: 1.5
    }
  ];

  if (primaryKey !== 'all') {
    datasets.push({
      label: 'All patients (reference)', data: survivalData.all.pts,
      borderColor: 'rgba(200,184,154,.28)', backgroundColor: 'transparent',
      fill: false, tension: 0.4, pointRadius: 2, pointHoverRadius: 4, borderDash: [5, 3] as any,
      pointBackgroundColor: 'transparent', pointBorderColor: 'transparent', pointBorderWidth: 0
    });
  }

  if (parentMap[primaryKey]) {
    const parent = survivalData[parentMap[primaryKey]];
    datasets.push({
      label: parent.label + ' (group avg)', data: parent.pts,
      borderColor: parent.color + '80', backgroundColor: 'transparent',
      fill: false, tension: 0.4, pointRadius: 2, pointHoverRadius: 4, borderDash: [3, 4] as any,
      pointBackgroundColor: 'transparent', pointBorderColor: 'transparent', pointBorderWidth: 0
    });
  }

  const isEthRelated = ['chinese','chinese_male','chinese_female','malay','malay_male','malay_female','indian','indian_male','indian_female'].includes(primaryKey);

  return (
    <section id="survival" className="px-8 md:px-20 py-15 md:py-25 relative border-t border-rule/10">
      <div className="font-mono text-[9px] tracking-[0.28em] uppercase flex items-center gap-4 mb-5 text-teal after:content-[''] after:flex-[0_0_40px] after:h-[1px] after:bg-current after:opacity-40">
        04 — Outcomes & Survival
      </div>
      <h2 className="font-serif text-[clamp(36px,5vw,62px)] leading-[0.95] tracking-[-0.01em] mb-3.5 text-paper">
        Who lives, who doesn't
      </h2>
      <p className="font-sans italic text-[clamp(15px,1.6vw,18px)] leading-[1.65] max-w-[560px] mb-12 text-ghost">
        Select an ethnicity subgroup to see its survival curve against the population baseline. Further filter by MI type and sex. Statistics update live with every selection.
      </p>

      <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <div className="mb-6">
          <div className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-ghost mb-3">Ethnicity — select a subgroup</div>
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All groups' },
              { id: 'chinese', label: 'Chinese' },
              { id: 'chinese_male', label: 'Chinese — Male' },
              { id: 'chinese_female', label: 'Chinese — Female' },
              { id: 'malay', label: 'Malay' },
              { id: 'malay_male', label: 'Malay — Male' },
              { id: 'malay_female', label: 'Malay — Female' },
              { id: 'indian', label: 'Indian' },
              { id: 'indian_male', label: 'Indian — Male' },
              { id: 'indian_female', label: 'Indian — Female' }
            ].map(eth => (
              <button
                key={eth.id}
                onClick={() => setCurrentEth(eth.id)}
                className={`eth-pill font-mono text-[9px] tracking-[0.1em] uppercase px-3.5 py-1.5 bg-white/5 border transition-all duration-200 whitespace-nowrap ${currentEth === eth.id ? (eth.id.includes('chinese') ? 'text-paper border-[#5A8ABE] bg-[#5A8ABE]/15' : eth.id.includes('malay') ? 'text-paper border-[#D4952A] bg-[#D4952A]/15' : eth.id.includes('indian') ? 'text-paper border-red bg-red/15' : 'text-paper border-red bg-red/15') : 'text-ghost border-rule/15 hover:text-paper hover:border-rule/35 hover:bg-white/10'}`}
              >
                {eth.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 flex-wrap mb-6">
          <div className="flex flex-col gap-1.5">
            <div className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-ghost">MI type</div>
            <select value={type} onChange={e => setType(e.target.value)} className="font-mono text-[9px] tracking-[0.08em] bg-white/5 border border-rule/20 text-paper px-3 py-1.5 outline-none">
              <option value="all">All MI</option>
              <option value="stemi">STEMI</option>
              <option value="nstemi">NSTEMI</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-ghost">Sex</div>
            <select value={sex} onChange={e => setSex(e.target.value)} className="font-mono text-[9px] tracking-[0.08em] bg-white/5 border border-rule/20 text-paper px-3 py-1.5 outline-none">
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex items-end pb-0.5 ml-auto">
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-ghost">Viewing: <span className="text-paper">{d.label}</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="relative h-[300px] w-full">
            <Line
              data={{ labels: timeLabels, datasets }}
              options={{
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                scales: {
                  x: { grid: { color: 'rgba(200,184,154,.07)' }, ticks: { color: 'rgba(200,184,154,.5)' } },
                  y: { min: 0, max: 105, grid: { color: 'rgba(200,184,154,.07)' }, ticks: { color: 'rgba(200,184,154,.5)', callback: (v: any) => v + '%' } }
                },
                plugins: {
                  legend: { display: true, labels: { color: 'rgba(200,184,154,.65)', boxWidth: 12, padding: 16, font: { size: 10 } } },
                  tooltip: { backgroundColor: '#141210', titleColor: '#EDE4CC', bodyColor: 'rgba(200,184,154,.75)', borderColor: 'rgba(200,184,154,.2)', borderWidth: 1, callbacks: { label: (v: any) => ` ${v.dataset.label}: ${v.raw}%` } }
                }
              }}
            />
          </div>

          <div className="bg-white/5 border border-rule/10 overflow-hidden">
            <div className="px-4.5 py-3.5 border-b border-rule/10 font-mono text-[8px] tracking-[0.18em] uppercase text-ghost">Subgroup statistics</div>
            <div className="p-4.5">
              <div className="flex items-center justify-between py-2 border-b border-rule/10">
                <span className="font-mono text-[8.5px] tracking-[0.1em] uppercase text-ghost">30-day CFR</span>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-[18px] font-bold" style={{ color: d.color }}>{d.stats.cfr30}</span>
                  {primaryKey !== 'all' && (
                    <span className={`font-mono text-[8px] px-2 py-0.5 rounded-[2px] ${parseFloat(d.stats.cfr30) > parseFloat(survivalData.all.stats.cfr30) ? 'bg-red/15 text-red' : parseFloat(d.stats.cfr30) < parseFloat(survivalData.all.stats.cfr30) ? 'bg-teal/15 text-teal' : 'bg-rule/10 text-ghost'}`}>
                      {parseFloat(d.stats.cfr30) > parseFloat(survivalData.all.stats.cfr30) ? '+' : ''}{(parseFloat(d.stats.cfr30) - parseFloat(survivalData.all.stats.cfr30)).toFixed(1)}pp vs avg
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-rule/10">
                <span className="font-mono text-[8.5px] tracking-[0.1em] uppercase text-ghost">Median age</span>
                <span className="font-serif text-[18px] font-bold text-paper">{d.stats.medianAge}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-rule/10">
                <span className="font-mono text-[8.5px] tracking-[0.1em] uppercase text-ghost">STEMI proportion</span>
                <span className="font-serif text-[18px] font-bold text-paper">{d.stats.stemiPct}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-rule/10">
                <span className="font-mono text-[8.5px] tracking-[0.1em] uppercase text-ghost">Male patients</span>
                <span className="font-serif text-[18px] font-bold text-paper">{d.stats.malePct}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-mono text-[8.5px] tracking-[0.1em] uppercase text-ghost">Incidence /100k</span>
                <span className="font-serif text-[18px] font-bold text-paper">{d.stats.incidence}</span>
              </div>
              <div className="mt-3.5 pt-3 border-t border-rule/10">
                <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-rule/35 block mb-1">Clinical note</span>
                <span className="text-[13px] leading-[1.6] text-ghost italic">{d.stats.note}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 mt-5 flex-wrap">
          {timeLabels.slice(1).map((label, i) => {
            const val = d.pts[i + 1];
            const ref = survivalData.all.pts[i + 1];
            const diff = val - ref;
            const diffStr = diff === 0 ? '' : (diff > 0 ? `+${diff}pp` : `${diff}pp`);
            const diffCol = diff > 0 ? '#2A6B5A' : diff < 0 ? '#B01A1A' : 'rgba(200,184,154,.4)';
            return (
              <div key={label} className="bg-white/5 border border-rule/10 p-3 flex flex-col gap-1 min-w-[90px]">
                <span className="font-mono text-[7.5px] tracking-[0.12em] uppercase text-rule/40">{label}</span>
                <span className="font-serif text-[24px] font-bold leading-none" style={{ color: d.color }}>{val}%</span>
                {primaryKey !== 'all' && diffStr && (
                  <span className="font-mono text-[8px]" style={{ color: diffCol }}>{diffStr} vs avg</span>
                )}
              </div>
            );
          })}
        </div>

        {isEthRelated && (
          <div className="mt-6">
            <div className="font-mono text-[8.5px] tracking-[0.15em] uppercase text-ghost mb-3.5">30-day survival — all ethnic subgroups compared</div>
            <div>
              {survComp.map(c => {
                const highlight = c.key === primaryKey;
                return (
                  <div key={c.key} className="flex items-center gap-3 mb-2.5">
                    <div className={`font-mono text-[9px] tracking-[0.08em] uppercase w-[140px] shrink-0 ${highlight ? 'text-paper' : 'text-ghost'}`}>{c.label}</div>
                    <div className="flex-1 h-[20px] bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.val / 60) * 100}%` }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        className="h-full flex items-center pl-2"
                        style={{ backgroundColor: `${c.color}${highlight ? 'EE' : '60'}` }}
                      >
                        <span className="font-mono text-[9px] font-medium text-white/80">{c.val}%</span>
                      </motion.div>
                    </div>
                    <div className="font-serif text-[14px] font-bold w-[48px] text-right shrink-0" style={{ color: `${c.color}${highlight ? '' : '99'}` }}>
                      {highlight ? '◆ ' : ''}{c.val}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
