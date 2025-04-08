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
    description: "a × (a^-1) = 1, for a ≠ 0",
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
  {
    id: "mult_identity",
    name: "Multiplicative Identity",
    description: "a × 1 = a and 1 × a = a",
  },
  {
    id: "mult_identity_def",
    name: "Definition of Multiplicative Identity",
    description: "a × 1 = 1 × a = a",
  },
  {
    id: "add_identity_def",
    name: "Definition of Additive Identity",
    description: "a + 0 = 0 + a = a",
  },
  {
    id: "triangle_inequality",
    name: "Triangle Inequality",
    description: "|a| + |b| ≥ |a + b|",
  },
  {
    id: "abs_definition",
    name: "Absolute Value Definition",
    description: "|a| = a if a ≥ 0, |a| = -a if a < 0",
  },
  {
    id: "abs_mult",
    name: "Absolute Value of Product",
    description: "|a × b| = |a| × |b|",
  },
  {
    id: "abs_properties",
    name: "Absolute Value Properties",
    description: "|-a| = |a| and |a| ≥ 0 for all a",
  },
  {
    id: "case_analysis",
    name: "Case Analysis",
    description: "Split into cases based on sign conditions",
  },
  {
    id: "case1",
    name: "Case 1: a≥0, b≥0",
    description: "When both a and b are non-negative",
  },
  {
    id: "case2",
    name: "Case 2: a≥0, b<0",
    description: "When a is non-negative and b is negative",
  },
  {
    id: "case3",
    name: "Case 3: a<0, b<0",
    description: "When both a and b are negative",
  },
  {
    id: "combine_cases",
    name: "Combine Cases",
    description: "Combine all cases to complete the proof",
  }
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
  {
    id: "triangle_inequality",
    title: "Prove the Triangle Inequality",
    initialExpression: "|a| + |b|",
    targetExpression: "|a + b|",
    availableProperties: properties.filter(p => 
      ["triangle_inequality", "abs_definition", "abs_mult", "abs_properties", 
       "case_analysis", "case1", "case2", "case3", "combine_cases"].includes(p.id)
    ),
    steps: [],
    isComplete: false,
  },
];

// Regular expressions for matching algebraic patterns
const MULT_INVERSE_PATTERN = /([a-z])×\(\1\^-1\)|\(\1\^-1\)×\1/;
const IDENTITY_PATTERN = /([a-z])×1|1×([a-z])/;

// Detect if an expression contains a multiplicative inverse pair
const hasMultiplicativeInversePair = (expression: string): { match: string, variable: string, replacement: string } | null => {
  // Match patterns like "a×(a^-1)" or "(a^-1)×a" for any variable
  const patterns = [
    { regex: /([a-z])×\(\1\^-1\)/g, format: (v: string) => `${v}×(${v}^-1)` },
    { regex: /\(([a-z])\^-1\)×\1/g, format: (v: string) => `(${v}^-1)×${v}` }
  ];
  
  for (const {regex, format} of patterns) {
    const matches = [...expression.matchAll(regex)];
    if (matches.length > 0) {
      const match = matches[0];
      const variable = match[1]; // The captured variable (a, b, etc.)
      const fullMatch = match[0]; // The full match like "a×(a^-1)"
      return {
        match: fullMatch,
        variable: variable,
        replacement: "1" // Replace with 1
      };
    }
  }
  return null;
};

