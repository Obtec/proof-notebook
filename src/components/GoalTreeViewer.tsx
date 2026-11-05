import React, { useState } from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { GoalNode } from '../types';

interface GoalTreeViewerProps {
  tree: GoalNode;
  onClose?: () => void;
}

export const GoalTreeViewer: React.FC<GoalTreeViewerProps> = ({ tree, onClose }) => {
  const [selectedNode, setSelectedNode] = useState<GoalNode>(tree);

  const renderNode = (node: GoalNode, depth: number = 0) => {
    const isSelected = selectedNode.id === node.id;
    const isLeaf = !node.children || node.children.length === 0;

    return (
      <div key={node.id} className="relative">
        <div 
          onClick={() => setSelectedNode(node)}
          className={`flex items-center space-x-2 py-2 px-3 rounded-xl border text-xs cursor-pointer transition select-none ${
            isSelected
              ? 'bg-[#1e2538] border-cyan-500/80 text-white shadow-md shadow-cyan-950/40'
              : 'bg-[#13161e] border-[#222838] text-zinc-300 hover:bg-[#191d29]'
          }`}
          style={{ marginLeft: `${depth * 28}px` }}
        >
          {/* Status Indicator */}
          {node.status === 'closed' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          )}

          {/* Tactic Tag */}
          <span className="font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-1.5 py-0.5 rounded text-[11px] font-semibold">
            {node.tactic}
          </span>

          {/* Goal Statement summary */}
          <span className="font-mono text-zinc-300 text-[11px] truncate max-w-[280px]">
            {node.goal}
          </span>

          {node.children && (
            <span className="ml-auto text-[10px] text-zinc-500 font-mono">
              ({node.children.length} subgoals)
            </span>
          )}
        </div>

        {/* Child branches */}
        {node.children && node.children.map((child) => renderNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="bg-[#10131a] border border-[#262c3d] rounded-2xl p-5 shadow-2xl">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#212636]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              비선형 증명 목표 상태 트리 (ipnb Branching Proof DAG)
            </h3>
            <p className="text-[11px] text-zinc-400">
              Jupyter의 단방향 선형 커널 한계를 해결하는 다중 브랜치 Goal State 분기 시각화
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
            All Subgoals Q.E.D. ✓
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded bg-[#181c25]"
            >
              닫기
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tree Graph Hierarchy (7 cols) */}
        <div className="lg:col-span-7 space-y-2 max-h-[380px] overflow-y-auto pr-2">
          {renderNode(tree)}
        </div>

        {/* Selected Node Goal State Detail Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-[#141721] border border-[#252b3b] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-200 pb-2 border-b border-[#202533]">
              <span className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>선택된 분기 노드 검사기</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Node: {selectedNode.id}</span>
            </div>

            <div className="mt-3 space-y-3 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase text-zinc-500 font-sans block">적용된 Tactic</span>
                <span className="text-indigo-300 bg-indigo-950/40 px-2 py-1 rounded block mt-1 border border-indigo-500/20">
                  {selectedNode.tactic}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-zinc-500 font-sans block">현재 증명 목표 (Goal State)</span>
                <div className="mt-1 p-2.5 rounded-lg bg-[#0b0d13] border border-[#1d2230] text-emerald-300 text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {selectedNode.goal}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-zinc-500 font-sans block">상태 플래그</span>
                <div className="mt-1 flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedNode.status === 'closed'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                  }`}>
                    {selectedNode.status === 'closed' ? 'CLOSED (Q.E.D.)' : 'OPEN GOAL'}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-sans">
                    AST Merkle Root: 0x9f8...12c
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-[#1e2330] flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">분기 롤백 및 재생성 가능</span>
            <button className="px-2.5 py-1 rounded bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition">
              이 지점에서 브랜치 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
