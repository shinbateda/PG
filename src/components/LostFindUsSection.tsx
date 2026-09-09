import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Smartphone, 
  Scale, 
  Building2, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Search, 
  FileQuestion, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Layers
} from 'lucide-react';

interface RecommendedPG {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  isPrimary?: boolean;
  priority: string;
  featureTitle: string;
  features: string;
  suitability: string;
  fitScore: number;
  tags: string[];
}

export const LostFindUsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pg-recommend' | 'action-items' | 'architecture' | 'simulator'>('pg-recommend');
  const [selectedPgId, setSelectedPgId] = useState<string>('portone');
  const [checkedActionItems, setCheckedActionItems] = useState<Record<string, boolean>>({
    'q1': true,
    'q2': false,
    'terms1': true,
    'terms2': true,
    'terms3': false,
    'rm1': false,
    'rm2': false,
    'id1': false,
    'id2': false,
  });

  // Simulator state
  const [rewardAmount, setRewardAmount] = useState<number>(1000000); // 1,000,000 KRW
  const [disputeTriggered, setDisputeTriggered] = useState<boolean>(false);
  const [numInformants, setNumInformants] = useState<number>(1);
  const [firstInformantRatio, setFirstInformantRatio] = useState<number>(100);

  const toggleActionItem = (key: string) => {
    setCheckedActionItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const recommendedPgs: RecommendedPG[] = [
    {
      id: 'portone',
      name: '포트원 (PortOne)',
      badge: '최우선 추천 · 시스템 결합도 최고',
      badgeColor: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      isPrimary: true,
      priority: '1순위 기술 연동 대상',
      featureTitle: 'Multi-PG 라우팅 오케스트레이션 SDK & 개발 친화적 REST API',
      features: '단일 인터페이스 SDK를 통해 토스페이먼츠, KG이니시스, NHN KCP 등 국내 전 PG망을 동시 연동하고 결제 수단별/금액별 최적 라우팅 지원.',
      suitability: 'LostFindUs 인터페이스 명세서(IF-SS-PG-001)에 신규 외부 SaaS PG로 명시되어 있어 시스템 결합도가 가장 높습니다. 향후 가맹점 심사 결과에 따라 복수 PG 전환 및 에스크로 연동이 가장 유연합니다.',
      fitScore: 98,
      tags: ['IF-SS-PG-001 명시', '단일 SDK', '멀티 PG 라우팅', '빠른 연동']
    },
    {
      id: 'toss',
      name: '토스페이먼츠 (Toss Payments)',
      badge: '스타트업 & 모바일 최적화',
      badgeColor: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      priority: '모바일 UX & 비실물 심사 유연',
      featureTitle: '빠른 정산, 개발자 중심 UI/UX, 무형 서비스 심사 전향적',
      features: '최신 결제위젯(Payment Widget) 지원, 간결한 REST API와 웹훅, 무형의 서비스성 콘텐츠 및 C2C 중개 거래에 대한 개방적 심사 태도.',
      suitability: '스타트업 및 모바일 환경에 가장 최적화되어 결제 전환율이 높고, 비실물/서비스성 콘텐츠 심사에 전향적이어서 C2C 보상금 에스크로 모델 검토 시 협상 가능성이 높습니다.',
      fitScore: 92,
      tags: ['결제위젯 UI', '무형 심사 개방적', '모바일 전환율', '개발자 문서']
    },
    {
      id: 'inicis-kcp',
      name: 'KG이니시스 / NHN KCP',
      badge: '국내 1위 대형 PG · 최고 공신력',
      badgeColor: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      priority: '공식 사전 질의 1순위 대상',
      featureTitle: '국내 최상위 시장 점유율, 막강한 재무 건전성 및 정부 공신력',
      features: '수십조 원대 연간 거래량 처리 노하우, 완벽한 은행/카드사 직접망, 2026 전금법 100% 신탁 예치 의무화에 최적화된 안정적 자금 관리.',
      suitability: '전자금융거래법 개정 시행에 따라 대금 안전성이 완전히 입증된 대형사로, 유저 신뢰 확보 및 고액 보상금 거래 시 리스크 관리에 유리합니다. 대표이사 검토의견서 내 공식 질의 1순위 대상입니다.',
      fitScore: 90,
      tags: ['전금법 최고 안전성', '대형 공신력', '고액 거래 관리', '질의 1순위']
    },
    {
      id: 'welcome',
      name: '웰컴페이먼츠 (Welcome Payments)',
      badge: '대안 · 특수/고위험 심사 구원투수',
      badgeColor: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      priority: '심사 거절 시 백업 플랜',
      featureTitle: 'C2C, 중개 플랫폼, 특수/고위험 업종 전용 맞춤 심사',
      features: '제도권 1군 PG사가 기피하는 C2C 매칭, 3자간 용역비 정산, 특수 플랫폼 거래에 대해 보증보험 한도 조건부로 유연 승인 제공.',
      suitability: '일반 PG사가 "현상금/보상금 예치"를 3자간 단순 금전 거래로 간주하여 심사를 거절할 경우, SGI서울보증보험 한도 증액을 전제로 가입 승인을 얻을 수 있는 강력한 리스크 헤지 구원투수입니다.',
      fitScore: 86,
      tags: ['심사 거절 대비', 'C2C 플랫폼 특화', '보증보험 담보 승인', '리스크 헤지']
    }
  ];

  const selectedPg = recommendedPgs.find((p) => p.id === selectedPgId) || recommendedPgs[0];

  // Simulator calculations
  const pgFeeRate = 0.033; // 3.3% PG 카드 결제 수수료
  const sgiRate = 0.00536; // 0.536% SGI 서울보증보험
  const pgFee = Math.round(rewardAmount * pgFeeRate);
  const sgiFee = Math.round(rewardAmount * sgiRate);
  const passAuthCost = 200 * numInformants; // PASS 본인인증 건당 200원
  const totalDeductions = pgFee + sgiFee + passAuthCost;
  const netRewardPool = rewardAmount - totalDeductions;

  // Informant distribution
  const informant1Payout = numInformants === 1 ? netRewardPool : Math.round(netRewardPool * (firstInformantRatio / 100));
  const informant2Payout = numInformants > 1 ? netRewardPool - informant1Payout : 0;

  return (
    <section id="lostfindus" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Case Study · LostFindUs 실종 보상금 에스크로 특화</span>
          </div>
          <span className="text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full">
            Notion 연계 프로젝트 분석 리포트
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          LostFindUs 실종 보상금 에스크로 연동 전략 및 PG 계약 사전 준비
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-4xl">
          LostFindUs는 피보호자·반려동물 실종 시 보호자가 보상금을 예치하고, 결정적 제보를 제공한 구조자에게 안전하게 정산 지급하는 C2C 매칭 플랫폼입니다. 
          플랫폼은 자금을 직접 수취·보관하지 않는 <strong>'Witness &amp; Verifier(목격·검증자)' 지위</strong>를 엄격히 견지하며, 
          공인된 PG사의 에스크로 망을 연동하기 위한 <strong>최적 PG사 선정 기준과 4대 사전 Action Item</strong>을 제시합니다.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('pg-recommend')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'pg-recommend'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>1. 맞춤형 PG사 추천 및 사유</span>
        </button>

        <button
          onClick={() => setActiveTab('action-items')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'action-items'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>2. PG 계약 전 필수 4대 Action Items</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'architecture'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>3. Witness &amp; Verifier 아키텍처</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>4. 보상금 에스크로 &amp; 분쟁 시뮬레이터</span>
        </button>
      </div>

      {/* TAB 1: PG Recommendations */}
      {activeTab === 'pg-recommend' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-blue-50/60 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-200/80 dark:border-blue-900/40 flex items-start space-x-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>플랫폼 특화 평가 기준:</strong> LostFindUs는 자금을 직접 보유하지 않고 PG사 에스크로 계좌를 활용해야 합니다. 
              C2C 보상금 중개, 비실물 구조 용역의 심사 수용성, 그리고 시스템 개발 명세서(IF-SS-PG-001) 준수 여부를 기준으로 4개 사를 단계별로 선정했습니다.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* PG List Selector (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                추천 PG사 선택 (비교 검토)
              </label>
              {recommendedPgs.map((pg) => {
                const isSelected = pg.id === selectedPgId;
                return (
                  <div
                    key={pg.id}
                    onClick={() => setSelectedPgId(pg.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-blue-950/50 border-blue-500 shadow-md ring-1 ring-blue-500/30'
                        : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                            {pg.name}
                          </h4>
                          {pg.isPrimary && (
                            <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                              BEST
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border mt-1 inline-block ${pg.badgeColor}`}>
                          {pg.badge}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        적합도 {pg.fitScore}점
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                      {pg.features}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {pg.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PG Detail Spec Card (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/70 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-700 pb-3 flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                      {selectedPg.priority}
                    </span>
                    <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                      {selectedPg.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                      {selectedPg.featureTitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">LostFindUs 정합성</span>
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      {selectedPg.fitScore}<span className="text-xs font-normal text-slate-500"> / 100</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                      주요 기능 및 핵심 기술 경쟁력
                    </span>
                    <div className="p-3.5 bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedPg.features}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1 flex items-center space-x-1.5">
                      <span>🎯</span>
                      <span>LostFindUs 서비스 적합성 및 추천 사유</span>
                    </span>
                    <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {selectedPg.suitability}
                    </div>
                  </div>

                  {selectedPg.id === 'portone' && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-300 text-[11px] space-y-1">
                      <div className="font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>개발 명세서 IF-SS-PG-001 구현 전략</span>
                      </div>
                      <p>
                        LostFindUs 인터페이스 명세서에 수록된 신규 외부 SaaS PG 규격에 일치하므로 백엔드 결제 라우팅 레이어를 포트원 단일 SDK로 추상화하여 구현 복잡도를 70% 이상 단축할 수 있습니다.
                      </p>
                    </div>
                  )}

                  {selectedPg.id === 'welcome' && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-[11px] space-y-1">
                      <div className="font-bold flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>대형사 심사 보류 시 Plan B 조치</span>
                      </div>
                      <p>
                        대형 PG사에서 C2C 현상금/보상금 예치를 기부성 또는 현금성 환금 거래로 오인하여 보류할 경우, 웰컴페이먼츠와 SGI서울보증보험 한도 협상을 통해 정식 런칭 일정을 방어할 수 있습니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500">
                <span>권장 적용 시점: {selectedPg.priority}</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  전체 비교 검토 완료
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Action Items */}
      {activeTab === 'action-items' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                PG 계약 체결 전 필수 사전 준비 4대 분야 (Action Items)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                PG 계약 및 심사를 무사히 통과하고 플랫폼의 법적·재무적 리스크를 원천 차단하기 위한 사전 조치 체크리스트입니다.
              </p>
            </div>
            <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-xl">
              완료율 {Object.values(checkedActionItems).filter(Boolean).length} / 9
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item 1: 질의서 발송 및 유효성 확보 */}
            <div className="bg-white dark:bg-slate-850 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-2xs">
              <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    '실종 보상금 에스크로' 유효성 사전 질의
                  </h5>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">공식 서면 회신 선확보</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div 
                  onClick={() => toggleActionItem('q1')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['q1']} 
                    readOnly 
                    className="mt-0.5 rounded text-blue-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">보상금 거래 성격 재정의:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      단순 현금 수수나 기부/현상금이 아닌 <strong>'실종 대상 구조 및 유효 제보 제공에 대한 구조 용역 대금'</strong>으로 거래 명분을 확립하여 심사 거절 방지.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleActionItem('q2')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['q2']} 
                    readOnly 
                    className="mt-0.5 rounded text-blue-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">주요 PG 3사 공식 질의서 발송:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      KG이니시스, 토스페이먼츠, NHN KCP에 <em>「실종동물/피보호자 현상금 예치 및 정산 수용 가능 여부」</em> 질의서를 발송하여 서면 승인 사전 획득.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2: 이용약관 명문화 및 법적 지위 확립 */}
            <div className="bg-white dark:bg-slate-850 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-2xs">
              <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    이용약관 명문화 및 법적 지위 확립
                  </h5>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">면책 및 분쟁 해결 조항</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div 
                  onClick={() => toggleActionItem('terms1')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['terms1']} 
                    readOnly 
                    className="mt-0.5 rounded text-indigo-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">통신판매중개자 지위 명시:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      약관상 플랫폼은 매매 당사자가 아닌 '중개자'임을 명시하여 정산 사고 및 사기 발생 시 민·형사상 대위 책임을 차단.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleActionItem('terms2')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['terms2']} 
                    readOnly 
                    className="mt-0.5 rounded text-indigo-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">지급 보류 (Dispute Hold) 조항:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      허위 제보, 자작극, 기여도 분쟁 발생 시 사실 확인 완료 전까지 정산을 일시 보류할 수 있는 독점적 통제 권한 명문화.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleActionItem('terms3')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['terms3']} 
                    readOnly 
                    className="mt-0.5 rounded text-indigo-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">기여도 분배 법정 원칙 적용:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      복수 제보 시 <strong>'최초 결정적 제보자 우선 원칙'</strong>을 기본값으로 하고, 보호자 임의 비율 지정은 전원 서면 동의 시에만 허용.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: PG RM 심사용 웹/앱 환경 준비 */}
            <div className="bg-white dark:bg-slate-850 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-2xs">
              <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    PG RM(Risk Management) 심사 환경 구축
                  </h5>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">데모 사이트 &amp; 보증보험 증권</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div 
                  onClick={() => toggleActionItem('rm1')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['rm1']} 
                    readOnly 
                    className="mt-0.5 rounded text-amber-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">테스트 결제 사이트(프로토타입) 개설:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      심사팀이 직접 확인 가능한 결제/예치 UI, 취소·환불 규정, 고객센터 전화번호 및 사업자등록번호 하단 푸터 완비.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleActionItem('rm2')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['rm2']} 
                    readOnly 
                    className="mt-0.5 rounded text-amber-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">SGI서울보증보험 이행보증보험증권 발급 준비:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      C2C 보상 거래 특성에 따른 담보 요구에 대비하여 대표자/법인 신용점수 확인 및 3천만~5천만 원 한도 사전 심사 점검.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 4: 본인인증 및 세무 처리 연동 체계 */}
            <div className="bg-white dark:bg-slate-850 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-2xs">
              <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    본인인증 및 세무 처리 연동 체계 구축
                  </h5>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">PASS 실명 연동 &amp; 기타소득 원천징수</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div 
                  onClick={() => toggleActionItem('id1')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['id1']} 
                    readOnly 
                    className="mt-0.5 rounded text-cyan-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">통신 3사 PASS 본인인증 시스템 연동:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      보상금 수취 제보자의 부정 수급, 자작극, 명의 도용을 방지하고 정확한 수혜자 식별을 위한 CI/DI 본인인증 파이프라인 구축.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleActionItem('id2')}
                  className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
                >
                  <input 
                    type="checkbox" 
                    checked={checkedActionItems['id2']} 
                    readOnly 
                    className="mt-0.5 rounded text-cyan-600 cursor-pointer" 
                  />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100 block">세무 과세 최저한 및 원천징수 사전 검토:</strong>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                      보상금(현상금) 지급 시 발생하는 기타소득 건별 과세 최저한(5만 원 이하 비과세) 적용 여부 및 사업소득세 원천징수 신고 전담 세무 검토.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Witness & Verifier Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  플랫폼 법적 지위 아키텍처
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                  Witness &amp; Verifier (목격자 &amp; 검증자) 결제 모델
                </h4>
              </div>
              <span className="text-xs bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/30">
                전자금융거래법 신탁 의무화 준수
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              LostFindUs는 금전을 플랫폼 법인 통장으로 직접 수취하지 않습니다. 자금을 직접 보관할 경우 전금법상 전자지급결제대행업 라이선스 위반 또는 
              티메프 사태 이후 강화된 외부 예치 신탁 의무 위반에 직면하게 됩니다. 따라서 <strong>보상금 전액을 금융위 등록 PG사의 에스크로 가상계좌에 직접 예치</strong>시키고, 
              플랫폼은 제보의 진위성과 기여도만을 기술적으로 검증하여 정산 트리거를 전송하는 신탁형 구조를 취합니다.
            </p>

            {/* Architecture Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-xs">
              {/* Step 1 */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[11px]">
                  1
                </div>
                <div className="font-bold text-blue-300">보호자 (의뢰인)</div>
                <p className="text-[11px] text-slate-300">
                  실종 공고 등록 및 보상금 결제 승인 요청 (신용카드/가상계좌)
                </p>
                <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded block">
                  AOV 50만~300만 원
                </span>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[11px]">
                  2
                </div>
                <div className="font-bold text-indigo-300">PG사 에스크로 예치</div>
                <p className="text-[11px] text-slate-300">
                  플랫폼 통장을 거치지 않고 <strong>PG사 명의 에스크로 계좌</strong>에 안전 분리 예치
                </p>
                <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded block">
                  플랫폼 횡령 리스크 0%
                </span>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-cyan-500/50 space-y-2 ring-1 ring-cyan-400/40">
                <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-[11px]">
                  3
                </div>
                <div className="font-bold text-cyan-300">LostFindUs (Witness)</div>
                <p className="text-[11px] text-slate-300">
                  구조·제보 진위 검증, PASS 실명 인증 확인, 분쟁 시 <strong>Dispute Hold</strong> 발동
                </p>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded block">
                  트리거 시그널만 PG 전달
                </span>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[11px]">
                  4
                </div>
                <div className="font-bold text-emerald-300">제보자 / 구조자</div>
                <p className="text-[11px] text-slate-300">
                  검증 완료 후 PG사에서 제보자 계좌로 <strong>구조 용역 대금</strong> 직송금 정산
                </p>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded block">
                  원천징수/비과세 처리
                </span>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-start space-x-3 text-xs">
              <Scale className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-white">법적 안정성 핵심 요약</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  LostFindUs는 결제 대행 직접 라이선스 없이도 합법적인 C2C 에스크로 매칭을 운영할 수 있으며, 
                  회원 탈퇴, 허위 제보, 자작극 발생 시 PG사에 결제 취소 또는 지급 보류(Hold) 명령을 전송하여 분쟁을 통제합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Reward Escrow & Dispute Simulator */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  LostFindUs 실종 보상금 정산 &amp; 리스크 시뮬레이터
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  보상금 규모와 제보 인원, 분쟁 발생 여부에 따른 PG 수수료, SGI 보증보험, 제보자 실지급액을 실시간 산정합니다.
                </p>
              </div>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-bold px-3 py-1 rounded-xl">
                실제 수수료율 반영
              </span>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              {/* Reward Slider */}
              <div className="space-y-2 bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-700 dark:text-slate-300">보호자 보상금 예치액:</span>
                  <span className="text-blue-600 dark:text-blue-400 text-sm">
                    {rewardAmount.toLocaleString()}원
                  </span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="5000000"
                  step="100000"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>20만 원</span>
                  <span>100만 원</span>
                  <span>500만 원</span>
                </div>
              </div>

              {/* Informants Count */}
              <div className="space-y-2 bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-700 dark:text-slate-300">결정적 제보자 수:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm">
                    {numInformants}명 {numInformants === 1 ? '(단독 제보)' : '(복수 기여)'}
                  </span>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => { setNumInformants(1); setFirstInformantRatio(100); }}
                    className={`flex-1 py-1.5 rounded-lg border font-medium cursor-pointer transition ${
                      numInformants === 1
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    단독 제보자 (1인 100%)
                  </button>
                  <button
                    onClick={() => { setNumInformants(2); setFirstInformantRatio(70); }}
                    className={`flex-1 py-1.5 rounded-lg border font-medium cursor-pointer transition ${
                      numInformants === 2
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    복수 제보자 (2인 분할)
                  </button>
                </div>
              </div>

              {/* Dispute Toggle */}
              <div className="space-y-2 bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-700 dark:text-slate-300">허위/자작극 분쟁 여부:</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    disputeTriggered ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {disputeTriggered ? 'Dispute Hold 발동' : '정상 정산 흐름'}
                  </span>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => setDisputeTriggered(!disputeTriggered)}
                    className={`w-full py-1.5 rounded-lg border font-semibold cursor-pointer transition ${
                      disputeTriggered
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {disputeTriggered ? '⚠️ 분쟁 해제 및 정산 재개' : '🚨 제보 분쟁 발생 (Hold 테스트)'}
                  </button>
                </div>
              </div>
            </div>

            {/* If 2 informants, show ratio slider */}
            {numInformants > 1 && (
              <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/80 text-xs space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-indigo-950 dark:text-indigo-200">
                    기여도 분배 비율 설정 (법정 원칙: 최초 결정 제보자 우선):
                  </span>
                  <span className="text-indigo-700 dark:text-indigo-300 font-extrabold">
                    제보자 A ({firstInformantRatio}%) : 제보자 B ({100 - firstInformantRatio}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={firstInformantRatio}
                  onChange={(e) => setFirstInformantRatio(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            )}

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Left: Cost Breakdown */}
              <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">
                  결제 및 리스크 담보 비용 공제 내역
                </span>

                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                    <span>예치 총액 (보호자 결제):</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {rewardAmount.toLocaleString()}원
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span>PG 신용카드 수수료 (3.3%):</span>
                    <span className="text-rose-600 dark:text-rose-400">
                      - {pgFee.toLocaleString()}원
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span>SGI 서울보증보험 요율 (약 0.536%):</span>
                    <span className="text-rose-600 dark:text-rose-400">
                      - {sgiFee.toLocaleString()}원
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px]">
                    <span>PASS 실명 본인인증 비용 ({numInformants}건 × 200원):</span>
                    <span className="text-rose-600 dark:text-rose-400">
                      - {passAuthCost.toLocaleString()}원
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-slate-100">
                    <span>실지급 가용 보상금 풀:</span>
                    <span className="text-blue-600 dark:text-blue-400 text-base">
                      {netRewardPool.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Informant Payout & Dispute Status */}
              <div className={`p-5 rounded-2xl border space-y-3 text-xs transition-all ${
                disputeTriggered
                  ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/60'
                  : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900/60'
              }`}>
                <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {disputeTriggered ? '⚠️ 분쟁 상태 (Dispute Hold 중)' : '✅ 최종 정산 분배 결과'}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    disputeTriggered ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {disputeTriggered ? '지급 일시 보류' : '즉시 정산 가능'}
                  </span>
                </div>

                {disputeTriggered ? (
                  <div className="space-y-2 text-rose-900 dark:text-rose-300 text-xs">
                    <p className="font-semibold leading-relaxed">
                      이용약관 '분쟁 해결 및 지급 보류' 조항에 따라 PG사 정산 파이프라인이 일시 정지되었습니다.
                    </p>
                    <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-rose-200 dark:border-rose-950 text-[11px] space-y-1">
                      <div><strong>보류 사유:</strong> 허위 제보 의혹 / 자작극 / 기여도 분쟁 접수</div>
                      <div><strong>보관 위치:</strong> PG사 안전 에스크로 계좌 (플랫폼 훼손 불가)</div>
                      <div><strong>후속 조치:</strong> 진위 확인 증빙 제출 완료 시 정산 재개 또는 보호자 카드 결제 전액 취소</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-emerald-200 dark:border-emerald-950 text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>제보자 A (최초 결정 제보):</span>
                        <span className="text-emerald-700 dark:text-emerald-400 text-sm">
                          {informant1Payout.toLocaleString()}원
                        </span>
                      </div>
                      {numInformants > 1 && (
                        <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200 pt-1 border-t border-slate-100 dark:border-slate-800">
                          <span>제보자 B (보조 제보):</span>
                          <span className="text-indigo-700 dark:text-indigo-400 text-sm">
                            {informant2Payout.toLocaleString()}원
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                      <p>• <strong>세무 참고:</strong> 보상금 건당 5만 원 이하 비과세이며, 5만 원 초과 시 기타소득(8.8% 또는 22%) 원천징수 대상 여부 사전 검토 필요.</p>
                      <p>• <strong>본인인증:</strong> 제보자의 PASS 실명과 정산 수취 계좌 예금주 일치 확인 완료 후 입금 처리.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
