import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { PG_COMPANIES } from '../data/pgData';
import { PgCompany, PgTier } from '../types';
import { ShieldCheck, Search, Zap, Building2, CheckCircle2, Clock, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const PgTiersSection: React.FC = () => {
  const { isDark } = useTheme();
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const [activeFilter, setActiveFilter] = useState<'all' | PgTier>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<PgCompany | null>(null);

  useEffect(() => {
    if (chartCanvasRef.current) {
      const existingChart = Chart.getChart(chartCanvasRef.current);
      if (existingChart) {
        existingChart.destroy();
      }
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }

      chartInstanceRef.current = new Chart(chartCanvasRef.current, {
        type: 'bar',
        data: {
          labels: ['대형 PG (3대사)', '중형 PG (대체망/VAN)', '소형/버티컬 특화 PG'],
          datasets: [
            {
              label: '자본력 및 대용량 트래픽 안정성',
              data: [95, 75, 45],
              backgroundColor: isDark ? '#3b82f6' : '#1e40af',
              borderRadius: 6,
              barPercentage: 0.7,
            },
            {
              label: '대체 결제망(가상계좌/소액결제) 보유력',
              data: [70, 95, 50],
              backgroundColor: isDark ? '#06b6d4' : '#0891b2',
              borderRadius: 6,
              barPercentage: 0.7,
            },
            {
              label: '개발자 친화성 및 유연한 심사/민첩성',
              data: [50, 60, 95],
              backgroundColor: isDark ? '#fbbf24' : '#f59e0b',
              borderRadius: 6,
              barPercentage: 0.7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              max: 100,
              grid: { color: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9' },
              ticks: {
                callback: (val) => `${val}점`,
                font: { size: 11, family: 'Pretendard' },
                color: isDark ? '#94a3b8' : '#64748b',
              },
            },
            y: {
              grid: { display: false },
              ticks: {
                font: { size: 11, family: 'Pretendard', weight: 'bold' },
                color: isDark ? '#e2e8f0' : '#334155',
              },
            },
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                font: { size: 11, family: 'Pretendard' },
                color: isDark ? '#cbd5e1' : '#475569',
              },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}점 / 100점`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [isDark]);

  const filteredCompanies = PG_COMPANIES.filter((pg) => {
    const matchesTier = activeFilter === 'all' || pg.tier === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      pg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pg.uniqueFeature.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pg.keyStrengths.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pg.specializedIndustries.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  return (
    <section id="pg-tiers" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-8">
      {/* Section Title */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Section 03 · 규모별 PG 생태계</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          기업 규모별 PG사 분류 및 포지셔닝 비교
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-4xl">
          대형 PG사는 막대한 자본과 엔터프라이즈 인프라로 시장을 지배하며, 중형 PG사는 가상계좌·휴대폰 결제·오프라인 VAN 독점으로 
          독자적 해자를 형성하고, 소형/특화 PG사는 개발자 오케스트레이션, 글로벌 크로스보더, 링크 결제 등 버티컬 혁신을 주도합니다.
        </p>
      </div>

      {/* Horizontal Bar Chart for PG Capabilities */}
      <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-200/70 dark:border-slate-700/60 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
            규모별 PG 그룹 핵심 역량 지수 (100점 만점 기준 평가)
          </h4>
          <span className="text-[11px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded-full">
            인프라 · 대체망 · 심사유연성 다각 분석
          </span>
        </div>

        <div className="relative w-full h-[260px]">
          <canvas ref={chartCanvasRef} />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl border transition font-medium cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            전체 보기 ({PG_COMPANIES.length})
          </button>
          <button
            onClick={() => setActiveFilter('large')}
            className={`px-3.5 py-1.5 rounded-xl border transition font-medium cursor-pointer ${
              activeFilter === 'large'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60'
            }`}
          >
            대형 PG (1군)
          </button>
          <button
            onClick={() => setActiveFilter('mid')}
            className={`px-3.5 py-1.5 rounded-xl border transition font-medium cursor-pointer ${
              activeFilter === 'mid'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
            }`}
          >
            중형 PG (대체망/VAN)
          </button>
          <button
            onClick={() => setActiveFilter('specialized')}
            className={`px-3.5 py-1.5 rounded-xl border transition font-medium cursor-pointer ${
              activeFilter === 'specialized'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60'
            }`}
          >
            소형/버티컬 특화 PG
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="PG사명, 특화 기능 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      {/* PG Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => {
          const isLarge = company.tier === 'large';
          const isMid = company.tier === 'mid';

          return (
            <div
              key={company.id}
              className={`rounded-2xl p-6 border transition-all flex flex-col justify-between hover:shadow-md ${
                isLarge
                  ? 'bg-gradient-to-b from-blue-50/40 to-white dark:from-blue-950/30 dark:to-slate-900 border-blue-200/80 dark:border-blue-900/60'
                  : isMid
                  ? 'bg-gradient-to-b from-indigo-50/40 to-white dark:from-indigo-950/30 dark:to-slate-900 border-indigo-200/80 dark:border-indigo-900/60'
                  : 'bg-gradient-to-b from-amber-50/40 to-white dark:from-amber-950/30 dark:to-slate-900 border-amber-200/80 dark:border-amber-900/60'
              }`}
            >
              <div className="space-y-4">
                {/* Card Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isLarge
                          ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-transparent dark:border-blue-800/80'
                          : isMid
                          ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-transparent dark:border-indigo-800/80'
                          : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-transparent dark:border-amber-800/80'
                      }`}
                    >
                      {company.tierLabel}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1.5">{company.name}</h4>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium bg-white dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                    {company.marketShareOrRevenue}
                  </span>
                </div>

                <div className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg inline-block border border-transparent dark:border-blue-900/50">
                  ⚡ {company.badge}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {company.description}
                </p>

                {/* Key Strengths */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">핵심 경쟁력</div>
                  {company.keyStrengths.map((str, i) => (
                    <div key={i} className="flex items-start text-slate-600 dark:text-slate-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mr-1.5 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>

                {/* Unique Feature Highlight */}
                <div className="bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded-xl text-xs space-y-1 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">독점 차별화 기능</div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium text-[11px] leading-snug">
                    {company.uniqueFeature}
                  </p>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>정산: <strong className="text-slate-700 dark:text-slate-300">{company.settlementPeriod}</strong></span>
                </div>
                <button
                  onClick={() => setSelectedCompany(company)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold flex items-center space-x-0.5 hover:underline cursor-pointer"
                >
                  <span>상세 스펙</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full">
                  {selectedCompany.tierLabel}
                </span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">{selectedCompany.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedCompany.marketShareOrRevenue}</p>
              </div>
              <button
                onClick={() => setSelectedCompany(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">정산 정책 및 입금 주기</div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium">
                  {selectedCompany.settlementPeriod}
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">심사 정책 및 리스크 성향</div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  {selectedCompany.riskPolicy}
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">적합 권장 업종</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCompany.specializedIndustries.map((ind, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 rounded-lg text-[11px] font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Radar-like metric bar comparison */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-700 dark:text-slate-300">핵심 지표 역량 평가</div>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                      <span>자본력 &amp; 트래픽 안정성</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedCompany.metrics.capitalStability}점</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-full rounded-full"
                        style={{ width: `${selectedCompany.metrics.capitalStability}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                      <span>대체 결제망 지원</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedCompany.metrics.altPaymentStrength}점</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-600 dark:bg-cyan-500 h-full rounded-full"
                        style={{ width: `${selectedCompany.metrics.altPaymentStrength}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                      <span>개발자 유연성 &amp; API 완성도</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedCompany.metrics.developerFlexibility}점</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: `${selectedCompany.metrics.developerFlexibility}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedCompany(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl font-bold text-xs transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
