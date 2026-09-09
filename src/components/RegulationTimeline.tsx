import React, { useState } from 'react';
import { REGULATION_PHASES } from '../data/pgData';
import { Scale, AlertCircle, ShieldAlert, CheckSquare, Square, Building, Landmark, Lock } from 'lucide-react';

export const RegulationTimeline: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: true,
    3: false,
  });

  const checklist = [
    {
      id: 0,
      title: '계약 중인 PG사의 자본금 충족 여부 확인',
      desc: '분기 거래액 300억 초과 사업자의 경우 개정 자본금 20억 원 충족 여부 및 금감원 경영평가 점검.',
    },
    {
      id: 1,
      title: '정산 대금의 제1금융권 외부 신탁 계약 공시 확인',
      desc: '자체 계좌가 아닌 국민·신한·하나 등 시중은행의 독립 신탁 계좌로 정산금이 보관되는지 확인.',
    },
    {
      id: 2,
      title: '하위 가맹점 고객확인제도(CDD/AML) 서류 사전 구비',
      desc: '2026년부터 플랫폼 내 2차 셀러까지 신분증, 사업자등록증, 실소유자 확인 등 자금세탁 방지 심사 의무화.',
    },
    {
      id: 3,
      title: '멀티 PG 라우팅 체계 구축으로 정산 리스크 분산',
      desc: '단일 PG사 종속을 탈피하고 포트원 등을 활용해 복수 PG사로 거래량 분산 및 장애 우회 체계 마련.',
    },
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="regulation" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-8">
      {/* Section Title */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
          <Scale className="w-3.5 h-3.5" />
          <span>Section 05 · 정책 규제 변화 &amp; 대재편</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2026년 전금법 개정 및 PG 시장의 구조적 대재편
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-4xl">
          티메프(티몬·위메프) 1조 원대 대규모 미정산 사태 이후, 금융위원회는 <strong>전자금융거래법 개정안을 2026년 12월부터 시행</strong>합니다. 
          판매자 정산 대금의 100% 외부 기관 예치 신탁이 단계적으로 강제되며, 자본금 요건이 2배로 상향되어 PG사의 재무 안전성이 최우선 입점 기준이 됩니다.
        </p>
      </div>

      {/* Visual Timeline Roadmap Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
            정산 자금 외부 기관 예치/신탁 관리 의무화 로드맵
          </h4>
          <span className="text-[11px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-semibold px-2.5 py-0.5 rounded-full border border-transparent dark:border-blue-800/80">
            금융위원회 고시
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REGULATION_PHASES.map((phase, idx) => {
            const isLast = idx === REGULATION_PHASES.length - 1;
            const isSelected = activePhaseIndex === idx;

            return (
              <div
                key={phase.year}
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all border text-center flex flex-col justify-between space-y-4 ${
                  isLast
                    ? 'bg-slate-900 dark:bg-slate-950 text-white border-slate-800 shadow-md ring-2 ring-cyan-400/40'
                    : isSelected
                    ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <div className="space-y-2">
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full inline-block ${
                      isLast
                        ? 'bg-cyan-400 text-slate-950'
                        : isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {phase.year}
                  </span>
                  <div
                    className={`text-3xl sm:text-4xl font-black tracking-tight ${
                      isLast ? 'text-cyan-300' : 'text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {phase.ratio}% 외부 예치
                  </div>
                  <h5
                    className={`text-sm font-bold ${
                      isLast ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {phase.title}
                  </h5>
                  <p
                    className={`text-xs leading-relaxed ${
                      isLast ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {phase.description}
                  </p>
                </div>

                <div
                  className={`pt-3 border-t text-[11px] font-medium ${
                    isLast
                      ? 'border-slate-800 text-cyan-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  위반 시: {phase.penalty}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-700/60 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
            <Building className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">1. 자본금 요건 2배 상향</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            분기 거래액 300억 초과 대규모 PG사의 최소 등록 자본금이 <strong>10억 원에서 20억 원</strong>으로 상향됩니다. 
            부실 기업 인수를 방지하기 위한 대주주 변경 적격성 심사 제도가 신설됩니다.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-700/60 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">2. 하위 셀러 AML/CDD 의무화</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            플랫폼 내 2차 PG 및 하위 판매자 전원에 대한 고객확인(CDD)과 자금세탁 방지(AML) 실명 인증이 강제됩니다. 
            대포통장 및 카드깡 경로로 지목된 가상계좌 실시간 정산이 전면 금지되고 지연 정산이 시행됩니다.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-700/60 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">3. 대형 3사 과점 및 구조조정</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            정산 자금을 단기 금융상품에 굴려 이자 수익으로 버티던 한계 부실 PG사의 퇴출 및 M&A가 가속화됩니다. 
            판매자들은 정산 안정성이 공인된 NHN KCP, KG이니시스, 토스페이먼츠 등 우량 3사로 대거 결집할 전망입니다.
          </p>
        </div>
      </div>

      {/* Seller Checklist */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-slate-950 dark:to-indigo-950 text-white rounded-2xl p-6 sm:p-8 space-y-5 border border-slate-800">
        <div className="flex items-center space-x-2.5 border-b border-slate-800 pb-3">
          <CheckSquare className="w-5 h-5 text-cyan-400" />
          <h4 className="text-base sm:text-lg font-bold text-white">
            이커머스 셀러 &amp; 플랫폼 사업자 필수 대응 체크리스트
          </h4>
        </div>
        <p className="text-xs text-slate-300">
          2026년 12월 전금법 본격 시행 전, 정산 사고를 방지하기 위해 가맹점이 점검해야 할 4대 핵심 항목입니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          {checklist.map((item) => {
            const isChecked = checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                  isChecked
                    ? 'bg-slate-800/90 border-cyan-500/50 shadow-xs'
                    : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/70'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className={`font-bold ${isChecked ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {item.title}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
