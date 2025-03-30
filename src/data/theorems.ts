
import { Theorem, Property } from "../types/theorem";

// Define the available properties (axioms)
export const properties: Property[] = [
  {
    id: "add_comm",
    name: "Commutativity of Addition",
    description: "a + b = b + a",
  },
  {
    id: "mult_comm",
    name: "Commutativity of Multiplication",
    description: "a × b = b × a",
  },
  {
    id: "add_inverse",
    name: "Additive Inverse",
    description: "a + (-a) = 0",
  },
  {
    id: "mult_inverse",
    name: "Multiplicative Inverse",
    description: "a × (1/a) = 1, for a ≠ 0",
  },
  {
    id: "distributive",
    name: "Distributive Property",
    description: "a × (b + c) = a × b + a × c",
  },
  {
    id: "neg_mult",
    name: "Negative Multiplication",
    description: "(-a) × b = -(a × b)",
  },
  {
    id: "neg_neg",
    name: "Double Negative",
    description: "-(-a) = a",
  },
];

// Define our first theorem
export const theorems: Theorem[] = [
  {
    id: "neg_neg_one",
    title: "Prove that -(-1) = 1",
    initialExpression: "-(-1)",
    targetExpression: "1",
    availableProperties: properties,
    steps: [],
    isComplete: false,
  },
];

// Logic to apply properties to expressions
export const applyProperty = (
  expression: string, 
  propertyId: string
): { newExpression: string, explanation: string } | null => {
  // For our initial theorem -(-1) = 1
  if (expression === "-(-1)" && propertyId === "neg_neg") {
    return {
      newExpression: "1",
      explanation: "Applied the double negative property: -(-a) = a, with a = 1"
    };
  }
  
  return null; // Property cannot be applied to this expression
};

export const isProofComplete = (
  currentExpression: string,
  targetExpression: string
): boolean => {
  return currentExpression === targetExpression;
};
