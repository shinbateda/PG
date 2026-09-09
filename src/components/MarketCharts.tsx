import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import type { ChartData } from 'chart.js';
import { PAYMENT_METHODS, MARKET_OLIGOPOLY } from '../data/pgData';
import { Landmark, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const MarketCharts: React.FC = () => {
  const { isDark } = useTheme();
  const doughnutCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const barCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const doughnutChartRef = useRef<Chart | null>(null);
  const barChartRef = useRef<Chart | null>(null);

  const [selectedMethod, setSelectedMethod] = useState<number>(0);

  useEffect(() => {
    // 1. Payment Method Doughnut Chart
    if (doughnutCanvasRef.current) {
      const existingDoughnut = Chart.getChart(doughnutCanvasRef.current);
      if (existingDoughnut) {
        existingDoughnut.destroy();
      }
      if (doughnutChartRef.current) {
        doughnutChartRef.current.destroy();
        doughnutChartRef.current = null;
      }

      const data: ChartData<'doughnut'> = {
        labels: PAYMENT_METHODS.map((m) => m.label),
        datasets: [
          {
            data: PAYMENT_METHODS.map((m) => m.share),
            backgroundColor: PAYMENT_METHODS.map((m) => m.color),
            borderColor: isDark ? '#1e293b' : '#ffffff',
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      };

      doughnutChartRef.current = new Chart(doughnutCanvasRef.current, {
        type: 'doughnut',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '62%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                padding: 12,
                font: { size: 11, family: 'Pretendard' },
                color: isDark ? '#cbd5e1' : '#475569',
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return ` ${context.label}: ${context.raw}%`;
                },
              },
            },
          },
        },
      });
    }

    // 2. Market Oligopoly Bar Chart
    if (barCanvasRef.current) {
      const existingBar = Chart.getChart(barCanvasRef.current);
      if (existingBar) {
        existingBar.destroy();
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
        barChartRef.current = null;
      }

      const data: ChartData<'bar'> = {
        labels: ['대형 3사 (NHN KCP, KG, 토스)', '기타 중소/특화 PG (150여 개사)'],
        datasets: [
          {
            label: '시장 점유율 (%)',
            data: [80, 20],
            backgroundColor: [isDark ? '#6366f1' : '#4f46e5', isDark ? '#64748b' : '#94a3b8'],
            borderRadius: 8,
            barThickness: 28,
          },
        ],
      };

      barChartRef.current = new Chart(barCanvasRef.current, {
        type: 'bar',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              max: 100,
              grid: { color: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9' },
              ticks: {
                callback: (val) => `${val}%`,
                font: { size: 11, family: 'Pretendard' },
                color: isDark ? '#94a3b8' : '#64748b',
              },
            },
            y: {
              grid: { display: false },
              ticks: {
                font: { size: 11, family: 'Pretendard' },
                color: isDark ? '#e2e8f0' : '#334155',
              },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` 점유율: ${ctx.raw}%`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (doughnutChartRef.current) {
        doughnutChartRef.current.destroy();
        doughnutChartRef.current = null;
      }
      if (barChartRef.current) {
        barChartRef.current.destroy();
        barChartRef.current = null;
      }
    };
  }, [isDark]);

  return (
    <section id="market-structure" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-8">
      {/* Section Title */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
          <Landmark className="w-3.5 h-3.5" />
          <span>Section 01 · 결제 수단 &amp; 과점 현황</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          PG 결제 수단별 비중 및 시장 과점 구조
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-4xl">
          국내 전자지급결제대행 서비스는 <strong className="text-slate-800 dark:text-slate-100">신용카드 지급대행이 75.0%</strong>로 시장을 지배하고 있으며, 
          150여 개 등록 사업자 중 상위 3개사(NHN KCP, KG이니시스, 토스페이먼츠)가 이커머스 거래의 <strong className="text-slate-800 dark:text-slate-100">약 80%를 과점</strong>하고 있습니다.
        </p>
      </div>

      {/* 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Chart 1: Doughnut */}
        <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-200/70 dark:border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
              전자지급결제 수단별 거래금액 비중
            </h4>
            <span className="text-[11px] bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-transparent dark:border-blue-800/60 font-medium px-2 py-0.5 rounded-full">
              한국은행 2025 집계
            </span>
          </div>

          <div className="relative w-full h-[280px]">
            <canvas ref={doughnutCanvasRef} />
          </div>

          {/* Interactive Method Details */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
            {PAYMENT_METHODS.map((method, idx) => (
              <button
                key={method.label}
                onClick={() => setSelectedMethod(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedMethod === idx
                    ? 'bg-white dark:bg-slate-800 border-blue-500 dark:border-blue-400 shadow-xs'
                    : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: method.color }}
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{method.label}</span>
                  </div>
                  <span className="font-black text-slate-900 dark:text-slate-100">{method.share}%</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{method.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chart 2: Oligopoly Bar */}
        <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-200/70 dark:border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
              PG 시장 점유율 구조 (대형 3사 vs 기타 150여 개사)
            </h4>
            <span className="text-[11px] bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-transparent dark:border-indigo-800/60 font-medium px-2 py-0.5 rounded-full">
              과점 체제 심화
            </span>
          </div>

          <div className="relative w-full h-[280px]">
            <canvas ref={barCanvasRef} />
          </div>

          {/* Insights Box */}
          <div className="bg-white dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/70 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-indigo-700 dark:text-indigo-300 font-bold">
              <Info className="w-4 h-4" />
              <span>3대 대형사 과점 고착화 핵심 요인</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 mr-1.5 shrink-0 mt-0.5" />
                <span><strong className="text-slate-800 dark:text-slate-100">네트워크 효과 및 대규모 트래픽:</strong> 블랙프라이데이 등 초당 수만 건 결제 트래픽을 감당하는 서버 안정성.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 mr-1.5 shrink-0 mt-0.5" />
                <span><strong className="text-slate-800 dark:text-slate-100">카드사 직접 협상력:</strong> 8대 카드사와의 볼륨 기반 최저 원가 연동 및 정산 주기 우대.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 mr-1.5 shrink-0 mt-0.5" />
                <span><strong className="text-slate-800 dark:text-slate-100">티메프 사태 이후 안정성 선호:</strong> 중소형 PG의 부실 우려로 우량 대형사로 이커머스 셀러 집중 가속화.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
