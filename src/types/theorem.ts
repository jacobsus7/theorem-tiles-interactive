
export interface Step {
  expression: string;
  appliedProperty?: string;
  explanation?: string;
}

export interface Theorem {
  id: string;
  title: string;
  initialExpression: string;
  targetExpression: string;
  availableProperties: Property[];
  steps: Step[];
  isComplete: boolean;
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
