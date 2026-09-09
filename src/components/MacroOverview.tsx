import React from 'react';
import { MACRO_STATS } from '../data/pgData';
import { TrendingUp, CreditCard, PieChart, ShieldAlert, Sparkles, ArrowUpRight } from 'lucide-react';

export const MacroOverview: React.FC = () => {
  return (
    <section id="overview" className="space-y-6 pt-4">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Subtle grid accent background */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>2025~2026 전자지급결제대행(PG) 산업 종합 리포트</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            일 거래액 1.5조 원 시대, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-200">
              PG 산업의 규모별 생태계 및 규제 패러다임
            </span>
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            국내 디지털 상거래 결제는 일평균 <span className="text-white font-semibold">3,364만 건</span>,{' '}
            <span className="text-white font-semibold">1조 5,542억 원</span>을 처리하는 국가 기간 금융 인프라로 자리 잡았습니다. 
            상위 3개 대형 PG사(NHN KCP, KG이니시스, 토스페이먼츠)의 <span className="text-cyan-300 font-semibold">약 80% 과점 체제</span> 속에서, 
            티메프 사태 이후 발의된 <span className="text-amber-300 font-semibold">2026년 12월 정산 자금 100% 외부 예치 의무화</span>는 
            시장 구도를 '수수료 출혈 경쟁'에서 '재무적 신뢰성' 중심으로 근본적으로 전환시키고 있습니다.
          </p>

          <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-300">
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700/80">
              📌 신용카드 지급대행 비중: <strong>75.0%</strong>
            </span>
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700/80">
              📌 국내 등록 PG 사업자: <strong>150여 개사</strong>
            </span>
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700/80">
              📌 대형 3사 과점율: <strong>약 80%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700/60 transition-all group">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <div className="flex items-center space-x-1.5">
                <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>일평균 거래 금액</span>
              </div>
              <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded-full font-bold">
                {MACRO_STATS.dailyVolumeGrowth}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {MACRO_STATS.dailyVolume}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between">
            <span>신용카드 지급대행이 75% 차지</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition" />
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-700/60 transition-all group">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <div className="flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>일평균 거래 건수</span>
              </div>
              <span className="text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-2 py-0.5 rounded-full font-bold">
                {MACRO_STATS.dailyCountGrowth}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {MACRO_STATS.dailyCount}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between">
            <span>계좌이체·선불수단 거래 급증</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition" />
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-700/60 transition-all group">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <div className="flex items-center space-x-1.5">
                <PieChart className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>3대 대형사 점유율</span>
              </div>
              <span className="text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 px-2 py-0.5 rounded-full font-bold">
                {MACRO_STATS.top3Status}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
              {MACRO_STATS.top3Share}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between">
            <span>NHN KCP · KG이니시스 · 토스</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" />
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-md hover:border-amber-200 dark:hover:border-amber-700/60 transition-all group">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <div className="flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>정산금 외부 예치</span>
              </div>
              <span className="text-xs bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 px-2 py-0.5 rounded-full font-bold">
                {MACRO_STATS.regulationStatus}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
              {MACRO_STATS.regulation2026}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between">
            <span>판매자 정산금 유용 원천 차단</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition" />
          </p>
        </div>
      </div>
    </section>
  );
};
