import React, { useState } from 'react';
import { 
  ArrowUp, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  BookOpen, 
  GitBranch, 
  SearchCode, 
  ShieldCheck, 
  Plus, 
  MessageSquare,
  FileText
} from 'lucide-react';
import { NotebookCell, SourceItem } from '../types';
import { RenderRichMathText } from './MathView';
import { LeanCodeCell } from './LeanCodeCell';
import { GoalTreeViewer } from './GoalTreeViewer';
import { CounterexampleViewer } from './CounterexampleViewer';
import { LedgerSchemaViewer } from './LedgerSchemaViewer';
import { proofGoalTree } from '../data/mockData';

interface NotebookViewProps {
  cells: NotebookCell[];
  sources: SourceItem[];
  onSendMessage: (msg: string) => void;
  onOpenLedgerModal: () => void;
}

export const NotebookView: React.FC<NotebookViewProps> = ({
  cells,
  sources,
  onSendMessage,
  onOpenLedgerModal,
}) => {
  const [activeTab, setActiveTab] = useState<'notebook' | 'tree' | 'counterexample' | 'ledger'>('notebook');
  const [promptInput, setPromptInput] = useState('');
  const [showDriveBanner, setShowDriveBanner] = useState(true);

  const selectedSourcesCount = sources.filter((s) => s.selected).length;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    onSendMessage(promptInput.trim());
    setPromptInput('');
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#0d0f14] overflow-hidden select-none">
      {/* Tab Bar */}
      <div className="h-11 border-b border-[#1f2430] bg-[#111319] px-6 flex items-center justify-between">
        <div className="flex space-x-2 text-xs">
          <button
            onClick={() => setActiveTab('notebook')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'notebook'
                ? 'bg-[#1e2330] text-cyan-300 border border-cyan-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#181c25]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>수학 연구 노트북 (Notebook)</span>
          </button>

          <button
            onClick={() => setActiveTab('tree')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'tree'
                ? 'bg-[#1e2330] text-purple-300 border border-purple-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#181c25]'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>분기형 증명 트리 (Goal DAG)</span>
          </button>

          <button
            onClick={() => setActiveTab('counterexample')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'counterexample'
                ? 'bg-[#1e2330] text-rose-300 border border-rose-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#181c25]'
            }`}
          >
            <SearchCode className="w-3.5 h-3.5" />
            <span>반례 탐색기 (Counterexamples)</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'ledger'
                ? 'bg-[#1e2330] text-teal-300 border border-teal-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#181c25]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>First Prover 원장 & 논문 명세</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-500">
          <span>Kernel: Lean v4.14</span>
          <span>•</span>
          <span className="text-emerald-400">Ready</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 max-w-4xl w-full mx-auto select-text scroll-smooth">
        {activeTab === 'tree' && (
          <div className="animate-fadeIn">
            <GoalTreeViewer tree={proofGoalTree} />
          </div>
        )}

        {activeTab === 'counterexample' && (
          <div className="animate-fadeIn">
            <CounterexampleViewer />
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="animate-fadeIn">
            <LedgerSchemaViewer />
          </div>
        )}

        {activeTab === 'notebook' && (
          <div className="space-y-6 pb-28 text-zinc-200">
            {/* Cell 1: Prelude quote */}
            <div className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-700 pl-3 italic">
              <RenderRichMathText text={cells[0]?.content || '...입장에서는 직전 문맥의 타입 족 $B$와 혼동하기 매우 쉬운 서술입니다.'} />
            </div>

            {/* Cell 2: 구문론적 바인더 관점에서의 정의 (Screenshot Section 2) */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                2. 구문론적 바인더(Syntax) 관점에서의 정의
              </h2>
              <div className="text-sm leading-relaxed text-zinc-300">
                <RenderRichMathText
                  text={`형식적 유형론(HoTT Appendix §A.2.4)에서는 $\\Pi$-타입을 함수가 아니라 식(expression)과 변수 바인더로 도입합니다:`}
                />
              </div>

              {/* KaTeX Block formula 1 */}
              <div className="py-2 px-4 rounded-xl bg-[#13161e] border border-[#222838] my-2 text-center overflow-x-auto shadow-inner">
                <RenderRichMathText
                  text={`$$x : A \\vdash \\Phi : \\mathcal{U} \\Longrightarrow \\prod_{x : A} \\Phi : \\mathcal{U}$$`}
                />
              </div>

              <div className="text-sm leading-relaxed text-zinc-300">
                <RenderRichMathText
                  text={`여기서 바인더 내부의 식 $\\Phi$에 변수 $x$가 자유 변수로 전혀 나타나지 않을 때(즉, $x$와 무관한 순수 타입 식일 때), 유형론에서는 이를 일반 함수 타입의 정의로 삼습니다:`}
                />
              </div>

              {/* KaTeX Block formula 2 */}
              <div className="py-2 px-4 rounded-xl bg-[#13161e] border border-[#222838] my-2 text-center overflow-x-auto shadow-inner">
                <RenderRichMathText
                  text={`$$(A \\to \\Phi) := \\prod_{x : A} \\Phi$$`}
                />
              </div>

              <div className="text-sm leading-relaxed text-zinc-300">
                <RenderRichMathText
                  text={`교재는 이 구문론적 관행을 그대로 가져와 $\\Phi$ 자리에 문자 $B$를 넣다 보니, 타입 족으로서의 $B$와 타입 식으로서의 $B$가 시각적으로 겹치게 된 것입니다.`}
                />
              </div>
            </div>

            {/* Cell 3: 질문자께서 제시하신 엄밀한 정식화 (Screenshot Section 3) */}
            <div className="space-y-3 pt-3">
              <h2 className="text-lg font-semibold text-white tracking-tight">
                3. 질문자께서 제시하신 엄밀한 정식화
              </h2>
              <div className="text-sm leading-relaxed text-zinc-300">
                <RenderRichMathText
                  text={`따라서 타입 족을 함수 $B : A \\to \\mathcal{U}$로 엄밀하게 구별할 때는 질문자께서 제안하신 방식이 표준적이고 가장 정확합니다:`}
                />
              </div>

              <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed text-zinc-300 pl-1">
                <li>
                  <RenderRichMathText text={`고정된 목표 타입 **$C : \\mathcal{U}$**가 존재한다.`} />
                </li>
                <li>
                  <RenderRichMathText text={`타입 족 $B : A \\to \\mathcal{U}$가 모든 $x : A$에 대해 $B(x) \\equiv C$ (즉, $B \\equiv \\lambda x. C$)를 만족하는 상수 타입 족이다.`} />
                </li>
                <li>
                  <RenderRichMathText text={`그러면 종속 함수 타입은 다음과 같이 일반 함수 타입으로 환원된다:`} />
                </li>
              </ol>

              {/* KaTeX Block formula 3 */}
              <div className="py-2 px-4 rounded-xl bg-[#13161e] border border-[#222838] my-2 text-center overflow-x-auto shadow-inner">
                <RenderRichMathText
                  text={`$$\\prod_{x : A} B(x) \\equiv \\prod_{x : A} C \\equiv (A \\to C)$$`}
                />
              </div>
            </div>

            {/* Interactive Lean 4 Cell */}
            <LeanCodeCell
              initialCode={cells[3]?.leanCode || ''}
              onMintLedger={onOpenLedgerModal}
              onOpenTree={() => setActiveTab('tree')}
            />

            {/* Extra Conversation / Cell items if added */}
            {cells.slice(4).map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[#141720] border border-[#232938] text-sm leading-relaxed animate-fadeIn"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
                  <span className="font-semibold text-cyan-300">{c.author === 'user' ? '연구자 질의' : 'ipnb 보조 에이전트'}</span>
                  <span>{c.timestamp}</span>
                </div>
                <RenderRichMathText text={c.content} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Prompt Area matching screenshot */}
      <div className="w-full max-w-3xl mx-auto px-4 pb-3 select-none">
        {/* Banner matching screenshot */}
        {showDriveBanner && (
          <div className="mb-2.5 px-3.5 py-2 rounded-xl bg-[#171b26] border border-[#2b3347] flex items-center justify-between text-xs text-zinc-300 shadow-md">
            <div className="flex items-center space-x-2 truncate">
              <span className="text-cyan-400">💡</span>
              <span className="truncate">
                이제 채팅에서 Google Drive 파일을 검색할 수 있습니다. <span className="text-zinc-400">"내 드라이브에서 ...를 검색해 줘"</span>라고 요청해 보세요.
              </span>
            </div>
            <button
              onClick={() => setShowDriveBanner(false)}
              className="p-1 hover:text-white text-zinc-500 rounded transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Prompt Input Box */}
        <form
          onSubmit={handleSend}
          className="bg-[#161922] border border-[#292f42] rounded-2xl p-2 px-3 flex items-center space-x-2.5 focus-within:border-cyan-500/60 shadow-xl transition"
        >
          {/* Sliders/Filter icon matching screenshot */}
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-[#202535] text-zinc-400 hover:text-zinc-200 transition"
            title="에이전트 추론 설정"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Input field */}
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="질문하거나 창작하세요"
            className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-500 outline-none"
          />

          {/* Sources badge matching screenshot */}
          <div className="px-2.5 py-1 rounded-full bg-[#202533] border border-[#2f374c] text-[11px] text-zinc-400 font-mono flex items-center space-x-1">
            <span>소스</span>
            <span className="text-cyan-400 font-bold">{selectedSourcesCount}개</span>
          </div>

          {/* Up arrow submit button matching screenshot */}
          <button
            type="submit"
            disabled={!promptInput.trim()}
            className="w-7 h-7 rounded-full bg-[#2a3042] hover:bg-cyan-600 disabled:opacity-40 disabled:hover:bg-[#2a3042] text-zinc-200 flex items-center justify-center transition"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </form>

        {/* Disclaimer footer matching screenshot */}
        <div className="text-center text-[10px] text-zinc-500 pt-1.5 font-sans">
          Gemini Notebook은 실수를 할 수 있으니 다시 한번 확인하세요.
        </div>
      </div>
    </main>
  );
};
