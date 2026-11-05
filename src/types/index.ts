export type SourceType = 'pdf' | 'doc' | 'lean' | 'ledger' | 'web';

export interface SourceItem {
  id: string;
  title: string;
  type: SourceType;
  selected: boolean;
  sizeOrMeta?: string;
  verified?: boolean;
}

export interface GoalNode {
  id: string;
  tactic: string;
  goal: string;
  status: 'open' | 'closed' | 'active';
  children?: GoalNode[];
}

export interface LedgerRecord {
  id: string;
  theoremName: string;
  formalStatement: string;
  proverName: string;
  proverAddress: string;
  timestamp: string;
  leanKernelVersion: string;
  proofHash: string;
  blockHeight: number;
  status: 'CONFIRMED' | 'INDEXING' | 'VERIFYING';
}

export type CellType = 'text' | 'lean' | 'tree' | 'counterexample' | 'ai_chat';

export interface NotebookCell {
  id: string;
  type: CellType;
  title?: string;
  content: string;
  leanCode?: string;
  goalState?: string;
  verified?: boolean;
  executionTime?: string;
  author?: 'user' | 'assistant' | 'kernel';
  timestamp?: string;
}

export interface StudioToolItem {
  id: string;
  title: string;
  icon: string;
  badge?: string;
  category: 'content' | 'proof' | 'data';
}
