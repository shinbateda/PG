import React from 'react';
import { CreditCard, ShieldCheck, TrendingUp, Landmark, AlertTriangle, Scale, Printer, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'overview', label: '거시 동향', icon: TrendingUp },
    { id: 'market-structure', label: '시장 구조', icon: Landmark },
    { id: 'fees', label: '수수료 체계', icon: CreditCard },
    { id: 'pg-tiers', label: '규모별 PG사', icon: ShieldCheck },
    { id: 'risk-audit', label: '심사 및 품목', icon: AlertTriangle },
    { id: 'regulation', label: '2026 전금법', icon: Scale },
    { id: 'lostfindus', label: 'LostFindUs 특화', icon: Sparkles },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800 dark:border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('overview')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              국내 PG 산업 시장 구조 &amp; 품목 심층 분석
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              2025~2026 전자지급결제대행 규모별 생태계 &amp; 규제 패러다임
            </p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 dark:border-slate-700 transition cursor-pointer shadow-2xs"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">라이트 모드</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-300" />
                <span className="hidden sm:inline">다크 모드</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            title="인포그래픽 인쇄 / PDF 저장"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">리포트 인쇄</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-800/80 space-x-2 scrollbar-none text-xs">

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-md transition ${
              activeSection === item.id
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white bg-slate-800/50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
