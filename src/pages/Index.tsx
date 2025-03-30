
import React from 'react';
import TheoremProver from '@/components/TheoremProver';
import { theorems } from '@/data/theorems';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-mathBlue-100">
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-xl md:text-2xl font-bold text-mathBlue-600">Theorem Tiles</h1>
        </div>
      </nav>
      
      <main className="container mx-auto py-6">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-lg font-medium mb-2">Welcome to Theorem Tiles</h2>
          <p className="text-gray-600 mb-4">
            Drag properties from the list below onto the workspace to apply them to the expression.
            Continue until you've proven the theorem.
          </p>
          <div className="text-sm text-gray-500">
            <p>Current challenge: <span className="font-medium">Prove that -(-1) = 1</span></p>
          </div>
        </div>
        
        <TheoremProver theorem={theorems[0]} />
      </main>
    </div>
  );
};

export default Index;
