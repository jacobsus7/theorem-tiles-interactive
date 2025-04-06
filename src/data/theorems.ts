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
    id: "assoc_mult",
    name: "Associative Property of Multiplication",
    description: "a × (b × c) = (a × b) × c",
  },
];

// Define our theorems
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
  {
    id: "inverse_product",
    title: "Prove that a×b×(a^-1)×(b^-1) = 1",
    initialExpression: "a×b×(a^-1)×(b^-1)",
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
  // For our first theorem -(-1) = 1
  if (expression === "-(-1)" && propertyId === "neg_mult") {
    return {
      newExpression: "-((-1) × (-1))",
      explanation: "Applied the negative multiplication property: (-a) = -(a × 1)"
    };
  }
  
  if (expression === "-((-1) × (-1))" && propertyId === "mult_comm") {
    return {
      newExpression: "-((-1) × (-1))",
      explanation: "Applied the commutative property of multiplication: a × b = b × a"
    };
  }
  
  if (expression === "-((-1) × (-1))" && propertyId === "neg_mult") {
    return {
      newExpression: "-(-1 × 1)",
      explanation: "Applied the negative multiplication property: (-a) × b = -(a × b)"
    };
  }
  
  if (expression === "-(-1 × 1)" && propertyId === "mult_comm") {
    return {
      newExpression: "-(-1 × 1)",
      explanation: "Applied the commutative property of multiplication: a × b = b × a"
    };
  }

  if (expression === "-(-1 × 1)" && propertyId === "mult_inverse") {
    return {
      newExpression: "-(-1)",
      explanation: "Applied the multiplicative identity property: a × 1 = a"
    };
  }
  
  if (expression === "-(-1)" && propertyId === "add_inverse") {
    return {
      newExpression: "1",
      explanation: "Applied the additive inverse property: -(-a) = a"
    };
  }
  
  // For our second theorem a×b×(a^-1)×(b^-1) = 1
  if (expression === "a×b×(a^-1)×(b^-1)" && propertyId === "mult_comm") {
    return {
      newExpression: "a×b×(b^-1)×(a^-1)",
      explanation: "Applied commutativity of multiplication to swap (a^-1) and (b^-1)"
    };
  }
  
  if (expression === "a×b×(b^-1)×(a^-1)" && propertyId === "assoc_mult") {
    return {
      newExpression: "a×(b×(b^-1))×(a^-1)",
      explanation: "Applied associative property to group b and its inverse"
    };
  }
  
  if (expression === "a×(b×(b^-1))×(a^-1)" && propertyId === "mult_inverse") {
    return {
      newExpression: "a×1×(a^-1)",
      explanation: "Applied multiplicative inverse: b×(b^-1) = 1"
    };
  }
  
  if (expression === "a×1×(a^-1)" && propertyId === "mult_comm") {
    return {
      newExpression: "a×(a^-1)×1",
      explanation: "Applied commutativity of multiplication to reorder terms"
    };
  }
  
  if (expression === "a×(a^-1)×1" && propertyId === "mult_inverse") {
    return {
      newExpression: "1×1",
      explanation: "Applied multiplicative inverse: a×(a^-1) = 1"
    };
  }
  
  if (expression === "1×1" && propertyId === "mult_inverse") {
    return {
      newExpression: "1",
      explanation: "Applied multiplicative identity: 1×1 = 1"
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
