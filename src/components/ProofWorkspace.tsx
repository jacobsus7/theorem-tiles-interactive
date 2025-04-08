
import React, { useState } from 'react';
import { Theorem, Step, ProofCase } from '../types/theorem';
import ProofStep from './ProofStep';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, CircleDot } from 'lucide-react';

interface ProofWorkspaceProps {
  theorem: Theorem;
  onApplyProperty: (propertyId: string, caseId?: string) => void;
  steps: Step[];
  cases?: ProofCase[];
  currentCase?: string;
  onSelectCase?: (caseId: string) => void;
}

const ProofWorkspace: React.FC<ProofWorkspaceProps> = ({ 
  theorem, 
  onApplyProperty,
  steps,
  cases,
  currentCase,
  onSelectCase
}) => {
  // If this is a case-based proof, render the cases as tabs
  if (theorem.caseBasedProof && cases && onSelectCase) {
    return (
      <Card className="p-4 min-h-[200px]">
        <h2 className="text-lg font-medium mb-3 text-center">
          {theorem.isComplete ? 
            'All Cases Proven! ✅' : 
            'Select a Case to Work On'
          }
        </h2>
        
        <Tabs 
          value={currentCase} 
          onValueChange={onSelectCase}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            {cases.map(caseItem => (
              <TabsTrigger 
                key={caseItem.id}
                value={caseItem.id}
                className="relative"
              >
                {caseItem.name}
                {caseItem.isComplete && (
                  <span className="absolute -top-1 -right-1">
                    <Check className="h-4 w-4 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {cases.map(caseItem => (
            <TabsContent key={caseItem.id} value={caseItem.id} className="space-y-2">
              <div className="bg-mathBlue-50 p-3 rounded-lg mb-3">
                <p className="font-medium">{caseItem.name}</p>
                <p className="text-sm text-gray-600">{caseItem.description}</p>
              </div>
              
              {caseItem.steps.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  Start by clicking a property to apply
                </div>
              ) : (
                caseItem.steps.map((step, index) => (
                  <ProofStep 
                    key={index} 
                    step={step} 
                    isTarget={index === caseItem.steps.length - 1 && caseItem.isComplete} 
                  />
                ))
              )}
              
              {caseItem.isComplete && (
                <div className="text-center py-3 text-mathGreen-600 font-medium">
                  This case is proven! ✅
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    );
  }
  
  // Regular non-case-based proof rendering
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
