import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MacroOverview } from './components/MacroOverview';
import { MarketCharts } from './components/MarketCharts';
import { FeeStructureSection } from './components/FeeStructureSection';
import { PgTiersSection } from './components/PgTiersSection';
import { RiskAuditSection } from './components/RiskAuditSection';
import { RegulationTimeline } from './components/RegulationTimeline';
import { LostFindUsSection } from './components/LostFindUsSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'market-structure', 'fees', 'pg-tiers', 'risk-audit', 'regulation', 'lostfindus'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Top Sticky Navigation */}
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <MacroOverview />
        <MarketCharts />
        <FeeStructureSection />
        <PgTiersSection />
        <RiskAuditSection />
        <RegulationTimeline />
        <LostFindUsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