// Detect if an expression contains a multiplicative identity
const hasMultiplicativeIdentity = (expression: string): { match: string, variable: string, replacement: string } | null => {
  // Match patterns like "a×1" or "1×a" for any variable
  const patterns = [
    { regex: /([a-z])×1/g, format: (v: string) => `${v}×1` },
    { regex: /1×([a-z])/g, format: (v: string) => `1×${v}` }
  ];
  
  for (const {regex, format} of patterns) {
    const matches = [...expression.matchAll(regex)];
    if (matches.length > 0) {
      const match = matches[0];
      const variable = match[1]; // The captured variable (a, b, etc.)
      const fullMatch = match[0]; // The full match like "a×1"
      return {
        match: fullMatch,
        variable: variable,
        replacement: variable // Replace with just the variable
      };
    }
  }
  return null;
};

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

  if (expression === "-(-1 × 1)" && propertyId === "mult_identity") {
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
  
  // General multiplicative inverse property (for any variables)
  if (propertyId === "mult_inverse") {
    const inversePair = hasMultiplicativeInversePair(expression);
    if (inversePair) {
      const newExpression = expression.replace(inversePair.match, "1");
      return {
        newExpression,
        explanation: `Applied multiplicative inverse: ${inversePair.match} = 1`
      };
    }
  }
  
  // General multiplicative identity property (for any variables)
  if (propertyId === "mult_identity" || propertyId === "mult_identity_def") {
    const identityMatch = hasMultiplicativeIdentity(expression);
    if (identityMatch) {
      const newExpression = expression.replace(identityMatch.match, identityMatch.replacement);
      return {
        newExpression,
        explanation: `Applied multiplicative identity: ${identityMatch.match} = ${identityMatch.replacement}`
      };
    }
  }
  
  // Handle specific cases for the second theorem
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
  
  // For 1×1 = 1
  if (expression === "1×1" && (propertyId === "mult_identity" || propertyId === "mult_identity_def")) {
    return {
      newExpression: "1",
      explanation: "Applied multiplicative identity: 1×1 = 1"
    };
  }
  
  // For additive identity
  if (propertyId === "add_identity_def") {
    if (expression.includes("+0")) {
      return {
        newExpression: expression.replace("+0", ""),
        explanation: "Applied additive identity: a+0 = a"
      };
    }
    if (expression.includes("0+")) {
      return {
        newExpression: expression.replace("0+", ""),
        explanation: "Applied additive identity: 0+a = a"
      };
    }
  }
  
  // Triangle inequality theorem with case analysis
  if (expression === "|a| + |b|" && propertyId === "case_analysis") {
    return {
      newExpression: "Case analysis",
      explanation: "We'll split our proof into three cases based on the signs of a and b"
    };
  }
  
  if (expression === "Case analysis" && propertyId === "case1") {
    return {
      newExpression: "Case 1: a≥0, b≥0",
      explanation: "For the first case, assume both a and b are non-negative"
    };
  }
  
  if (expression === "Case 1: a≥0, b≥0" && propertyId === "abs_definition") {
    return {
      newExpression: "Case1: a + b = |a + b|",
      explanation: "When a≥0 and b≥0, then |a| = a and |b| = b, so |a| + |b| = a + b. Also, a + b ≥ 0, so |a + b| = a + b"
    };
  }
  
  if (expression === "Case1: a + b = |a + b|" && propertyId === "case2") {
    return {
      newExpression: "Case 2: a≥0, b<0",
      explanation: "For the second case, assume a is non-negative and b is negative"
    };
  }
  
  if (expression === "Case 2: a≥0, b<0" && propertyId === "abs_definition") {
    return {
      newExpression: "Case2: a + (-b) ≥ |a + b|",
      explanation: "When a≥0 and b<0, then |a| = a and |b| = -b, so |a| + |b| = a + (-b) = a - b. If a + b ≥ 0, then |a + b| = a + b, so a - b ≥ a + b, which is false. If a + b < 0, then |a + b| = -(a + b) = -a - b, so a - b ≥ -a - b, which is a ≥ -a, true when a≥0"
    };
  }
  
  if (expression === "Case2: a + (-b) ≥ |a + b|" && propertyId === "case3") {
    return {
      newExpression: "Case 3: a<0, b<0",
      explanation: "For the third case, assume both a and b are negative"
    };
  }
  
  if (expression === "Case 3: a<0, b<0" && propertyId === "abs_definition") {
    return {
      newExpression: "Case3: (-a) + (-b) ≥ |a + b|",
      explanation: "When a<0 and b<0, then |a| = -a and |b| = -b, so |a| + |b| = (-a) + (-b) = -a - b. Also, a + b < 0, so |a + b| = -(a + b) = -a - b"
    };
  }
  
  if (expression === "Case3: (-a) + (-b) ≥ |a + b|" && propertyId === "combine_cases") {
    return {
      newExpression: "∴ |a| + |b| ≥ |a + b|",
      explanation: "In all three cases, we've shown that |a| + |b| ≥ |a + b|, so the triangle inequality is proven for all real numbers a and b"
    };
  }
  
  if (expression === "∴ |a| + |b| ≥ |a + b|" && propertyId === "triangle_inequality") {
    return {
      newExpression: "|a + b|",
      explanation: "We have proven the triangle inequality: |a| + |b| ≥ |a + b| for all real numbers a and b"
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
