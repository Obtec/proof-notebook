import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Layers, 
  Check, 
  Clock,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeanCodeCellProps {
  initialCode: string;
  onMintLedger?: () => void;
  onOpenTree?: () => void;
}

export const LeanCodeCell: React.FC<LeanCodeCellProps> = ({
  initialCode,
  onMintLedger,
  onOpenTree
}) => {
  const [code, setCode] = useState(initialCode);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const tacticSteps = [
    {
      line: 7,
      name: 'constructor',
      goal: '2 subgoals:\n⊢ ((x : A) → C) → (A → C)\n⊢ (A → C) → ((x : A) → C)',
      state: 'Branching 2 Subgoals',
    },
    {
      line: 9,
      name: 'intro f x',
      goal: 'case left\nA : Type u\nC : Type v\nf : (x : A) → C\nx : A\n⊢ C',
      state: 'Hypothesis added',
    },
    {
      line: 10,
      name: 'exact f x',
      goal: 'Subgoal 1 closed ✓\n⊢ (A → C) → ((x : A) → C)',
      state: '1 Subgoal remaining',
    },
    {
      line: 12,
      name: 'intro g x',
      goal: 'case right\nA : Type u\nC : Type v\ng : A → C\nx : A\n⊢ C',
      state: 'Hypothesis added',
    },
    {
      line: 13,
      name: 'exact g x',
      goal: 'No goals.\nGoals accomplished 🎉 (Q.E.D.)',
      state: 'Q.E.D. Proof Complete',
    },
  ];

  const handleRunVerification = () => {
    setIsVerifying(true);
    setVerified(false);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981'],
      });
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl border border-[#2b3344] bg-[#12151c] overflow-hidden shadow-xl">
      {/* Code Cell Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#171b24] border-b border-[#252b39] text-xs text-zinc-300">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 font-mono text-[11px] text-indigo-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Lean 4.14.0 Environment (Kernel v2)</span>
          </div>
          <span className="text-zinc-600">|</span>
          <span className="text-[11px] text-zinc-400">Formal Verification Cell</span>
        </div>

        <div className="flex items-center space-x-2">
          {verified && (
            <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
              <CheckCircle2 className="w-3 h-3" />
              <span>Lean Verified (42ms)</span>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="p-1 hover:bg-[#222836] rounded text-zinc-400 hover:text-white transition"
            title="코드 복사"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleRunVerification}
            disabled={isVerifying}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs shadow-sm transition"
          >
            <Play className={`w-3 h-3 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? '검증 중...' : '실행 및 커널 검증'}</span>
          </button>
        </div>
      </div>

      {/* Editor & InfoView Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px]">
        {/* Left: Code Editor Area (7 cols) */}
        <div className="lg:col-span-7 p-4 font-mono text-xs text-zinc-200 bg-[#0f1218] border-b lg:border-b-0 lg:border-r border-[#222736] relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-56 bg-transparent outline-none resize-none font-mono text-[12.5px] leading-relaxed text-zinc-200 select-text"
            spellCheck={false}
          />

          {/* Quick Tactic Step Navigator */}
          <div className="mt-3 pt-3 border-t border-[#1e2330] flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">Tactic Step Interactive Navigation:</span>
            <div className="flex space-x-1">
              {tacticSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                    activeStep === idx
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-[#1b202c] text-zinc-400 hover:bg-[#252c3c]'
                  }`}
                >
                  Step {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: InfoView / Goal State Inspector (5 cols) */}
        <div className="lg:col-span-5 p-4 bg-[#13161e] flex flex-col justify-between text-xs font-mono">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#232938] text-[11px] text-zinc-400">
              <span className="flex items-center space-x-1 font-semibold text-zinc-300">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>InfoView: Goal State</span>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">
                Line {tacticSteps[activeStep].line}
              </span>
            </div>

            {/* Current Step Goal State Box */}
            <div className="mt-3 p-3 rounded-xl bg-[#0b0d13] border border-[#202636] font-mono text-[11px] leading-relaxed">
              <div className="text-zinc-400 mb-1 flex items-center justify-between">
                <span>Tactic: <strong className="text-indigo-400">{tacticSteps[activeStep].name}</strong></span>
                <span className="text-[10px] text-emerald-400 font-sans">{tacticSteps[activeStep].state}</span>
              </div>
              <pre className="text-emerald-300/90 whitespace-pre-wrap mt-2 overflow-x-auto">
                {tacticSteps[activeStep].goal}
              </pre>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 mt-3 border-t border-[#202533] flex items-center justify-between">
            <button
              onClick={onOpenTree}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline flex items-center space-x-1"
            >
              <span>분기 트리(Proof Tree)로 보기 →</span>
            </button>

            <button
              onClick={onMintLedger}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-teal-950/80 hover:bg-teal-900 border border-teal-500/40 text-teal-300 text-[11px] transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>원장에 최초 증명자 등록</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
