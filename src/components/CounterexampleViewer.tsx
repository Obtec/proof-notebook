import React, { useState } from 'react';
import { 
  SearchCode, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw, 
  Sliders, 
  Sparkles,
  BarChart2,
  Cpu
} from 'lucide-react';

export const CounterexampleViewer: React.FC = () => {
  const [sampleSize, setSampleSize] = useState(100);
  const [isSampling, setIsSampling] = useState(false);
  const [selectedHypothesis, setSelectedHypothesis] = useState<'constant' | 'dependent'>('constant');

  // Matrix samples
  const generateSamples = () => {
    return Array.from({ length: 30 }, (_, i) => {
      const x = i + 1;
      const isViolation = selectedHypothesis === 'dependent' && (x % 4 === 0 || x % 7 === 0);
      return {
        id: x,
        paramX: `x_${x}`,
        fiberType: isViolation ? `Type_{${x}} ≠ C` : `Type_0 ≡ C`,
        status: isViolation ? 'violation' : 'valid',
        residual: isViolation ? (Math.random() * 0.8 + 0.2).toFixed(3) : '0.000',
      };
    });
  };

  const [samples, setSamples] = useState(generateSamples());

  const handleResample = () => {
    setIsSampling(true);
    setTimeout(() => {
      setSamples(generateSamples());
      setIsSampling(false);
    }, 400);
  };

  const violationsCount = samples.filter(s => s.status === 'violation').length;

  return (
    <div className="bg-[#10131a] border border-[#262c3d] rounded-2xl p-5 shadow-2xl">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#212636]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-rose-950/70 border border-rose-500/30 text-rose-400">
            <SearchCode className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              반례 탐색 엔진 및 데이터 시각화 (SlimCheck Counterexample Explorer)
            </h3>
            <p className="text-[11px] text-zinc-400">
              가설 $B(x) \equiv C$ 위반 여부를 이산 파라미터 공간에서 무작위 샘플링 및 반례 시각화
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResample}
            disabled={isSampling}
            className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-[#1a1f2b] hover:bg-[#222938] text-xs text-zinc-300 border border-[#2c3345] transition"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSampling ? 'animate-spin' : ''}`} />
            <span>재샘플링 (Sampling)</span>
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#141721] border border-[#232938] mb-4 text-xs">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="text-zinc-400">테스트 가설:</span>
          <button
            onClick={() => { setSelectedHypothesis('constant'); handleResample(); }}
            className={`px-2.5 py-1 rounded-md font-mono transition ${
              selectedHypothesis === 'constant'
                ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                : 'bg-[#1b202c] text-zinc-400'
            }`}
          >
            B(x) ≡ C (상수 타입 족)
          </button>
          <button
            onClick={() => { setSelectedHypothesis('dependent'); handleResample(); }}
            className={`px-2.5 py-1 rounded-md font-mono transition ${
              selectedHypothesis === 'dependent'
                ? 'bg-rose-950 border border-rose-500/40 text-rose-300'
                : 'bg-[#1b202c] text-zinc-400'
            }`}
          >
            B(x) ≠ C (일반 종속 족, 위반 유도)
          </button>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <span className="text-zinc-500">샘플 {samples.length}개</span>
          {violationsCount === 0 ? (
            <span className="text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>반례 없음 (No Counterexamples)</span>
            </span>
          ) : (
            <span className="text-rose-400 flex items-center space-x-1 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{violationsCount}건의 반례 발견됨!</span>
            </span>
          )}
        </div>
      </div>

      {/* Sample Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-[300px] overflow-y-auto p-1">
        {samples.map((s) => (
          <div
            key={s.id}
            className={`p-2 rounded-xl border text-center transition flex flex-col justify-between ${
              s.status === 'valid'
                ? 'bg-[#0f1218] border-[#1f2535] text-zinc-300 hover:border-emerald-500/40'
                : 'bg-rose-950/30 border-rose-500/60 text-rose-200 animate-pulse'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
              <span>#{s.id}</span>
              <span className={s.status === 'valid' ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                {s.status === 'valid' ? '✓ Valid' : '✗ Viol'}
              </span>
            </div>
            <div className="font-mono text-xs font-semibold my-1">
              {s.fiberType}
            </div>
            <div className="text-[9px] text-zinc-500 font-mono">
              Δ={s.residual}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
