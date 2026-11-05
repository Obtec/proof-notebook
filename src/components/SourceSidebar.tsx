import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Search, 
  ChevronDown, 
  ArrowRight, 
  CheckSquare, 
  Square, 
  PanelLeftClose, 
  PanelLeft, 
  ExternalLink,
  Code,
  ShieldCheck,
  Globe,
  Zap,
  Sparkles
} from 'lucide-react';
import { SourceItem } from '../types';

interface SourceSidebarProps {
  sources: SourceItem[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onAddSource: (title: string, type: SourceItem['type']) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onInspectSource?: (source: SourceItem) => void;
}

export const SourceSidebar: React.FC<SourceSidebarProps> = ({
  sources,
  onToggleSelect,
  onToggleSelectAll,
  onAddSource,
  isOpen,
  onToggleOpen,
  onInspectSource
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [researchMode, setResearchMode] = useState('Fast Research');
  const [searchScope, setSearchScope] = useState('웹');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<SourceItem['type']>('pdf');

  const allSelected = sources.length > 0 && sources.every(s => s.selected);
  const someSelected = sources.some(s => s.selected);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onAddSource(searchQuery.trim(), 'web');
    setSearchQuery('');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddSource(newTitle.trim(), newType);
    setNewTitle('');
    setIsAddModalOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="border-r border-[#232733] bg-[#111317] w-12 flex flex-col items-center py-4 text-zinc-400 select-none">
        <button
          onClick={onToggleOpen}
          className="p-2 rounded-lg hover:bg-[#1a1e27] hover:text-zinc-200 transition"
          title="출처 패널 펼치기"
        >
          <PanelLeft className="w-5 h-5" />
        </button>
        <div className="writing-vertical mt-8 text-xs font-medium tracking-widest text-zinc-500 uppercase">
          SOURCES
        </div>
      </div>
    );
  }

  return (
    <aside className="w-80 flex-shrink-0 border-r border-[#232733] bg-[#101217] flex flex-col h-[calc(100vh-3.5rem)] select-none">
      {/* Top Header */}
      <div className="p-4 pb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-200 tracking-wide">
          출처
        </span>
        <button
          onClick={onToggleOpen}
          className="p-1.5 rounded-md hover:bg-[#1c202a] text-zinc-400 hover:text-zinc-200 transition"
          title="패널 접기"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 pb-3">
        {/* + 소스 추가 Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#181b22] hover:bg-[#202530] border border-[#2d3342] text-zinc-200 text-xs font-medium transition shadow-sm"
        >
          <Plus className="w-4 h-4 text-zinc-400" />
          <span>소스 추가</span>
        </button>
      </div>

      {/* Search Bar matching screenshot */}
      <div className="px-4 pb-4">
        <form onSubmit={handleSearchSubmit} className="bg-[#15181f] border border-[#272c3a] rounded-xl p-2.5 focus-within:border-cyan-500/50 transition">
          <input
            type="text"
            placeholder="웹에서 새 소스를 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-zinc-200 placeholder-zinc-500 outline-none pb-2"
          />
          <div className="flex items-center justify-between pt-1 border-t border-[#232735]">
            <div className="flex items-center space-x-1.5 text-[11px] text-zinc-400">
              <div className="flex items-center space-x-1 hover:text-zinc-200 cursor-pointer px-1.5 py-0.5 rounded hover:bg-[#1e232e]">
                <Globe className="w-3 h-3 text-zinc-400" />
                <span>{searchScope}</span>
                <ChevronDown className="w-2.5 h-2.5 text-zinc-500" />
              </div>
              <div className="flex items-center space-x-1 hover:text-zinc-200 cursor-pointer px-1.5 py-0.5 rounded hover:bg-[#1e232e]">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{researchMode}</span>
                <ChevronDown className="w-2.5 h-2.5 text-zinc-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="p-1 rounded-md bg-[#252b38] hover:bg-cyan-600 disabled:opacity-40 text-zinc-300 disabled:hover:bg-[#252b38] transition"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Select All Row */}
      <div className="px-4 py-2 border-t border-[#1e222c] flex items-center justify-between text-xs text-zinc-400">
        <button
          onClick={onToggleSelectAll}
          className="flex items-center space-x-2 hover:text-zinc-200 transition"
        >
          {allSelected ? (
            <CheckSquare className="w-4 h-4 text-cyan-400" />
          ) : (
            <Square className="w-4 h-4 text-zinc-500" />
          )}
          <span>모두 선택</span>
        </button>
        <span className="text-[11px] text-zinc-500 font-mono">
          {sources.filter(s => s.selected).length} / {sources.length}
        </span>
      </div>

      {/* Sources List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1.5 py-2">
        {sources.map((source) => {
          return (
            <div
              key={source.id}
              onClick={() => onInspectSource?.(source)}
              className={`group flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                source.selected 
                  ? 'bg-[#181c25] border-[#2f3647] text-zinc-200' 
                  : 'bg-[#12141a] border-transparent text-zinc-400 hover:bg-[#161922] hover:text-zinc-300'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                {/* Source Icon badge */}
                {source.type === 'pdf' && (
                  <span className="flex-shrink-0 px-1 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-400 font-mono text-[9px] uppercase font-bold">
                    pdf
                  </span>
                )}
                {source.type === 'doc' && (
                  <span className="flex-shrink-0 px-1 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-400 font-mono text-[9px] uppercase font-bold">
                    m↓
                  </span>
                )}
                {source.type === 'lean' && (
                  <span className="flex-shrink-0 px-1 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 font-mono text-[9px] uppercase font-bold">
                    lean
                  </span>
                )}
                {source.type === 'ledger' && (
                  <span className="flex-shrink-0 px-1 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-[9px] uppercase font-bold">
                    tx
                  </span>
                )}
                {source.type === 'web' && (
                  <span className="flex-shrink-0 px-1 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-400 font-mono text-[9px] uppercase font-bold">
                    web
                  </span>
                )}

                <div className="truncate">
                  <div className="truncate font-medium group-hover:text-white transition">
                    {source.title}
                  </div>
                  {source.sizeOrMeta && (
                    <div className="text-[10px] text-zinc-500 truncate font-mono">
                      {source.sizeOrMeta}
                    </div>
                  )}
                </div>
              </div>

              {/* Selection Checkbox */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect(source.id);
                }}
                className="p-1 hover:text-cyan-400 text-zinc-500 flex-shrink-0"
              >
                {source.selected ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Square className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Source Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14171f] border border-[#2b3142] rounded-2xl w-full max-w-md p-5 shadow-2xl text-zinc-200">
            <h3 className="text-base font-semibold text-white mb-2 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>새 출처 및 정형화 라이브러리 추가</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              논문 PDF, Markdown 연구 노트, Lean 4 파일 또는 First Prover Ledger 주소를 연결하세요.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-300 block mb-1">유형</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['pdf', 'doc', 'lean', 'ledger'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setNewType(t)}
                      className={`py-1.5 text-xs rounded-lg border uppercase font-mono font-medium ${
                        newType === t 
                          ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300' 
                          : 'bg-[#1a1e27] border-[#2e3445] text-zinc-400 hover:bg-[#202533]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">문서 / 정리 제목 또는 경로</label>
                <input
                  type="text"
                  placeholder="예: CategoryTheory.Equivalence.lean 혹은 논문 제목"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#1b1f2a] border border-[#2e3445] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-cyan-500"
                  autoFocus
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-[#1e2330] transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white disabled:opacity-50 transition"
                >
                  추가하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
};
