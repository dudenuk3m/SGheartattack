/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll } from 'motion/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Burden from './components/Burden';
import Ethnicity from './components/Ethnicity';
import RiskFactors from './components/RiskFactors';
import Survival from './components/Survival';
import Projections from './components/Projections';
import Footer from './components/Footer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.defaults.color = 'rgba(200,184,154,.55)';
ChartJS.defaults.borderColor = 'rgba(200,184,154,.1)';
ChartJS.defaults.font.family = "'DM Mono', monospace";
ChartJS.defaults.font.size = 10;
ChartJS.defaults.plugins.legend.display = false;

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <Cursor />
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-red z-[9997] origin-left"
      />
      <Nav />
      <main>
        <Hero />
        <Burden />
        <Ethnicity />
        <RiskFactors />
        <Survival />
        <Projections />
      </main>
      <Footer />
    </>
  );
}
