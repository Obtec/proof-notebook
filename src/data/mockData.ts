import { SourceItem, NotebookCell, LedgerRecord, GoalNode } from '../types';

export const initialSources: SourceItem[] = [
  {
    id: 'hott-pdf',
    title: 'HoTT.pdf',
    type: 'pdf',
    selected: true,
    sizeOrMeta: '1.4 MB · Homotopy Type Theory §A.2.4',
    verified: true,
  },
  {
    id: 'research-report',
    title: 'Research report: Category Theory Study R...',
    type: 'doc',
    selected: true,
    sizeOrMeta: '수반 함자와 펑터 범주에 관한 메모',
    verified: true,
  },
  {
    id: 'mathlib4-dep',
    title: 'Mathlib4/CategoryTheory/DependentProduct.lean',
    type: 'lean',
    selected: false,
    sizeOrMeta: 'Lean 4.14.0 정형 라이브러리',
    verified: true,
  },
  {
    id: 'ledger-proof-1',
    title: 'First Prover Ledger: #0x8F4E-PiEquiv',
    type: 'ledger',
    selected: false,
    sizeOrMeta: '블록 #19842 · 최초 증명자: Emily Riemann',
    verified: true,
  },
];

export const initialCells: NotebookCell[] = [
  {
    id: 'cell-prelude',
    type: 'text',
    author: 'assistant',
    content: `...입장에서는 직전 문맥의 타입 족 $B$와 혼동하기 매우 쉬운 서술입니다.`,
    timestamp: '28일 전',
  },
  {
    id: 'cell-syntax-section',
    type: 'text',
    title: '2. 구문론적 바인더(Syntax) 관점에서의 정의',
    author: 'assistant',
    content: `형식적 유형론(HoTT Appendix §A.2.4)에서는 $\\Pi$-타입을 함수가 아니라 식(expression)과 변수 바인더로 도입합니다:

$$x : A \\vdash \\Phi : \\mathcal{U} \\Longrightarrow \\prod_{x : A} \\Phi : \\mathcal{U}$$

여기서 바인더 내부의 식 $\\Phi$에 변수 $x$가 자유 변수로 전혀 나타나지 않을 때(즉, $x$와 무관한 순수 타입 식일 때), 유형론에서는 이를 일반 함수 타입의 정의로 삼습니다:

$$(A \\to \\Phi) := \\prod_{x : A} \\Phi$$

교재는 이 구문론적 관행을 그대로 가져와 $\\Phi$ 자리에 문자 $B$를 넣다 보니, 타입 족으로서의 $B$와 타입 식으로서의 $B$가 시각적으로 겹치게 된 것입니다.`,
    timestamp: '28일 전',
  },
  {
    id: 'cell-formalization-section',
    type: 'text',
    title: '3. 질문자께서 제시하신 엄밀한 정식화',
    author: 'assistant',
    content: `따라서 타입 족을 함수 $B : A \\to \\mathcal{U}$로 엄밀하게 구별할 때는 질문자께서 제안하신 방식이 표준적이고 가장 정확합니다:

1. 고정된 목표 타입 **$C : \\mathcal{U}$**가 존재한다.
2. 타입 족 $B : A \\to \\mathcal{U}$가 모든 $x : A$에 대해 $B(x) \\equiv C$ (즉, $B \\equiv \\lambda x. C$)를 만족하는 상수 타입 족이다.
3. 그러면 종속 함수 타입은 다음과 같이 일반 함수 타입으로 환원된다:

$$\\prod_{x : A} B(x) \\equiv \\prod_{x : A} C \\equiv (A \\to C)$$`,
    timestamp: '28일 전',
  },
  {
    id: 'cell-lean-code',
    type: 'lean',
    title: 'Lean 4 Formal Verification: Constant Family Pi-Equivalence',
    author: 'user',
    content: 'Lean 4 인터랙티브 증명 셀 (컴퓨터 수학적 정형 검증)',
    leanCode: `import Mathlib.Logic.Equiv.Basic

/--
  [Theorem: Pi to Arrow Equivalence for Constant Families]
  When the target type family is constant (B x = C),
  the dependent function type (x : A) → B x is equivalent to (A → C).
-/
theorem const_family_pi_equiv {A : Type u} {C : Type v} :
    ((x : A) → (fun (_ : A) => C) x) ≃ (A → C) := by
  constructor
  · -- Forward direction: dependent function to simple arrow
    intro f x
    exact f x
  · -- Backward direction: simple arrow to dependent function
    intro g x
    exact g x`,
    verified: true,
    executionTime: '42ms',
    timestamp: '방금 전',
  },
];

