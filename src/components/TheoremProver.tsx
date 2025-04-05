
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

    console.log("Applying property:", propertyId);
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

  // Configure the touch backend with appropriate options
  const touchBackendOptions = {
    enableMouseEvents: true,
    enableTouchEvents: true,
    delayTouchStart: 100, // Add a slight delay to distinguish between tap and drag
    ignoreContextMenu: true,
    touchSlop: 20, // Increase this for touchscreens to make dragging easier to trigger
  };

  // Choose the backend based on device type
  const backend = isMobile ? TouchBackend : HTML5Backend;
  const backendOptions = isMobile ? touchBackendOptions : undefined;

  return (
    <DndProvider backend={backend} options={backendOptions}>
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
