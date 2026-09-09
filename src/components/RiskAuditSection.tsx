import React, { useState } from 'react';
import { RESTRICTED_ITEMS } from '../data/pgData';
import { RiskItem } from '../types';
import {
  AlertTriangle,
  Ban,
  ShieldAlert,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  BadgePercent,
  Sparkles,
} from 'lucide-react';

export const RiskAuditSection: React.FC = () => {
  const [selectedRiskItem, setSelectedRiskItem] = useState<RiskItem>(RESTRICTED_ITEMS[9]); // 피트니스 연간권 default
  const [searchTerm, setSearchTerm] = useState<string>('');

  const bannedItems = RESTRICTED_ITEMS.filter((i) => i.type === 'banned');
  const highRiskItems = RESTRICTED_ITEMS.filter((i) => i.type === 'high_risk');

  const filteredItems = RESTRICTED_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="risk-audit" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-8">
      {/* Section Title */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>Section 04 · 취급 제한 및 고위험 심사</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          취급 제한 품목 분류 및 고위험 업종 심사 체계
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-4xl">
          PG사는 여신전문금융업법, 자금세탁방지(AML), 공정거래위원회 전자상거래법 및 리스크 관리(RM) 규정에 따라 
          품목을 철저히 심사합니다. <strong>100% 가입이 불가한 원천 금지 품목</strong>과 
          보증보험·롤링 리저브 등 사전 리스크 담보를 통해 <strong>조건부 허용되는 고위험 품목</strong>으로 구분됩니다.
        </p>
      </div>

      {/* 2 Big Blocks: Banned vs High Risk 4 Core Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Block 1: 100% Banned Items */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl p-6 border border-rose-200/80 dark:border-rose-900/40 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-rose-200/70 dark:border-rose-900/40 pb-3">
              <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-400">
                <Ban className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <h4 className="font-bold text-lg">전 PG사 가입 원천 금지 품목 (100% 거절)</h4>
              </div>
              <span className="text-[11px] bg-rose-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                신규 계약 불가
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              카드깡 대출 사기, 불법 자금세탁, 특별법 위반에 해당하여 8개 카드사 및 금감원 공통 가이드라인상 전자결제 도입이 법적으로 불가능합니다.
            </p>

            <div className="space-y-3 text-xs">
              <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-rose-100 dark:border-rose-950/80 shadow-2xs space-y-1">
                <span className="font-bold text-rose-900 dark:text-rose-300 block flex items-center space-x-1">
                  <span>🪙</span>
                  <span>환금성 자산 및 단기 현금화 경로</span>
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  순금, 골드바, 가상화폐, 백화점 상품권 전문 판매점, 유사투자자문(리딩방), 대부업, 복권, 다단계 판매
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-rose-100 dark:border-rose-950/80 shadow-2xs space-y-1">
                <span className="font-bold text-rose-900 dark:text-rose-300 block flex items-center space-x-1">
                  <span>🔞</span>
                  <span>불법 및 미풍양속 저해 품목</span>
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  마약류, 도검/모의총포, 성인 음란물 및 불법 성인용품, 온라인 도박/카지노, 위조 상품(레플리카), 흥신소/심부름센터
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-rose-100 dark:border-rose-950/80 shadow-2xs space-y-1">
                <span className="font-bold text-rose-900 dark:text-rose-300 block flex items-center space-x-1">
                  <span>💊</span>
                  <span>개별 특별법 규제 위반 상품</span>
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  처방 의약품(보톡스/필러/다이어트약), 도수 안경 및 콘택트렌즈 온라인 판매, 액상 전자담배(니코틴 함유), 무등록 비자 발급 대행
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-rose-700 dark:text-rose-300 bg-rose-100/60 dark:bg-rose-950/60 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/60 mt-2">
            ⚠️ <strong>우회 적발 시 조치:</strong> 타 업종으로 위장 가맹 등록(소위 '코드 갈이') 적발 시 즉시 전 카드사 거래 정지 및 형사 고발 조치됩니다.
          </div>
        </div>

        {/* Block 2: 4 Core Risk Factors for High-Risk Categories */}
        <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl p-6 border border-amber-200/80 dark:border-amber-900/40 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200/70 dark:border-amber-900/40 pb-3">
              <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-400">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-bold text-lg">고위험 업종 판단 4대 핵심 리스크 요인</h4>
              </div>
              <span className="text-[11px] bg-amber-500 text-white font-bold px-2.5 py-0.5 rounded-full">
                조건부 승인 대상
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              취급 자체가 불법은 아니지만, PG사가 최종적인 환불·부도 책임을 져야 하는 구조적 결제 특성을 지닌 업종들입니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-amber-100 dark:border-amber-950/80 shadow-2xs space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-300 block">1. 초고가 결제 단가 (AOV)</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  평균 단가 100만 원 초과 명품, 프리미엄 가구 등. 단 1건의 카드 도용 사기 시 PG사 수백만 원대 손실 직면.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-amber-100 dark:border-amber-950/80 shadow-2xs space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-300 block">2. 장기 배송 &amp; 선결제 시차</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  피트니스 연간권, 프리오더 펀딩. 3~12개월 뒤 사업자 먹튀·폐업 시 소비자 할부 항변권 발생으로 PG사 독박 환불.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-amber-100 dark:border-amber-950/80 shadow-2xs space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-300 block">3. C2C 책임 소재 모호성</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  개인 간 중고 거래, 숙박 공유. 허위 매물 및 거래 사기 발생 시 에스크로 라이선스 없는 플랫폼은 분쟁 집중.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900/90 p-3.5 rounded-xl border border-amber-100 dark:border-amber-950/80 shadow-2xs space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-300 block">4. 디지털 캐시 우회 자금화</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  웹툰 캐시, 게임 아이템, 플랫폼 포인트 충전. 깡 조직의 대포폰 결제 유출 방지를 위한 엄격한 환불 규정 심사.
                </p>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/60 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/60 mt-2">
            💡 <strong>승인 해법:</strong> 충분한 보증보험 증권 발급, 에스크로 안전결제 적용, 엄격한 이상거래탐지(FDS) 연동 시 가입 가능.
          </div>
        </div>
      </div>

      {/* Risk Hedge Mechanism Comparison Box */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <BadgePercent className="w-4 h-4" />
            </div>
            <h4 className="text-lg font-bold text-cyan-300">
              고위험 가맹점 리스크 헤지(Hedge) 금융 수단 비교
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            국내: SGI 보증보험 vs 해외: 롤링 리저브
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
          {/* SGI Seoul Guarantee */}
          <div className="bg-slate-800/80 dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-300 text-sm flex items-center space-x-1.5">
                <span>🏛️</span>
                <span>국내 가맹점: SGI 서울보증보험</span>
              </span>
              <span className="bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                국내 PG 필수 증권
              </span>
            </div>
            <p className="text-slate-300">
              가맹점이 결제 대금을 받은 뒤 부도·폐업하여 소비자 환불을 못 할 경우, SGI 서울보증이 PG사에 손실액을 대신 변제하는 보험 증권입니다.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-700/60 dark:border-slate-800 text-slate-300 text-[11px]">
              <div className="flex justify-between">
                <span>보증보험 연 요율:</span>
                <span className="text-white font-bold">0.013% ~ 1.789% (평균 약 0.536%)</span>
              </div>
              <div className="flex justify-between">
                <span>신용점수 기준:</span>
                <span className="text-amber-300 font-bold">KCB 631점 이상 / NICE 664점 이상</span>
              </div>
              <div className="flex justify-between">
                <span>저신용자 탈락 위험:</span>
                <span className="text-rose-400 font-bold">증권 발급 거절 시 국내 PG 입점 불가</span>
              </div>
            </div>
          </div>

          {/* Rolling Reserve */}
          <div className="bg-slate-800/80 dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 text-sm flex items-center space-x-1.5">
                <span>🌐</span>
                <span>글로벌/해외 결제: 롤링 리저브 (Rolling Reserve)</span>
              </span>
              <span className="bg-cyan-500/30 text-cyan-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                글로벌 표준 리스크 담보
              </span>
            </div>
            <p className="text-slate-300">
              국내 보증보험 가입이 불가능한 해외 법인이나 크로스보더 커머스를 위해, <strong>정산 대금의 5%~10%를 180일(6개월) 동안 PG사 안전 계좌에 묶어두는</strong> 방식입니다.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-700/60 dark:border-slate-800 text-slate-300 text-[11px]">
              <div className="flex justify-between">
                <span>유보 비율:</span>
                <span className="text-white font-bold">매출액의 5% ~ 10% 유치</span>
              </div>
              <div className="flex justify-between">
                <span>유보 기간:</span>
                <span className="text-cyan-300 font-bold">180일 (비자/마스터 차지백 소송 최대 기한)</span>
              </div>
              <div className="flex justify-between">
                <span>적용 분야:</span>
                <span className="text-slate-200">페이레터, 엑심베이, 페이팔, 스트라이프</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Audit Checker Tool */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                품목별 PG 심사 통과 가능성 &amp; 적합 PG 진단기
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                판매하고자 하는 상품이나 업종을 선택하여 실시간 심사 승인 난이도와 필수 담보 수단을 확인하세요.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Tag Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            테스트할 대표 품목 선택:
          </label>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {RESTRICTED_ITEMS.map((item) => {
              const isSelected = selectedRiskItem.id === item.id;
              const isBanned = item.type === 'banned';
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedRiskItem(item)}
                  className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? isBanned
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs font-bold'
                        : 'bg-blue-600 text-white border-blue-600 shadow-xs font-bold'
                      : isBanned
                      ? 'bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {isBanned ? '⛔ ' : '⚠️ '}
                  {item.name.split(' (')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Result Card */}
        {selectedRiskItem && (
          <div
            className={`rounded-2xl p-6 border transition-all ${
              selectedRiskItem.type === 'banned'
                ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/60'
                : 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-300 dark:border-blue-900/60'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 border-slate-200/80 dark:border-slate-800">
              <div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    selectedRiskItem.type === 'banned'
                      ? 'bg-rose-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {selectedRiskItem.type === 'banned' ? '가입 원천 금지' : '조건부 승인 고위험'}
                </span>
                <h5 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {selectedRiskItem.name}
                </h5>
                <span className="text-xs text-slate-500 dark:text-slate-400">분류: {selectedRiskItem.category}</span>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500 dark:text-slate-400">심사 승인 난이도</div>
                <div
                  className={`text-base font-extrabold ${
                    selectedRiskItem.approvalDifficulty === 'impossible'
                      ? 'text-rose-600 dark:text-rose-400'
                      : selectedRiskItem.approvalDifficulty === 'very_high'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {selectedRiskItem.approvalDifficulty === 'impossible'
                    ? '100% 불허 (가입 불가)'
                    : selectedRiskItem.approvalDifficulty === 'very_high'
                    ? '매우 까다로움 (보증 필수)'
                    : '조건부 통과 가능'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">판정 사유 및 법적 근거</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedRiskItem.reason}</p>
              </div>

              <div className="space-y-2 bg-white/70 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                {selectedRiskItem.type === 'banned' ? (
                  <div className="text-rose-700 dark:text-rose-400 font-medium">
                    ❌ 대안 없음: 온라인 전자결제 대행 가입이 법적으로 불가능하며 우회 가맹 시 즉시 영구 거래 정지됩니다.
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">필수 리스크 담보 요건:</span>
                      <p className="text-blue-900 dark:text-blue-300 font-medium mt-0.5">
                        {selectedRiskItem.hedgeDetails}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">추천 승인 파트너 PG:</span>
                      <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                        {selectedRiskItem.recommendedPgTier}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
