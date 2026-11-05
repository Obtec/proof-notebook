import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Key, 
  FileCode, 
  Layers, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  Table,
  Workflow
} from 'lucide-react';
import { sampleLedgerRecords } from '../data/mockData';
import { LedgerRecord } from '../types';

export const LedgerSchemaViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'records' | 'erd' | 'sql' | 'backend'>('records');
  const [records, setRecords] = useState<LedgerRecord[]>(sampleLedgerRecords);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const sqlCode = `-- ====================================================================
-- ipnb: First Prover Ledger Atomic Registration Transaction
-- Ensures ACID idempotency & timestamp-based First Prover priority
-- ====================================================================

BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- 1. Verify theorem statement AST hash uniqueness
INSERT INTO formal_theorems (
    id, 
    theorem_identifier, 
    formal_statement, 
    ast_merkle_root, 
    kernel_version,
    created_at
)
VALUES (
    gen_random_uuid(), 
    'const_family_pi_equiv', 
    '((x : A) → (fun (_ : A) => C) x) ≃ (A → C)',
    '\\x9e8a71c52b04f84918e6c7310eab5d3c4019bf47',
    'Lean 4.14.0',
    CURRENT_TIMESTAMP
)
ON CONFLICT (ast_merkle_root) DO NOTHING;

-- 2. Ledger First Prover record if not already claimed
INSERT INTO proof_ledger (
    theorem_id,
    prover_pubkey,
    prover_alias,
    kernel_proof_receipt,
    execution_gas_micros,
    block_timestamp,
    status
)
SELECT 
    id,
    '0x71C8A9bE8f12aBc409',
    'Hyeonsu (You)',
    '\\xFA48CD109BEEF...',
    42800,
    CURRENT_TIMESTAMP,
    'CONFIRMED'
FROM formal_theorems
WHERE theorem_identifier = 'const_family_pi_equiv'
  AND NOT EXISTS (
      SELECT 1 FROM proof_ledger pl WHERE pl.theorem_id = formal_theorems.id
  );

COMMIT;`;

  return (
    <div className="bg-[#10131a] border border-[#262c3d] rounded-2xl p-5 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#212636]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-950/70 border border-indigo-500/30 text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              학계 최초 증명자(First Prover) 관계형 원장 & 시스템 명세
            </h3>
            <p className="text-[11px] text-zinc-400">
              새로운 정리 증명 시 즉시 인덱싱 및 최초 증명자를 투명하게 불변 기록하는 관계형 원장 시스템
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#161a24] p-1 rounded-xl border border-[#252b3b] space-x-1 text-xs">
          <button
            onClick={() => setActiveTab('records')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'records'
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            원장 기록 (Ledger)
          </button>
          <button
            onClick={() => setActiveTab('erd')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'erd'
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            ERD 다이어그램
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'sql'
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            핵심 SQL 트랜잭션
          </button>
          <button
            onClick={() => setActiveTab('backend')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'backend'
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            백엔드 엔진 구조
          </button>
        </div>
      </div>

      {/* Tab 1: Ledger Records */}
      {activeTab === 'records' && (
        <div className="space-y-3">
          <div className="overflow-x-auto rounded-xl border border-[#222736]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141822] text-zinc-400 border-b border-[#222736] font-mono text-[11px]">
                <tr>
                  <th className="p-3">정리 명세 (Theorem)</th>
                  <th className="p-3">최초 증명자 (First Prover)</th>
                  <th className="p-3">검증 커널 (Kernel)</th>
                  <th className="p-3">AST 증명 해시</th>
                  <th className="p-3">블록 높이</th>
                  <th className="p-3">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2330] font-mono">
                {records.map((r, i) => (
                  <tr key={r.id} className="hover:bg-[#161a24] text-zinc-300 transition">
                    <td className="p-3">
                      <div className="font-semibold text-indigo-300 font-sans">{r.theoremName}</div>
                      <div className="text-[10px] text-zinc-400 truncate max-w-xs">{r.formalStatement}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-white font-medium font-sans">{r.proverName}</div>
                      <div className="text-[10px] text-zinc-500">{r.proverAddress}</div>
                    </td>
                    <td className="p-3 text-[11px] text-zinc-400">{r.leanKernelVersion}</td>
                    <td className="p-3 text-[10px] text-cyan-400 truncate max-w-[140px]" title={r.proofHash}>
                      {r.proofHash}
                    </td>
                    <td className="p-3 text-[11px] text-zinc-400">#{r.blockHeight}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: ERD Diagram */}
      {activeTab === 'erd' && (
        <div className="p-4 bg-[#12151d] rounded-xl border border-[#222736] space-y-4">
          <div className="text-xs text-zinc-400">
            ipnb 데이터 모델: 다중 셀 상태 관리, 비선형 분기 트리, 최초 증명자 원장을 표현하는 관계형 스키마
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* Table 1: Notebooks & Cells */}
            <div className="bg-[#171b26] border border-[#2c3345] rounded-xl p-3">
              <div className="font-bold text-cyan-400 pb-2 border-b border-[#252b3b] flex items-center justify-between">
                <span>ipnb_notebooks</span>
                <span className="text-[10px] text-zinc-500">PK: id</span>
              </div>
              <ul className="mt-2 space-y-1 text-zinc-300 text-[11px]">
                <li>• id: UUID (PK)</li>
                <li>• title: VARCHAR(255)</li>
                <li>• creator_pubkey: VARCHAR(66)</li>
                <li>• kernel_runtime: ENUM(LEAN4, ROCQ)</li>
                <li>• root_goal_tree_id: UUID (FK)</li>
                <li>• created_at: TIMESTAMPTZ</li>
              </ul>
            </div>

            {/* Table 2: Goal States / Branch DAG */}
            <div className="bg-[#171b26] border border-[#2c3345] rounded-xl p-3">
              <div className="font-bold text-purple-400 pb-2 border-b border-[#252b3b] flex items-center justify-between">
                <span>proof_goal_nodes</span>
                <span className="text-[10px] text-zinc-500">PK: id</span>
              </div>
              <ul className="mt-2 space-y-1 text-zinc-300 text-[11px]">
                <li>• id: UUID (PK)</li>
                <li>• parent_node_id: UUID (Self-FK)</li>
                <li>• cell_id: UUID (FK)</li>
                <li>• tactic_applied: TEXT</li>
                <li>• goal_hypotheses: JSONB</li>
                <li>• is_closed (QED): BOOLEAN</li>
                <li>• ast_hash: BYTEA</li>
              </ul>
            </div>

            {/* Table 3: Proof Ledger */}
            <div className="bg-[#171b26] border border-[#2c3345] rounded-xl p-3">
              <div className="font-bold text-teal-400 pb-2 border-b border-[#252b3b] flex items-center justify-between">
                <span>proof_ledger (First Prover)</span>
                <span className="text-[10px] text-zinc-500">PK: id</span>
              </div>
              <ul className="mt-2 space-y-1 text-zinc-300 text-[11px]">
                <li>• id: UUID (PK)</li>
                <li>• theorem_identifier: VARCHAR (UNIQUE)</li>
                <li>• prover_pubkey: VARCHAR(66)</li>
                <li>• prover_alias: VARCHAR(100)</li>
                <li>• proof_ast_hash: BYTEA (UNIQUE)</li>
                <li>• block_height: BIGINT</li>
                <li>• verified_status: VARCHAR(20)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SQL Transaction */}
      {activeTab === 'sql' && (
        <div className="relative">
          <pre className="p-4 rounded-xl bg-[#0e1017] border border-[#222736] font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed">
            {sqlCode}
          </pre>
          <button
            onClick={() => copyToClipboard(sqlCode, 99)}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#1a1f2b] text-zinc-400 hover:text-white border border-[#2c3345] transition"
          >
            {copiedIndex === 99 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Tab 4: Backend Verification Engine */}
      {activeTab === 'backend' && (
        <div className="p-4 bg-[#12151d] rounded-xl border border-[#222736] space-y-3 text-xs leading-relaxed text-zinc-300">
          <div className="flex items-center space-x-2 text-sm font-semibold text-white">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <span>백엔드 정형 검증 파이프라인 (Backend Architecture)</span>
          </div>
          <p>
            ipnb 백엔드는 주피터의 선형 REPL 모델 대신 <strong>Lean 4 Watchdog & Language Server Protocol (LSP)</strong>을 커스텀 확장한 
            비동기 분기 상태 스케줄러(Proof Tree Coordinator)를 탑재합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#181c26] border border-[#252b3b]">
              <div className="font-bold text-indigo-300 mb-1">1. LSP Async Channel</div>
              <p className="text-[11px] text-zinc-400">
                WebSocket을 통해 브라우저 에디터의 커서/전술 입력을 Lean 4 Lake 서버로 전송하고 타깃 AST를 파싱합니다.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#181c26] border border-[#252b3b]">
              <div className="font-bold text-purple-300 mb-1">2. DAG Branch Forker</div>
              <p className="text-[11px] text-zinc-400">
                전술(Tactic) 실행 결과로 생성된 서브골(Subgoal)들을 트리 노드로 분기하고 각 노드의 스냅샷 상태를 유지합니다.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#181c26] border border-[#252b3b]">
              <div className="font-bold text-teal-300 mb-1">3. Ledger Notarization</div>
              <p className="text-[11px] text-zinc-400">
                모든 서브골이 닫히면(Q.E.D.), AST 암호화 해시와 서명 키를 결합하여 관계형 원장에 최초 증명자 블록을 민팅합니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