export const proofGoalTree: GoalNode = {
  id: 'goal-root',
  tactic: 'theorem const_family_pi_equiv',
  goal: '⊢ ((x : A) → (fun _ => C) x) ≃ (A → C)',
  status: 'closed',
  children: [
    {
      id: 'goal-constructor',
      tactic: 'constructor',
      goal: '2 subgoals generated: ⊢ ((x : A) → C) → (A → C) ∧ ⊢ (A → C) → ((x : A) → C)',
      status: 'closed',
      children: [
        {
          id: 'subgoal-1',
          tactic: '· intro f x',
          goal: 'f : (x : A) → C, x : A ⊢ C',
          status: 'closed',
          children: [
            {
              id: 'subgoal-1-exact',
              tactic: 'exact f x',
              goal: 'No goals. (Q.E.D. ✓)',
              status: 'closed',
            },
          ],
        },
        {
          id: 'subgoal-2',
          tactic: '· intro g x',
          goal: 'g : A → C, x : A ⊢ C',
          status: 'closed',
          children: [
            {
              id: 'subgoal-2-exact',
              tactic: 'exact g x',
              goal: 'No goals. (Q.E.D. ✓)',
              status: 'closed',
            },
          ],
        },
      ],
    },
  ],
};

export const sampleLedgerRecords: LedgerRecord[] = [
  {
    id: 'tx-001',
    theoremName: 'const_family_pi_equiv',
    formalStatement: '((x : A) → (fun (_ : A) => C) x) ≃ (A → C)',
    proverName: 'Hyeonsu (You)',
    proverAddress: '0x71C...b4E9',
    timestamp: '2026-11-05 11:15:30 KST',
    leanKernelVersion: 'Lean 4.14.0 (Mathlib commit 7f3b2a)',
    proofHash: '0x9e8a71c52b04f84918e6c7310eab5d3c4019bf47',
    blockHeight: 284190,
    status: 'CONFIRMED',
  },
  {
    id: 'tx-002',
    theoremName: 'yoneda_embedding_fully_faithful',
    formalStatement: 'Faithful (yoneda 𝒞) ∧ Full (yoneda 𝒞)',
    proverName: 'Emily Riemann',
    proverAddress: '0x42A...91D2',
    timestamp: '2026-10-18 09:41:12 UTC',
    leanKernelVersion: 'Lean 4.13.0 (Mathlib commit b2a10f)',
    proofHash: '0x2a10fd349817eac293810beef1823901ac872391',
    blockHeight: 281034,
    status: 'CONFIRMED',
  },
  {
    id: 'tx-003',
    theoremName: 'hott_univalence_axiom_consequence',
    formalStatement: '(A ≃ B) ≃ (A = B)',
    proverName: 'Vladimir Voevodsky Lab',
    proverAddress: '0x8F4...E190',
    timestamp: '2026-09-04 14:02:50 UTC',
    leanKernelVersion: 'Lean 4.12.0 (HoTT Library v2)',
    proofHash: '0xbb4e9281a17c20d918347101acdf301928371940',
    blockHeight: 275819,
    status: 'CONFIRMED',
  },
];
