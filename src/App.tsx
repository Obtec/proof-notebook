import React, { useState } from 'react';
import { Header } from './components/Header';
import { SourceSidebar } from './components/SourceSidebar';
import { StudioSidebar } from './components/StudioSidebar';
import { NotebookView } from './components/NotebookView';
import { ShareModal } from './components/ShareModal';
import { MemoModal } from './components/MemoModal';
import { StudioToolModal } from './components/StudioToolModal';
import { initialSources, initialCells, sampleLedgerRecords } from './data/mockData';
import { SourceItem, NotebookCell } from './types';

export const App: React.FC = () => {
  const [title, setTitle] = useState('수학 공부');
  const [sources, setSources] = useState<SourceItem[]>(initialSources);
  const [cells, setCells] = useState<NotebookCell[]>(initialCells);

  // Panels visibility
  const [isSourceOpen, setIsSourceOpen] = useState(true);
  const [isStudioOpen, setIsStudioOpen] = useState(true);

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [selectedStudioTool, setSelectedStudioTool] = useState<string | null>(null);

  // Toggle Source selection
  const handleToggleSource = (id: string) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const handleToggleSelectAll = () => {
    const allSelected = sources.every((s) => s.selected);
    setSources((prev) => prev.map((s) => ({ ...s, selected: !allSelected })));
  };

  const handleAddSource = (sourceTitle: string, type: SourceItem['type']) => {
    const newSource: SourceItem = {
      id: `src-${Date.now()}`,
      title: sourceTitle,
      type: type,
      selected: true,
      sizeOrMeta: type === 'lean' ? 'Lean 4 Formal Source' : '새로 추가된 연구 자료',
      verified: true,
    };
    setSources((prev) => [newSource, ...prev]);
  };

  // Add user prompt message & AI response
  const handleSendMessage = (message: string) => {
    const userCell: NotebookCell = {
      id: `user-cell-${Date.now()}`,
      type: 'ai_chat',
      author: 'user',
      content: message,
      timestamp: '방금 전',
    };

    // AI generated formal reasoning response
    const aiCell: NotebookCell = {
      id: `ai-cell-${Date.now() + 1}`,
      type: 'ai_chat',
      author: 'assistant',
      content: `질문하신 내용에 대해 호모토피 유형론(HoTT) 및 Lean 4 라이브러리를 검토했습니다.

**증명 제안 및 형식적 구조:**
상수 타입 족 $B(x) \\equiv C$ 하에서 종속 쌍 타입(Dependent Sum Type)인 $\\sum_{x : A} B(x)$ 역시 직적(Cartesian Product) $A \\times C$와 자연스럽게 동형(Isomorphic)이 됩니다:

$$\\sum_{x : A} B(x) \\simeq \\sum_{x : A} C \\simeq (A \\times C)$$

Lean 4에서는 \`Equiv.sigmaPProd\` 전술 또는 \`constructor\` 패턴 매칭을 통해 단 3줄로 검증할 수 있습니다.`,
      timestamp: '방금 전',
    };

    setCells((prev) => [...prev, userCell, aiCell]);
  };

  const handleSaveMemo = (memoText: string) => {
    const memoCell: NotebookCell = {
      id: `memo-${Date.now()}`,
      type: 'text',
      author: 'user',
      title: '💡 연구자 아이디어 스케치',
      content: memoText,
      timestamp: '방금 전',
    };
    setCells((prev) => [...prev, memoCell]);
  };

  const handleSelectPreviousNote = (noteTitle: string) => {
    setTitle(noteTitle);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0c0e12] overflow-hidden text-zinc-100 font-sans">
      {/* Top Header matching Google NotebookLM */}
      <Header
        title={title}
        onTitleChange={setTitle}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onOpenNewNotebook={() => {
          setTitle('새 수학적 증명 노트북');
          setCells(initialCells.slice(0, 2));
        }}
        onToggleGoalTreeModal={() => setSelectedStudioTool('tree')}
        onToggleLedgerModal={() => setSelectedStudioTool('ledger-mint')}
      />

      {/* Main 3-Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Sources / Ledger Panel */}
        <SourceSidebar
          sources={sources}
          onToggleSelect={handleToggleSource}
          onToggleSelectAll={handleToggleSelectAll}
          onAddSource={handleAddSource}
          isOpen={isSourceOpen}
          onToggleOpen={() => setIsSourceOpen(!isSourceOpen)}
          onInspectSource={(source) => {
            if (source.type === 'ledger') {
              setSelectedStudioTool('ledger-mint');
            }
          }}
        />

        {/* Center: Notebook & Tactic & Goal State DAG */}
        <NotebookView
          cells={cells}
          sources={sources}
          onSendMessage={handleSendMessage}
          onOpenLedgerModal={() => setSelectedStudioTool('ledger-mint')}
        />

        {/* Right: Studio & Verification Tools Panel */}
        <StudioSidebar
          isOpen={isStudioOpen}
          onToggleOpen={() => setIsStudioOpen(!isStudioOpen)}
          onSelectTool={(toolId) => {
            setSelectedStudioTool(toolId);
          }}
          onOpenMemo={() => setIsMemoModalOpen(true)}
          onSelectPreviousNote={handleSelectPreviousNote}
        />
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={title}
      />

      <MemoModal
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
        onSaveMemo={handleSaveMemo}
      />

      <StudioToolModal
        toolId={selectedStudioTool}
        onClose={() => setSelectedStudioTool(null)}
      />
    </div>
  );
};

export default App;
