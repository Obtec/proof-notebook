# ipnb: Interactive Proof Notebook (HoTT & Lean 4 Formal Verification)

> **형식 검증(Formal Verification)과 비선형 증명 분기(Goal State Tree), 최초 증명자(First Prover) 관계형 원장을 결합한 차세대 대화형 수학 연구 환경**

Google NotebookLM 스타일의 다크 테마(UI/UX)를 기반으로 구축되었으며, 주피터 노트북(Jupyter Notebook)의 선형 커널 한계를 극복하고 VS Code + InfoView의 휘발성 문제를 해결하는 완전한 프론트엔드 시스템입니다.

---

## 🌟 주요 기능 및 아키텍처

### 1. 사진 기반 NotebookLM 스타일 3단 레이아웃 완벽 구현
- **상단 글로벌 헤더**: 노트북 제목 변경(인라인 에디팅), Lean 4 Kernel 검증 상태 배지, First Prover Ledger 배지, "+ 노트북 만들기", "공유" 링크 생성, "PRO" 태그 및 설정.
- **좌측 소스 패널 (Sources & Proof Libraries)**: 
  - `HoTT.pdf` (Homotopy Type Theory §A.2.4)
  - `Research report: Category Theory Study R...` (수반 함자 및 펑터 범주 메모)
  - `Mathlib4.CategoryTheory.DependentProduct` 및 `First Prover Ledger: #0x8F4E`
  - "+ 소스 추가" 모달 (PDF, Doc, Lean, Ledger 타입 지원)
  - 상단 학술 DB 검색창 (`[웹]`, `[Fast Research]`)
- **중앙 메인 뷰어 (Interactive Proof Notebook)**:
  - **KaTeX 실시간 렌더링**: 사용자가 업로드한 스크린샷 속의 모든 구문(구문론적 바인더 관점에서의 정의, $\Pi$-타입, 바인더 식, 엄밀한 정식화 등) 완벽 재현.
  - **Lean 4 인터랙티브 증명 셀**: Tactic 스텝 탐색, Goal State 실시간 InfoView, Lean 커널 검증 실행(Confetti 효과), First Prover 원장 등록.
  - **하단 안내 배너**: Google Drive 및 Mathlib 검색 배너.
  - **프롬프트 입력창**: "질문하거나 창작하세요", 소스 개수 배지, AI 수학자 질의응답.
- **우측 스튜디오 패널 (Studio & Verification Tools)**:
  - AI 오디오 오버뷰 (Audio Deep Dive 플레이어)
  - 슬라이드 자료 (Beamer/LaTeX 프레젠테이션)
  - 보고서 (New!), 플래시카드, 퀴즈, 데이터 표
  - **First Prover 원장 등록 패널 & 반례 탐색기**
  - 하단 "메모 추가" 플로팅 알약 버튼 (아이디어 스케치 모달 연동)

---

### 2. 연구 논문 핵심 요구사항 구현
1. **비선형 증명 목표 상태 트리 (ipnb Branching Proof DAG)**:
   - 주피터의 선형 REPL 한계를 해결하기 위한 `constructor` $\to$ Subgoal 1 & Subgoal 2 분기 DAG 시각화.
2. **반례 탐색을 위한 데이터 시각화 (SlimCheck Counterexample Explorer)**:
   - 가설 $B(x) \equiv C$ 위반 여부를 이산 파라미터 공간에서 무작위 샘플링하여 시각화.
3. **학계 최초 증명자(First Prover) 관계형 원장 & 시스템 명세**:
   - `proof_ledger` 테이블 레코드 목록 조회
   - ERD (ipnb_notebooks, proof_goal_nodes, proof_ledger)
   - ACID 직렬성 보장 핵심 SQL 트랜잭션
   - WebSocket 기반 비동기 Lean 4 커널 브리지 파이프라인

---

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (127.0.0.1:5173)
npm run dev

# 프로덕션 빌드
npm run build
```
