
export interface Step {
  expression: string;
  appliedProperty?: string;
  explanation?: string;
}

export interface ProofCase {
  id: string;
  name: string;
  description: string;
  initialExpression: string;
  targetExpression: string;
  steps: Step[];
  isComplete: boolean;
}

export interface Theorem {
  id: string;
  title: string;
  initialExpression: string;
  targetExpression: string;
  availableProperties: Property[];
  steps: Step[];
  isComplete: boolean;
  cases?: ProofCase[]; // Optional cases for case-based proofs
  caseBasedProof?: boolean; // Flag to indicate if this is a case-based proof
}

export interface Property {
  id: string;
  name: string;
  description: string;
}

export type DragItemType = 'PROPERTY';

export interface DragItem {
  type: DragItemType;
  id: string;
}
