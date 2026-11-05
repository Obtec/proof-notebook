import React, { useState } from 'react';
import { 
  Plus, 
  Share2, 
  MoreVertical, 
  Settings, 
  Grid, 
  CheckCircle2, 
  ShieldCheck, 
  Code2, 
  Sparkles,
  GitBranch,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onOpenShareModal: () => void;
  onOpenNewNotebook: () => void;
  onToggleGoalTreeModal: () => void;
  onToggleLedgerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onTitleChange,
  onOpenShareModal,
  onOpenNewNotebook,
  onToggleGoalTreeModal,
  onToggleLedgerModal
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleTitleSubmit = () => {
    if (tempTitle.trim()) {
      onTitleChange(tempTitle.trim());
    } else {
      setTempTitle(title);
    }
    setIsEditing(false);
  };

  return (
    <header className="h-14 border-b border-[#232733] bg-[#0c0e12] px-4 flex items-center justify-between text-zinc-200 select-none sticky top-0 z-40">
      {/* Left: Brand Icon + Notebook Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/30 border border-cyan-500/40 text-cyan-400">
          <BookOpen className="w-4 h-4" />
        </div>

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
              autoFocus
              className="bg-[#1a1e27] text-white px-2 py-0.5 rounded text-base font-medium outline-none border border-cyan-500/60"
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 group cursor-pointer hover:bg-[#181c24] px-2 py-1 rounded transition"
              title="클릭하여 노트북 제목 변경"
            >
              <h1 className="text-base font-semibold text-zinc-100 tracking-tight">
                {title}
              </h1>
              <span className="text-[11px] text-zinc-500 group-hover:text-zinc-400">✎</span>
            </div>
          )}

          {/* Verification Badge */}
          <div className="hidden md:flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lean 4.14 Kernel: QED</span>
          </div>

          {/* First Prover Ledger Badge */}
          <button
            onClick={onToggleLedgerModal}
            className="hidden lg:flex items-center space-x-1 px-2 py-0.5 rounded-full bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono transition"
            title="최초 증명자 관계형 원장(Ledger) 확인"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>First Prover #0x8F4E</span>
          </button>
        </div>
      </div>

      {/* Right actions matching Google NotebookLM */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* + 노트북 만들기 */}
        <button
          onClick={onOpenNewNotebook}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1c202a] hover:bg-[#252b38] border border-[#2e3444] text-xs font-medium text-zinc-200 transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">노트북 만들기</span>
        </button>

        {/* 공유 */}
        <button
          onClick={onOpenShareModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1c202a] hover:bg-[#252b38] border border-[#2e3444] text-xs font-medium text-zinc-200 transition"
        >
          <Share2 className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">공유</span>
        </button>

        {/* 더보기 */}
        <button 
          onClick={onToggleGoalTreeModal}
          title="증명 분기 트리 보기"
          className="p-1.5 rounded-full hover:bg-[#1f2430] text-zinc-400 hover:text-zinc-200 transition"
        >
          <GitBranch className="w-4 h-4" />
        </button>

        <button className="p-1.5 rounded-full hover:bg-[#1f2430] text-zinc-400 hover:text-zinc-200 transition">
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* 설정 */}
        <button className="p-1.5 rounded-full hover:bg-[#1f2430] text-zinc-400 hover:text-zinc-200 transition">
          <Settings className="w-4 h-4" />
        </button>

        {/* PRO Badge */}
        <div className="px-2 py-0.5 rounded-md bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border border-violet-500/40 text-[11px] font-bold text-violet-300 tracking-wider">
          PRO
        </div>

        {/* Google Apps grid */}
        <button className="p-1.5 rounded-full hover:bg-[#1f2430] text-zinc-400 hover:text-zinc-200 transition">
          <Grid className="w-4 h-4" />
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-teal-500 p-[1.5px] cursor-pointer hover:ring-2 hover:ring-cyan-400/40 transition">
          <div className="w-full h-full rounded-full bg-[#111318] flex items-center justify-center text-xs font-bold text-cyan-300">
            H
          </div>
        </div>
      </div>
    </header>
  );
};
