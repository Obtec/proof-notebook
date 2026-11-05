import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Globe, 
  Lock, 
  ExternalLink,
  Code
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title }) => {
  const [copied, setCopied] = useState(false);
  const [accessLevel, setAccessLevel] = useState<'public' | 'restricted'>('public');

  if (!isOpen) return null;

  const shareUrl = `https://proof.notebook.io/n/hott-pi-equiv-2026?ledger=0x8F4E`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141720] border border-[#2d3447] rounded-2xl w-full max-w-md p-5 shadow-2xl text-zinc-200 animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-[#222736]">
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">노트북 및 First Prover 원장 공유</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 pt-4 text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">공유 대상 노트북</label>
            <div className="p-2.5 rounded-xl bg-[#1a1e2a] border border-[#2b3345] font-medium text-white flex items-center justify-between">
              <span>{title}</span>
              <span className="text-[10px] text-emerald-400 font-mono">Lean 4 Verified</span>
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">접근 권한 설정</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAccessLevel('public')}
                className={`p-2.5 rounded-xl border text-left flex items-start space-x-2 ${
                  accessLevel === 'public'
                    ? 'bg-cyan-950/70 border-cyan-500/80 text-cyan-200'
                    : 'bg-[#181c26] border-[#252b3b] text-zinc-400'
                }`}
              >
                <Globe className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-xs">학계 공개 (Public)</div>
                  <div className="text-[10px] text-zinc-400">누구나 Lean 4 AST 검증 가능</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAccessLevel('restricted')}
                className={`p-2.5 rounded-xl border text-left flex items-start space-x-2 ${
                  accessLevel === 'restricted'
                    ? 'bg-cyan-950/70 border-cyan-500/80 text-cyan-200'
                    : 'bg-[#181c26] border-[#252b3b] text-zinc-400'
                }`}
              >
                <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-xs">비공개 (Private)</div>
                  <div className="text-[10px] text-zinc-400">지정된 지갑/연구원만 접근</div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">불변 원장 증명 링크 (First Prover Permalink)</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-[#1b1f2b] border border-[#2c3345] rounded-xl px-3 py-2 text-[11px] text-zinc-300 font-mono outline-none"
              />
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#11131a] border border-[#212738] flex items-center space-x-2.5 text-[11px] text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <span>이 링크를 열면 브라우저에서 Lean 4 웹어셈블리 커널이 정리를 재검증합니다.</span>
          </div>
        </div>

        <div className="flex justify-end pt-4 mt-4 border-t border-[#202533]">
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
