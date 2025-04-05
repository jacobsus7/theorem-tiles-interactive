
import React from 'react';
import { Theorem, Step } from '../types/theorem';
import ProofStep from './ProofStep';
import { Card } from '@/components/ui/card';

interface ProofWorkspaceProps {
  theorem: Theorem;
  onApplyProperty: (propertyId: string) => void;
  steps: Step[];
}

const ProofWorkspace: React.FC<ProofWorkspaceProps> = ({ 
  theorem, 
  onApplyProperty,
  steps
}) => {
  return (
    <Card 
      className={`p-4 min-h-[200px] transition-all duration-200 ${
        theorem.isComplete ? 'bg-mathGreen-300/30' : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <h2 className="text-lg font-medium mb-3 text-center">
        {theorem.isComplete ? 
          'Theorem Proved! ✅' : 
          'Click Properties Below to Apply Them'
        }
      </h2>
      
      <div className="space-y-2">
        {steps.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Start by clicking a property to apply
          </div>
        )}
        
        {steps.map((step, index) => (
          <ProofStep 
            key={index} 
            step={step} 
            isTarget={index === steps.length - 1 && theorem.isComplete} 
          />
        ))}
      </div>
    </Card>
  );
};

export default ProofWorkspace;
