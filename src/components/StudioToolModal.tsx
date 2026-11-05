import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  Play, 
  Pause, 
  Presentation, 
  FileText, 
  Layers, 
  HelpCircle, 
  BarChart3, 
  Table, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Volume2 
} from 'lucide-react';
import { MathView, RenderRichMathText } from './MathView';

interface StudioToolModalProps {
  toolId: string | null;
  onClose: () => void;
}

export const StudioToolModal: React.FC<StudioToolModalProps> = ({ toolId, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  if (!toolId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141720] border border-[#2d3447] rounded-2xl w-full max-w-2xl p-6 shadow-2xl text-zinc-200 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#222736]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-white">
              {toolId === 'audio' && 'AI 오디오 오버뷰 (Audio Deep Dive)'}
              {toolId === 'slides' && 'Beamer / LaTeX 슬라이드 프레젠테이션'}
              {toolId === 'report' && '정형 검증 종합 학술 보고서'}
              {toolId === 'flashcards' && '호모토피 유형론 핵심 개념 플래시카드'}
              {toolId === 'quiz' && '유형론 이해도 자가 평가 퀴즈'}
              {toolId === 'infographic' && '함자 범주 및 바인더 구문 인포그래픽'}
              {toolId === 'data-table' && 'Lean 4 전술 연산 벤치마크 데이터 표'}
              {toolId === 'tree' && '마인드맵 / 증명트리 분석'}
              {toolId === 'ledger-mint' && 'First Prover 관계형 원장'}
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content based on toolId */}
        <div className="py-4">
          {toolId === 'audio' && (
            <div className="p-4 rounded-xl bg-[#181c26] border border-[#262c3b] space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white flex items-center space-x-2">
                    <span>HoTT §A.2.4 & 상수 타입 족의 정형적 동치</span>
                    <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    두 AI 수학자가 토론하는 형식의 오디오 심층 분석 (14분 20초)
                  </p>
                </div>
              </div>

              {/* Fake Audio Waveform */}
              <div className="h-12 bg-[#0e1117] rounded-lg p-2 flex items-center justify-between space-x-1">
                {Array.from({ length: 32 }).map((_, i) => {
                  const h = isPlaying ? Math.sin(i * 0.5) * 16 + 18 : 6;
                  return (
                    <div
                      key={i}
                      className="w-1 bg-purple-500/70 rounded-full transition-all duration-200"
                      style={{ height: `${h}px` }}
                    />
                  );
                })}
              </div>

              <div className="text-xs text-zinc-400 leading-relaxed italic bg-[#11131a] p-3 rounded-lg border border-[#202533]">
                <RenderRichMathText text="&ldquo;핵심은 이겁니다: 종속 곱 타입 $\prod_{x:A} B(x)$에서 $B(x)$가 $x$에 의존하지 않는 상수 족 $C$라면, 모든 $x$에 대해 같은 타입 $C$의 원소를 반환하므로 이는 정확히 단순 함수 공간 $(A \to C)$와 전단사 동형이 되는 것이죠.&rdquo;" />
              </div>
            </div>
          )}

          {toolId === 'slides' && (
            <div className="space-y-4">
              {/* Slide Screen */}
              <div className="p-6 rounded-xl bg-[#181c26] border border-purple-500/30 aspect-[16/9] flex flex-col justify-between shadow-xl">
                <div>
                  <div className="text-[11px] font-mono text-purple-400 uppercase tracking-widest mb-1">
                    SLIDE {activeSlide + 1} OF 3
                  </div>
                  {activeSlide === 0 && (
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">
                        1. 구문론적 바인더(Syntax) 관점에서의 정의
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                        <RenderRichMathText text="형식적 유형론(HoTT Appendix §A.2.4)에서 $\Pi$-타입은 함수가 아닌 변수 바인더로 도입됨." />
                      </p>
                      <div className="p-3 bg-[#10131a] rounded-lg font-mono text-center text-xs">
                        <MathView math="x : A \vdash \Phi : \mathcal{U} \Longrightarrow \prod_{x : A} \Phi : \mathcal{U}" block={true} />
                      </div>
                    </div>
                  )}
                  {activeSlide === 1 && (
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">
                        2. 상수 타입 족과 화살표 타입의 환원
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                        <RenderRichMathText text="자유 변수 $x$가 나타나지 않을 때 일반 함수 타입 $(A \to \Phi)$ 정의." />
                      </p>
                      <div className="p-3 bg-[#10131a] rounded-lg font-mono text-center text-xs">
                        <MathView math="(A \to \Phi) := \prod_{x : A} \Phi" block={true} />
                      </div>
                    </div>
                  )}
                  {activeSlide === 2 && (
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">
                        3. Lean 4 컴퓨터 수학 검증 (Q.E.D.)
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                        2개의 서브골 분기 및 First Prover 원장 불변 서명 완료.
                      </p>
                      <div className="p-3 bg-[#10131a] rounded-lg font-mono text-emerald-400 text-xs">
                        <MathView math="\text{theorem const\_family\_pi\_equiv} : ((x : A) \to C) \simeq (A \to C)" block={true} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Slide Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-[#232838]">
                  <button
                    onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                    disabled={activeSlide === 0}
                    className="px-3 py-1 rounded bg-[#202535] text-xs disabled:opacity-40"
                  >
                    이전 슬라이드
                  </button>
                  <span className="text-xs text-zinc-400">{activeSlide + 1} / 3</span>
                  <button
                    onClick={() => setActiveSlide(Math.min(2, activeSlide + 1))}
                    disabled={activeSlide === 2}
                    className="px-3 py-1 rounded bg-[#202535] text-xs disabled:opacity-40"
                  >
                    다음 슬라이드
                  </button>
                </div>
              </div>
            </div>
          )}

          {toolId === 'report' && (
            <div className="p-4 rounded-xl bg-[#181c26] border border-[#262c3b] space-y-3 text-xs leading-relaxed">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">ipnb 정형 검증 연구 보고서</span>
                <button className="flex items-center space-x-1 px-2.5 py-1 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF 다운로드</span>
                </button>
              </div>
              <p className="text-zinc-300">
                <RenderRichMathText text="본 문서는 호모토피 유형론(HoTT) 부록 §A.2.4에 기술된 종속 함수 공간의 구문론적 정의와 Lean 4 커널 검증 완료된 동치 증명 트리를 통합 보존합니다." />
              </p>
              <div className="p-3 bg-[#11131a] rounded-lg text-emerald-400 font-mono text-[11px]">
                Verification Status: Lean 4.14.0 Kernel Verified (Hash: 0x9e8a71... / Block: #284190)
              </div>
            </div>
          )}

          {toolId === 'flashcards' && (
            <div className="p-6 rounded-xl bg-[#181c26] border border-amber-500/30 text-center space-y-4">
              <span className="text-[10px] text-amber-400 font-mono uppercase">개념 플래시카드</span>
              <h4 className="text-base font-bold text-white">
                <RenderRichMathText text="종속 곱 타입 ($\Pi$-Type)" />
              </h4>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                <RenderRichMathText text="앞선 인자 $x : A$의 값에 따라 결과 타입 $B(x)$가 결정되는 일반화된 함수들의 모임." />
              </p>
              <div className="text-[11px] text-zinc-500">클릭하여 정형 규칙 확인</div>
            </div>
          )}

          {toolId === 'quiz' && (
            <div className="p-4 rounded-xl bg-[#181c26] border border-cyan-500/30 space-y-3 text-xs">
              <div className="font-bold text-sm text-cyan-300">
                <RenderRichMathText text="Q1. 종속 타입 족 $B(x) \equiv C$일 때 $\prod_{x:A} B(x)$는 무엇과 동치인가?" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="p-2.5 rounded-lg bg-[#11131a] border border-emerald-500/50 text-emerald-300 flex items-center justify-between">
                  <span>
                    <RenderRichMathText text="① 일반 화살표 함수 타입 $(A \to C)$" />
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="p-2.5 rounded-lg bg-[#11131a] border border-[#222736] text-zinc-400">
                  <RenderRichMathText text="② 곱 타입 $(A \times C)$" />
                </div>
                <div className="p-2.5 rounded-lg bg-[#11131a] border border-[#222736] text-zinc-400">
                  <RenderRichMathText text="③ 공집합 ($\emptyset$)" />
                </div>
              </div>
            </div>
          )}

          {toolId === 'data-table' && (
            <div className="p-4 rounded-xl bg-[#181c26] border border-[#262c3b] overflow-x-auto text-xs font-mono">
              <table className="w-full text-left">
                <thead className="text-zinc-500 border-b border-[#232838]">
                  <tr>
                    <th className="pb-2">Tactic</th>
                    <th className="pb-2">Execution (ms)</th>
                    <th className="pb-2">Subgoals Delta</th>
                    <th className="pb-2">Kernel Memory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#202534] text-zinc-300">
                  <tr>
                    <td className="py-2 text-indigo-400">constructor</td>
                    <td className="py-2">12ms</td>
                    <td className="py-2 text-amber-400">+2 goals</td>
                    <td className="py-2">4.2 MB</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-indigo-400">intro f x; exact f x</td>
                    <td className="py-2">15ms</td>
                    <td className="py-2 text-emerald-400">-1 goal</td>
                    <td className="py-2">4.5 MB</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-indigo-400">intro g x; exact g x</td>
                    <td className="py-2">15ms</td>
                    <td className="py-2 text-emerald-400">-1 goal (QED)</td>
                    <td className="py-2">4.8 MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-[#202533]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-[#1e2330] hover:bg-[#272e40] text-zinc-300"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
