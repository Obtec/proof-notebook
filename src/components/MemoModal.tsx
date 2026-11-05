import React, { useState } from 'react';
import { X, StickyNote, Sparkles, Send } from 'lucide-react';

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveMemo: (memoContent: string) => void;
}

export const MemoModal: React.FC<MemoModalProps> = ({ isOpen, onClose, onSaveMemo }) => {
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSaveMemo(content.trim());
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141720] border border-[#2d3447] rounded-2xl w-full max-w-lg p-5 shadow-2xl text-zinc-200 animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-[#222736]">
          <div className="flex items-center space-x-2">
            <StickyNote className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">비형식적 아이디어 스케치 & 메모</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
          <p className="text-zinc-400 text-xs">
            LaTeX 수식($\dots$)이나 증명 스케치, 직관을 자유롭게 적어 연구 노트북에 영구 보존하세요.
          </p>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="예: 만약 $B(x)$가 공집합이 되는 원소 $x \in A$가 존재한다면, 종속 함수 공간 $\prod_{x:A} B(x)$는 공집합이 되므로..."
            rows={5}
            className="w-full bg-[#1b1f2b] border border-[#2c3345] rounded-xl p-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-cyan-500 resize-none font-sans"
            autoFocus
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-zinc-500">
              저장 시 메인 노트북의 새로운 셀로 삽입됩니다.
            </span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-[#1e2330] transition"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!content.trim()}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white disabled:opacity-50 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>노트북에 추가</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
