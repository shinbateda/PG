import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { FEE_TIERS } from '../data/pgData';
import { Calculator, CreditCard, DollarSign, HelpCircle, ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const FeeStructureSection: React.FC = () => {
  const { isDark } = useTheme();
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Calculator State
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [monthlyGmv, setMonthlyGmv] = useState<number>(20000000); // 2천만 원 기본
  const [paymentType, setPaymentType] = useState<'card' | 'bank_transfer' | 'easy_pay'>('card');

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
          labels: FEE_TIERS.map((t) => t.category),
          datasets: [
            {
              label: '신용카드 원가 수수료율 (%)',
              data: FEE_TIERS.map((t) => t.cardCostRate),
              backgroundColor: isDark ? '#60a5fa' : '#93c5fd',
              borderRadius: 6,
              barPercentage: 0.7,
              categoryPercentage: 0.8,
            },
            {
              label: '최종 PG 포함 실질 수수료율 (%)',
              data: FEE_TIERS.map((t) => t.finalPgRate),
              backgroundColor: isDark ? '#3b82f6' : '#1d4ed8',
              borderRadius: 6,
              barPercentage: 0.7,
              categoryPercentage: 0.8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 4.0,
              grid: { color: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9' },
              ticks: {
                callback: (val) => `${val}%`,
                font: { size: 11, family: 'Pretendard' },
                color: isDark ? '#94a3b8' : '#64748b',
              },
            },
            x: {
              grid: { display: false },
              ticks: {
                font: { size: 11, family: 'Pretendard' },
                color: isDark ? '#e2e8f0' : '#334155',
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                font: { size: 11, family: 'Pretendard' },
                color: isDark ? '#cbd5e1' : '#475569',
              },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}% (부가세 별도)`,
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

  // Calculation Logic
  const currentTier = FEE_TIERS[selectedTierIndex];
  
  let feeRate = currentTier.finalPgRate;
  if (paymentType === 'bank_transfer') {
    feeRate = 1.6; // 계좌이체 수수료
  } else if (paymentType === 'easy_pay') {
    feeRate = currentTier.finalPgRate + 0.1; // 카카오페이/네이버페이 추가 수수료
  }

  const baseFeeAmount = Math.round((monthlyGmv * feeRate) / 100);
  const vatAmount = Math.round(baseFeeAmount * 0.1);
  const totalDeduction = baseFeeAmount + vatAmount;
  const netPayout = monthlyGmv - totalDeduction;
  const effectiveTotalRate = ((totalDeduction / monthlyGmv) * 100).toFixed(2);

  return (
    <section id="fees" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-8">
      {/* Section Title */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Section 02 · 가맹점 규모별 수수료 체계</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          가맹점 연 매출액 구간별 원가 및 실질 PG 수수료 체계
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-4xl">
          여신전문금융업법에 따른 영세·중소 가맹점 <strong className="text-slate-800 dark:text-slate-100">카드사 우대원가 수수료율(0.40%~1.45%)</strong>에 
          PG사의 결제망 운영비, VAN 통신료, 에스크로 보증비 등 <strong className="text-slate-800 dark:text-slate-100">부가 마진(약 1.2%~1.4%)</strong>이 결합되어 
          가맹점이 최종 부담하는 결제 수수료가 책정됩니다.
        </p>
      </div>

      {/* Main Grid: Chart & Explanation Logic */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Chart Column (2 cols) */}
        <div className="lg:col-span-2 bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-200/70 dark:border-slate-700/60 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
              카드사 원가 수수료 vs 최종 PG 실질 수수료율 비교 (%)
            </h4>
            <span className="text-[11px] bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded-full">
              부가세(VAT) 별도 기준
            </span>
          </div>

          <div className="relative w-full h-[320px]">
            <canvas ref={chartCanvasRef} />
          </div>

          {/* Tier Cards Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
            {FEE_TIERS.map((tier, idx) => (
              <div
                key={tier.category}
                onClick={() => setSelectedTierIndex(idx)}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  selectedTierIndex === idx
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 dark:border-blue-400 shadow-xs'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-slate-100 truncate">{tier.category}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{tier.revenueRange}</div>
                <div className="mt-2 text-blue-700 dark:text-blue-400 font-extrabold text-sm">
                  {tier.finalPgRate}%
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-400">
                  원가 {tier.cardCostRate}% + 마진
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logic Sidebar (1 col) */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 dark:border-slate-800 space-y-5">
          <h4 className="font-bold text-cyan-300 text-base flex items-center space-x-2 border-b border-slate-800 pb-3">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>수수료 산정 3대 핵심 로직</span>
          </h4>

          <div className="space-y-4 text-xs leading-relaxed text-slate-300">
            <div className="bg-slate-800/80 dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 dark:border-slate-800 space-y-1">
              <span className="font-bold text-white flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>영세 사업자 (연 3억 이하)</span>
              </span>
              <p className="text-slate-300 pl-5">
                신용카드 원가 <strong>0.40%</strong> + PG 인프라 마진 ≈ <strong>최종 약 1.80%</strong> 내외 적용. 
                국세청 매출 통보를 거쳐 반기별로 우대 등급 자동 갱신.
              </p>
            </div>

            <div className="bg-slate-800/80 dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 dark:border-slate-800 space-y-1">
              <span className="font-bold text-white flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>중소 사업자 (연 3억~30억)</span>
              </span>
              <p className="text-slate-300 pl-5">
                연 매출에 따라 3개 구간 차등: 중소1(1.00%), 중소2(1.15%), 중소3(1.45%)로 
                실질 최종 수수료는 <strong>2.20% ~ 2.70%</strong> 형성.
              </p>
            </div>

            <div className="bg-slate-800/80 dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/80 dark:border-slate-800 space-y-1">
              <span className="font-bold text-white flex items-center space-x-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>일반 사업자 (연 30억 초과)</span>
              </span>
              <p className="text-slate-300 pl-5">
                법정 우대수수료 대상 제외. 표면 요율은 <strong>3.30%~3.40%</strong>이나, 
                월 취급액(GMV) 규모에 따른 PG사와의 개별 네고(슬라이딩 요율) 가능.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Merchant Fee & Payout Calculator */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 dark:from-slate-900 dark:via-blue-950 dark:to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-6 border border-transparent dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">가맹점 실시간 수수료 &amp; 순정산액 계산기</h4>
              <p className="text-xs text-slate-300">
                가맹점의 연간 매출 규모와 월 결제 금액을 입력하면 실수령액과 세부 공제액을 자동 산출합니다.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-400 text-slate-950 self-start sm:self-auto">
            실시간 시뮬레이터
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Tier Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 block">
                1. 가맹점 연 매출 구간 선택 (국세청 우대 수수료 등급)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {FEE_TIERS.map((tier, idx) => (
                  <button
                    key={tier.category}
                    onClick={() => setSelectedTierIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedTierIndex === idx
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md font-semibold'
                        : 'bg-white/10 text-slate-200 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    <div className="truncate">{tier.category}</div>
                    <div className="text-[10px] opacity-80 truncate">{tier.revenueRange}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 block">
                2. 결제 수단 선택
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => setPaymentType('card')}
                  className={`px-3.5 py-2 rounded-xl border transition cursor-pointer ${
                    paymentType === 'card'
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                      : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                  }`}
                >
                  신용/체크카드 (기본 PG 요율)
                </button>
                <button
                  onClick={() => setPaymentType('bank_transfer')}
                  className={`px-3.5 py-2 rounded-xl border transition cursor-pointer ${
                    paymentType === 'bank_transfer'
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                      : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                  }`}
                >
                  계좌이체 / 가상계좌 (1.6% 고정)
                </button>
                <button
                  onClick={() => setPaymentType('easy_pay')}
                  className={`px-3.5 py-2 rounded-xl border transition cursor-pointer ${
                    paymentType === 'easy_pay'
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                      : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'
                  }`}
                >
                  빅테크 간편결제 (+0.1% 가산)
                </button>
              </div>
            </div>

            {/* Monthly Sales Input & Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">3. 월 총 결제 거래액 (GMV)</span>
                <span className="font-bold text-cyan-300 text-sm">
                  {monthlyGmv.toLocaleString()} 원
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={200000000}
                step={1000000}
                value={monthlyGmv}
                onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1백만 원</span>
                <span>5천만 원</span>
                <span>1억 원</span>
                <span>2억 원</span>
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
            <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">
              {currentTier.category} · 예상 정산 내역
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-300">최종 입금 예상액 (순수령액)</div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {netPayout.toLocaleString()} 원
              </div>
              <div className="text-[11px] text-cyan-300">
                실효 공제율: {effectiveTotalRate}% (PG 수수료 + 부가세 포함)
              </div>
            </div>

            <div className="border-t border-white/15 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>월 결제 총액:</span>
                <span className="font-medium text-white">{monthlyGmv.toLocaleString()} 원</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>적용 PG 기본 수수료 ({feeRate}%):</span>
                <span className="font-medium text-rose-300">-{baseFeeAmount.toLocaleString()} 원</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>수수료 부가세 (VAT 10%):</span>
                <span className="font-medium text-rose-300">-{vatAmount.toLocaleString()} 원</span>
              </div>
              <div className="flex justify-between text-slate-200 border-t border-white/10 pt-2 font-bold">
                <span>총 공제 금액:</span>
                <span className="text-rose-400">-{totalDeduction.toLocaleString()} 원</span>
              </div>
            </div>

            <div className="bg-blue-950/70 p-3 rounded-xl border border-blue-800/80 text-[11px] text-slate-300 leading-tight">
              💡 <strong>정산 팁:</strong> 신규 사업자는 가입 시 일반 요율(3.3%)로 임시 계약 후, 
              첫 반기 국세청 신고 매출이 확정되면 우대 수수료율이 소급 적용되어 차액이 가맹점 계좌로 환급됩니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
