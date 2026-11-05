import React, { useState } from 'react';
import { 
  PanelRightClose, 
  PanelRight, 
  Mic, 
  Presentation, 
  Video, 
  Network, 
  FileText, 
  Layers, 
  HelpCircle, 
  BarChart3, 
  Table, 
  X, 
  Sparkles, 
  MoreVertical, 
  ShieldCheck, 
  SearchCode,
  StickyNote,
  CheckCircle,
  Play,
  Share2
} from 'lucide-react';

interface StudioSidebarProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onSelectTool: (toolId: string) => void;
  onOpenMemo: () => void;
  onSelectPreviousNote: (title: string) => void;
}

export const StudioSidebar: React.FC<StudioSidebarProps> = ({
  isOpen,
  onToggleOpen,
  onSelectTool,
  onOpenMemo,
  onSelectPreviousNote
}) => {
  const [showPromo, setShowPromo] = useState(true);

  if (!isOpen) {
    return (
      <div className="border-l border-[#232733] bg-[#111317] w-12 flex flex-col items-center py-4 text-zinc-400 select-none">
        <button
          onClick={onToggleOpen}
          className="p-2 rounded-lg hover:bg-[#1a1e27] hover:text-zinc-200 transition"
          title="스튜디오 패널 펼치기"
        >
          <PanelRight className="w-5 h-5" />
        </button>
        <div className="writing-vertical mt-8 text-xs font-medium tracking-widest text-zinc-500 uppercase">
          STUDIO
        </div>
      </div>
    );
  }

  const studioTools = [
    { id: 'audio', title: 'AI 오디오 오버뷰', icon: Mic, color: 'text-indigo-400' },
    { id: 'slides', title: '슬라이드 자료', icon: Presentation, color: 'text-fuchsia-400' },
    { id: 'video', title: '동영상 개요', icon: Video, color: 'text-emerald-400' },
    { id: 'tree', title: '마인드맵 / 증명트리', icon: Network, color: 'text-purple-400' },
    { id: 'report', title: '보고서', icon: FileText, color: 'text-pink-400', badge: 'New!' },
    { id: 'flashcards', title: '플래시카드', icon: Layers, color: 'text-amber-400' },
    { id: 'quiz', title: '퀴즈', icon: HelpCircle, color: 'text-cyan-400' },
    { id: 'infographic', title: '인포그래픽', icon: BarChart3, color: 'text-yellow-400' },
    { id: 'data-table', title: '데이터 표', icon: Table, color: 'text-blue-400' },
    { id: 'ledger-mint', title: 'First Prover 원장', icon: ShieldCheck, color: 'text-teal-400', badge: 'Ledger' },
    { id: 'counterexample', title: '반례 탐색기', icon: SearchCode, color: 'text-rose-400' },
  ];

  return (
    <aside className="w-80 flex-shrink-0 border-l border-[#232733] bg-[#101217] flex flex-col h-[calc(100vh-3.5rem)] select-none relative">
      {/* Top Header */}
      <div className="p-4 pb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-200 tracking-wide">
          스튜디오
        </span>
        <button
          onClick={onToggleOpen}
          className="p-1.5 rounded-md hover:bg-[#1c202a] text-zinc-400 hover:text-zinc-200 transition"
          title="패널 접기"
        >
          <PanelRightClose className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-4">
        {/* Promo Banner matching screenshot */}
        {showPromo && (
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#1f1d36] to-[#171b30] border border-purple-500/20 text-xs text-zinc-300 relative group">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] leading-snug text-zinc-200 mb-2">
                    이제 슬라이드와 동영상을 단계별로 만들 수 있습니다.
                  </p>
                  <button 
                    onClick={() => onSelectTool('slides')}
                    className="px-2.5 py-1 rounded-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 font-medium text-[11px] transition border border-purple-500/30"
                  >
                    사용해 보기
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowPromo(false)}
                className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 2-Column Tool Grid */}
        <div className="grid grid-cols-2 gap-2">
          {studioTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#161820] hover:bg-[#1e222d] border border-[#242937] hover:border-[#383f53] transition text-left group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <Icon className={`w-4 h-4 ${tool.color} flex-shrink-0 group-hover:scale-110 transition-transform`} />
                  <span className="text-xs text-zinc-300 group-hover:text-white truncate">
                    {tool.title}
                  </span>
                </div>
                {tool.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold flex-shrink-0 ml-1 ${
                    tool.badge === 'Ledger'
                      ? 'bg-teal-950/80 text-teal-300 border border-teal-500/30'
                      : 'bg-pink-950/80 text-pink-300 border border-pink-500/30'
                  }`}>
                    {tool.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-[#1e232e] pt-3">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            최근 탐색 및 저장된 연구
          </div>

          <div className="space-y-1">
            <div 
              onClick={() => onSelectPreviousNote('호모토피타입이론 학습로드맵')}
              className="group p-2.5 rounded-xl hover:bg-[#171b24] cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Network className="w-4 h-4 text-purple-400/80 flex-shrink-0" />
                <div className="truncate">
                  <div className="text-xs text-zinc-300 group-hover:text-white truncate font-medium">
                    호모토피타입이론 학습로드맵
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    소스 2개 · 28일 전
                  </div>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-zinc-300 transition"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>

            <div 
              onClick={() => onSelectPreviousNote('수학 공부')}
              className="group p-2.5 rounded-xl bg-[#161a24]/60 border border-purple-500/20 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Network className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div className="truncate">
                  <div className="text-xs text-cyan-200 group-hover:text-white truncate font-medium">
                    수학 공부 (현재 문서)
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    28일 전 · Lean 4 Verified
                  </div>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-zinc-300 transition"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating '메모 추가' pill button matching screenshot */}
      <div className="absolute bottom-4 right-4 z-10">
        <button
          onClick={onOpenMemo}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#1e2330] hover:bg-[#282f42] border border-[#343c52] text-zinc-200 text-xs font-medium shadow-lg hover:shadow-cyan-500/10 transition group"
        >
          <StickyNote className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span>메모 추가</span>
        </button>
      </div>
    </aside>
  );
};
