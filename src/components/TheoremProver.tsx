
import React, { useState, useEffect } from 'react';
import { Theorem, Step, ProofCase } from '../types/theorem';
import { applyProperty, isProofComplete, areAllCasesComplete } from '../data/theorems';
import TheoremHeader from './TheoremHeader';
import ProofWorkspace from './ProofWorkspace';
import PropertiesList from './PropertiesList';
import { useToast } from "@/hooks/use-toast";

interface TheoremProverProps {
  theorem: Theorem;
}

const TheoremProver: React.FC<TheoremProverProps> = ({ theorem: initialTheorem }) => {
  const [theorem, setTheorem] = useState<Theorem>(initialTheorem);
  const [steps, setSteps] = useState<Step[]>([
    { expression: initialTheorem.initialExpression }
  ]);
  const [cases, setCases] = useState<ProofCase[] | undefined>(initialTheorem.cases?.map(c => ({
    ...c,
    steps: [{ expression: c.initialExpression }]
  })));
  const [currentCase, setCurrentCase] = useState<string | undefined>(
    initialTheorem.cases ? initialTheorem.cases[0].id : undefined
  );
  const { toast } = useToast();

  const handleApplyProperty = (propertyId: string, caseId?: string) => {
    if (theorem.isComplete) return;
    
    console.log("Applying property:", propertyId, "to case:", caseId || "main proof");
    
    // For case-based proofs
    if (theorem.caseBasedProof && cases && caseId) {
      const caseIndex = cases.findIndex(c => c.id === caseId);
      if (caseIndex === -1 || cases[caseIndex].isComplete) return;
      
      const currentCaseSteps = cases[caseIndex].steps;
      const currentExpression = currentCaseSteps[currentCaseSteps.length - 1].expression;
      const result = applyProperty(currentExpression, propertyId, caseId);
      
      if (!result) {
        toast({
          title: "Error",
          description: "This property doesn't apply here",
          variant: "destructive"
        });
        return;
      }
      
      const { newExpression, explanation } = result;
      const propertyName = theorem.availableProperties.find(p => p.id === propertyId)?.name || propertyId;
      
      // Create new step
      const newStep: Step = {
        expression: newExpression,
        appliedProperty: propertyName,
        explanation
      };
      
      // Update case steps
      const updatedCases = [...cases];
      const newCaseSteps = [...currentCaseSteps, newStep];
      updatedCases[caseIndex].steps = newCaseSteps;
      
      // Check if this case is complete
      const caseComplete = isProofComplete(newExpression, cases[caseIndex].targetExpression);
      if (caseComplete) {
        updatedCases[caseIndex].isComplete = true;
        toast({
          title: "Case Completed",
          description: `${cases[caseIndex].name} has been proven!`
        });
      }
      
      setCases(updatedCases);
      
      // Check if all cases are complete to mark the theorem as complete
      const allCasesComplete = areAllCasesComplete(updatedCases);
      if (allCasesComplete) {
        setTheorem({
          ...theorem,
          isComplete: true,
          cases: updatedCases
        });
        toast({
          title: "Success",
          description: "All cases proven! The theorem is complete."
        });
      }
      
      return;
    }
    
    // For regular, non-case-based proofs
    const currentExpression = steps[steps.length - 1].expression;
    const result = applyProperty(currentExpression, propertyId);

    if (!result) {
      toast({
        title: "Error",
        description: "This property doesn't apply here",
        variant: "destructive"
      });
      return;
    }

    const { newExpression, explanation } = result;
    const propertyName = theorem.availableProperties.find(p => p.id === propertyId)?.name || propertyId;

    // Create new step
    const newStep: Step = {
      expression: newExpression,
      appliedProperty: propertyName,
      explanation
    };

    // Update steps
    setSteps([...steps, newStep]);

    // Check if proof is complete
    const completed = isProofComplete(newExpression, theorem.targetExpression);
    if (completed) {
      setTheorem({
        ...theorem,
        isComplete: true,
        steps: [...steps, newStep]
      });
      toast({
        title: "Success",
        description: "Theorem proved successfully!"
      });
    }
  };

  const handleSelectCase = (caseId: string) => {
    setCurrentCase(caseId);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <TheoremHeader theorem={theorem} />
      
      <ProofWorkspace 
        theorem={theorem} 
        onApplyProperty={handleApplyProperty} 
        steps={steps}
        cases={cases}
        currentCase={currentCase}
        onSelectCase={handleSelectCase}
      />
      
      <PropertiesList 
        properties={theorem.availableProperties}
        onApplyProperty={(propertyId) => handleApplyProperty(propertyId, currentCase)}
      />
    </div>
  );
};

export default TheoremProver;
