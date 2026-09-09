import React from 'react';
import { Landmark, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8 text-xs text-slate-500 dark:text-slate-400 space-y-4">
      <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 dark:text-slate-300">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Landmark className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">데이터 출처 및 준거 법령</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              한국은행 발표 '2025년 중 전자지급서비스 이용 현황' · 금융위원회 전자금융거래법 개정안 가이드라인 · 여신전문금융업법 시행령
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>신뢰성 검증 완료</span>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 space-y-1">
        <p>
          본 분석 인포그래픽은 대한민국 전자지급결제대행(PG) 산업의 시장 구조, 수수료 산정 원리, 품목 심사 기준을 체계적으로 조망하기 위해 제작되었습니다.
        </p>
        <p>© 2026 PG Industry In-Depth Analysis Report. All rights reserved.</p>
      </div>
    </footer>
  );
};
