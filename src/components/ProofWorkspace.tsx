
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
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
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'PROPERTY',
    drop: (item: { id: string }) => {
      onApplyProperty(item.id);
      return undefined;
    },
    canDrop: () => !theorem.isComplete,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // Connect the drop ref to the DOM element
  drop(ref);

  const isActive = isOver && canDrop;

  return (
    <Card 
      ref={ref} 
      className={`p-4 min-h-[200px] transition-all duration-200 ${
        isActive ? 'bg-mathBlue-100 shadow-inner' : 'bg-gray-50'
      } ${theorem.isComplete ? 'bg-mathGreen-300/30' : ''}`}
    >
      <h2 className="text-lg font-medium mb-3 text-center">
        {theorem.isComplete ? 
          'Theorem Proved! ✅' : 
          'Drag Properties Here to Apply Them'
        }
      </h2>
      
      <div className="space-y-2">
        {steps.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Start by dragging a property to apply
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
