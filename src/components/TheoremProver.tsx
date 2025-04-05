
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useIsMobile } from '@/hooks/use-mobile';
import { Theorem, Step } from '../types/theorem';
import { applyProperty, isProofComplete } from '../data/theorems';
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
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleApplyProperty = (propertyId: string) => {
    if (theorem.isComplete) return;

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

  const touchBackendOptions = {
    enableMouseEvents: true,
    enableTouchEvents: true,
    delayTouchStart: 0,
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend} options={isMobile ? touchBackendOptions : undefined}>
      <div className="max-w-3xl mx-auto p-4">
        <TheoremHeader theorem={theorem} />
        
        <ProofWorkspace 
          theorem={theorem} 
          onApplyProperty={handleApplyProperty} 
          steps={steps}
        />
        
        <PropertiesList 
          properties={theorem.availableProperties}
          onApplyProperty={handleApplyProperty}
        />
      </div>
    </DndProvider>
  );
};

export default TheoremProver;
