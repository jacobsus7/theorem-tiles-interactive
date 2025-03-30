
import React from 'react';
import { Step } from '../types/theorem';

interface ProofStepProps {
  step: Step;
  isTarget?: boolean;
}

const ProofStep: React.FC<ProofStepProps> = ({ step, isTarget = false }) => {
  return (
    <div className={`p-3 rounded-lg mb-3 transition-all duration-300 ${
      isTarget ? 'bg-mathGreen-300 animate-pulse-gentle' : 'bg-white'
    }`}>
      <div className="flex justify-between items-center mb-1">
        <div className="math-expression">{step.expression}</div>
        {step.appliedProperty && (
          <div className="text-sm px-2 py-1 bg-mathBlue-100 rounded text-mathBlue-500">
            {step.appliedProperty}
          </div>
        )}
      </div>
      {step.explanation && (
        <div className="text-sm text-gray-600">{step.explanation}</div>
      )}
    </div>
  );
};

export default ProofStep;
